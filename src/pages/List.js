import React, { useState } from "react";
import { Stack, Input } from "@chakra-ui/core";

import { PageWrapper } from "../components/PageWrapper";
import { PostList } from "../components/PostList";

export default function List({ posts }) {
  const postsData = posts.read();
  const [filter, setFilter] = useState("");

  return (
    <PageWrapper>
      <Stack spacing={4}>
        <Input
          type="search"
          placeholder="Search for something"
          value={filter}
          onChange={event => setFilter(event.target.value)}
        />
        <PostList posts={postsData} />
      </Stack>
    </PageWrapper>
  );
}
