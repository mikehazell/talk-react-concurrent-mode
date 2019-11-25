import React, { Component } from "react";
import { Stack, Box, Heading } from "@chakra-ui/core";

export class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    console.log("error", error);
    return {
      hasError: true,
      error
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Stack m={8} p={8} spacing={4} bg="red.300" color="red.700">
          <Heading fontSize="xl">Something has gone terribly wrong</Heading>
          <Box
            borderColor="red.700"
            borderWidth={1}
            fontFamily="mono"
            fontSize="sm"
            p={2}
          >
            <pre>{JSON.stringify(this.state.error, null, 2)}</pre>
          </Box>
        </Stack>
      );
    }
    return this.props.children;
  }
}
