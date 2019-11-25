// Based on the suspense-experimental-github-demo
// Includes some modifications to make the api closer to that of react-router
// https://github.com/gaearon/suspense-experimental-github-demo/blob/master/src/createRouter.js
/** @jsx jsx */
import { jsx } from "@emotion/core";

import {
  createContext,
  lazy,
  useState,
  useCallback,
  useContext,
  useEffect,
  useTransition
} from "react";
import {
  unstable_runWithPriority,
  unstable_UserBlockingPriority
} from "scheduler";

import { Spinner } from "../components/Spinner";

// This is a hand-written router.
// It doesn't fix cross-browser quirks or do scroll restoration.
// Don't copy paste this into your project--it's meant as a demo
// for what routers in the React ecosystem could do in the future.

const RouterContext = createContext(null);

// Don't forget these APIs are experimental and can change.
const suspenseConfig = {
  timeoutMs: 5000,
  busyDelayMs: 500, // Before we show the inline spinner
  busyMinDurationMs: 100 // If we show it, force it to stick for a bit
};

export function createRouter(routes) {
  const initialRoute = loadRoute(window.location.pathname);

  // If there's one thing you should take away, it's here!
  // We start loading *both* code and data for the next screen
  // in parallel, *at the very moment* you navigate.
  // We *don't* wait for code to start loading data.
  function loadRoute(url) {
    for (let route of routes) {
      const [base, paramName] = route.path.split(":");

      if (url.startsWith(base)) {
        const param = url.substring(base.length);
        const props = {
          // Make this look like the React-Router api. (at least the bits we're using)
          match: { params: { [paramName]: param } },
          // If the route has a load data method, call it and spread the results
          ...(route.loadData
            ? route.loadData({
                [paramName]: param
              })
            : {})
        };
        // Start loading code in parallel:
        if (route.loadCode) {
          route.loadCode();
        }

        // Start rendering immediately:
        let Page = route.component;
        if (!Page) {
          Page = route.component = lazy(route.loadCode);
        }
        return <Page {...props} />;
      }
    }
    throw new Error("Not found.");
  }

  // This router is a very naïve and just shows a proof of concept.
  function Router() {
    const [route, setRoute] = useState(initialRoute);
    const [startTransition, isPending] = useTransition(suspenseConfig);

    // Our Links will call this to navigate.
    let navigate = useCallback((url, pushState) => {
      // Start fetching and rendering immediately on navigation.
      // Data and code are fetched in parallel.
      const nextRoute = loadRoute(url);
      setRoute(nextRoute);
      if (pushState) {
        window.history.pushState(null, null, url);
      }
    }, []);

    // Listen to browser history changes.
    useEffect(() => {
      let handlePopState = () => {
        // Note: this is a bit icky. We don't have a stable API for this yet.
        unstable_runWithPriority(unstable_UserBlockingPriority, () => {
          // Handle the browser Back Button.
          startTransition(() => {
            navigate(window.location.pathname, false);
          });
        });
      };
      window.addEventListener("popstate", handlePopState);
      return () => window.removeEventListener("popstate", handlePopState);
    });

    return (
      <RouterContext.Provider value={navigate}>
        {isPending && (
          /*
           * Open Chrome DevTools, go to Network,
           * check "Disable Cache" and enable "Slow 3G".
           * Then try navigating and pressing the Back button.
           */
          <Spinner />
        )}
        {route}
      </RouterContext.Provider>
    );
  }

  function Link({ to, children, ...props }) {
    const navigate = useContext(RouterContext);
    const [startTransition, isPending] = useTransition(suspenseConfig);

    function handleClick(e) {
      if (!shouldNavigate(e)) {
        return;
      }
      e.preventDefault();
      startTransition(() => {
        navigate(to, true);
      });
    }

    return (
      <a
        href={to}
        onClick={handleClick}
        /*
         * Open Chrome DevTools, go to Network,
         * check "Disable Cache" and enable "Slow 3G".
         * Then click on a link and wait 500ms.
         */
        css={{
          cursor: isPending ? "progress" : null
        }}
        {...props}
      >
        {children}
      </a>
    );
  }

  return {
    Router,
    Link
  };
}

// Copied from @reach/router, written by Ryan Florence.
function shouldNavigate(event) {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
  );
}
