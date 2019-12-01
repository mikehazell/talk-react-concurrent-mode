import React, { Suspense } from "react";
import { Stack, Heading } from "@chakra-ui/core";

import { PageWrapper } from "../components/PageWrapper";
import { PostList, PostListPH } from "../components/PostList";
import { PostDetail } from "../components/PostDetail";

export default function Detail({ post, relatedPosts }) {
  const postData = post.read();

  return (
    <PageWrapper>
      <Stack spacing={4}>
        <PostDetail post={postData} />
        <Suspense fallback={<RelatedPostsPH />}>
          <RelatedPosts posts={relatedPosts} />
        </Suspense>
      </Stack>
    </PageWrapper>
  );
}

const RelatedPosts = ({ posts }) => {
  const postsData = posts.read();
  return (
    <RelatedPostsWrapper>
      <PostList posts={postsData} />
    </RelatedPostsWrapper>
  );
};

const RelatedPostsPH = () => (
  <RelatedPostsWrapper>
    <PostListPH placeholders={3} />
  </RelatedPostsWrapper>
);

const RelatedPostsWrapper = ({ children, props }) => (
  <Stack spacing={8}>
    <Heading
      size="md"
      pb={4}
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
    >
      More from Average
    </Heading>
    {children}
  </Stack>
);
