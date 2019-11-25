import React, { Fragment } from "react";
import { Box, Heading, Text, Stack, Flex, Button } from "@chakra-ui/core";

import { Link } from "../router";
import { style } from "../constants";

export const PageWrapper = ({ children }) => (
  <Fragment>
    <PageHeader />
    <PageContent>{children}</PageContent>
    <PageFooter />
  </Fragment>
);

export const PageHeader = () => (
  <Box background="white" py={4} borderBottomWidth="1px">
    <Flex
      justify="space-between"
      align="center"
      maxW={style.PAGE_MAX_WIDTH}
      marginX="auto"
      px={5}
    >
      <Text fontFamily="serif" fontWeight="semibold" fontSize="3xl">
        <Link to="/">Average</Link>
      </Text>
      <Stack isInline spacing={4}>
        <Button variant="link" fontWeight="normal" fontSize="sm">
          Sign in
        </Button>
        <Button variant="outline" fontWeight="normal" fontSize="sm">
          Get started
        </Button>
      </Stack>
    </Flex>
  </Box>
);

export const PageContent = props => (
  <Box padding={5} marginX="auto" maxWidth={style.PAGE_MAX_WIDTH} {...props} />
);

export const PageFooter = () => (
  <Box bg="gray.900" color="white" px={4} py={4}>
    <Flex
      spacing={4}
      direction={["column", null, "row"]}
      paddingBottom={4}
      borderBottomWidth="1px"
      borderBottomColor="gray.700"
      maxWidth={style.PAGE_MAX_WIDTH}
      marginX="auto"
    >
      <FooterBox
        heading="Discover Average"
        body="Welcome to a place where words matter. On Average, smart voices and original ideas take center stage - with no ads in sight. Watch"
      />
      <FooterBox
        heading="Make Average yours"
        body="Follow all the topics you care about, and we’ll deliver the best stories for you to your homepage and inbox. Explore"
      />
      <FooterBox
        heading="Become a member"
        body="Get unlimited access to the best stories on Average — and support writers while you’re at it. Just $5/month. Upgrade"
      />
    </Flex>

    <Flex
      direction={["column", null, "row"]}
      justify="space-between"
      align="center"
      py={2}
      maxWidth={style.PAGE_MAX_WIDTH}
      marginX="auto"
    >
      <Text fontFamily="serif" fontWeight="semibold" fontSize="2xl">
        Average
      </Text>
      <Text fontSize="xs" textAlign="center" color="white" my={10}>
        Copyright {new Date().getFullYear()}
      </Text>
    </Flex>
  </Box>
);

const FooterBox = ({ heading, body, ...props }) => (
  <Stack spacing={4} p={2} {...props}>
    <Heading fontSize="md">{heading}</Heading>
    <Text fontSize="sm" color="gray.500">
      {body}
    </Text>
  </Stack>
);
