import React from "react";
import { Layout } from "./components/Layout";
import { ErrorBoundary } from "./components/ErrorBoundary";

import { Router } from "./router";

export const App = () => (
  <React.StrictMode>
    <Layout>
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    </Layout>
  </React.StrictMode>
);
