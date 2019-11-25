import React, { useState, useEffect } from "react";
import { Stack, Input } from "@chakra-ui/core";

import { getPosts } from "../api";

import { PageWrapper } from "../components/PageWrapper";
import { PostList } from "../components/PostList";

export default function List() {
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let canceled = false;
    setLoading(true);
    getPosts({ limit: 36, filter }).then(p => {
      if (canceled) return;
      setPosts(p);
      setLoading(false);
    });
    return () => (canceled = true);
  }, [filter]);

  return (
    <PageWrapper>
      <Stack spacing={4}>
        <Input
          type="search"
          placeholder="Search for something"
          value={filter}
          onChange={event => setFilter(event.target.value)}
        />
        <PostList posts={posts} loading={loading} />
      </Stack>
    </PageWrapper>
  );
}
