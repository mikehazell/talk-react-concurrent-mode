import React from "react";
import { Flex, Spinner as CSpinner } from "@chakra-ui/core";

export const Spinner = () => (
  <CSpinner thickness="3px" speed="0.65s" size="lg" />
);

export const PageSpinner = () => (
  <Flex align="center" justify="center" height="100vh">
    <CSpinner thickness="8px" speed="0.65s" size="xl" />
  </Flex>
);
