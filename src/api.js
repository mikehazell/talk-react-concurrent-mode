export function getPosts({ filter, limit, relatedTo }) {
  const url = new URL("/api/posts", urlBase);
  if (limit) url.searchParams.set("limit", limit);
  if (filter) url.searchParams.set("filter", filter);
  if (relatedTo) url.searchParams.set("relatedTo", relatedTo);
  return wrapPromise(get(url));
}

export function getPostById({ id }) {
  const url = new URL(`/api/posts/${id}`, urlBase);
  return wrapPromise(get(url));
}

async function get(url) {
  const response = await fetch(url.toString(), {
    contentType: "application/json"
  });
  if (response.status !== 200) {
    throw new Error("API returned Error " + response.status);
  }
  return response.json();
}

export function wrapPromise(promise) {
  let status = "pending";
  let result;
  let suspender = promise.then(
    res => {
      status = "success";
      result = res;
    },
    error => {
      status = "error";
      result = error;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
}

const { location } = window;
const urlBase = [location.protocol, location.host, location.port]
  .filter(a => a)
  .join("//");
