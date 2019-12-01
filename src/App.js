import React, { Suspense } from "react";
import { Layout } from "./components/Layout";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { PageSpinner } from "./components/Spinner";

import { Router } from "./router";

export const App = () => (
  <React.StrictMode>
    <Layout>
      <ErrorBoundary>
        <Suspense fallback={<PageSpinner />}>
          <Router />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  </React.StrictMode>
);
