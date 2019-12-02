import React, { Suspense, SuspenseList } from "react";
import { Stack, Heading } from "@chakra-ui/core";

import { PageWrapper } from "../components/PageWrapper";
import { PostList, PostListPH } from "../components/PostList";
import { PostDetail } from "../components/PostDetail";
import { CommentsList, CommentsListPH } from "../components/CommentsList";

export default function Detail({ post, relatedPosts, comments }) {
  const postData = post.read();

  return (
    <PageWrapper>
      <Stack spacing={4}>
        <PostDetail post={postData} />
        <SuspenseList revealOrder="forwards">
          <Suspense fallback={<CommentsPH />}>
            <Comments comments={comments} />
          </Suspense>
          <Suspense fallback={<RelatedPostsPH />}>
            <RelatedPosts posts={relatedPosts} />
          </Suspense>
        </SuspenseList>
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

// Comments
const Comments = ({ comments }) => {
  const commentsData = comments.read();
  return (
    <CommentsWrapper>
      <CommentsList comments={commentsData} />
    </CommentsWrapper>
  );
};

const CommentsPH = () => (
  <CommentsWrapper>
    <CommentsListPH placeholders={3} />
  </CommentsWrapper>
);

const CommentsWrapper = ({ children, props }) => (
  <Stack spacing={8} mb={8}>
    <Heading
      size="md"
      pb={4}
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
    >
      Comments
    </Heading>
    {children}
  </Stack>
);
