import React, { useState, useEffect } from "react";
import { Stack, Heading } from "@chakra-ui/core";

import { getPostById, getPosts } from "../api";

import { PageWrapper } from "../components/PageWrapper";
import { PostList, PostListPH } from "../components/PostList";
import { PostDetail, PostDetailPH } from "../components/PostDetail";

export default function Detail({ match }) {
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [post, setPost] = useState();
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    let cancelled = false;
    setLoadingPost(true);
    getPostById({ id: match.params.postId }).then(p => {
      if (cancelled) return;
      setPost(p);
      setLoadingPost(false);
    });
    return () => (cancelled = true);
  }, [match.params.postId]);

  useEffect(() => {
    let cancelled = false;
    setLoadingRelated(true);
    getPosts({ limit: 3, relatedTo: match.params.postId }).then(p => {
      if (cancelled) return;
      setRelatedPosts(p);
      setLoadingRelated(false);
    });
    return () => (cancelled = true);
  }, [match.params.postId]);

  return (
    <PageWrapper>
      <Stack spacing={4}>
        {loadingPost ? <PostDetailPH /> : <PostDetail post={post} />}
        {loadingRelated ? (
          <RelatedPostsPH />
        ) : (
          <RelatedPosts posts={relatedPosts} />
        )}
      </Stack>
    </PageWrapper>
  );
}

const RelatedPosts = ({ posts }) => (
  <RelatedPostsWrapper>
    <PostList posts={posts} />
  </RelatedPostsWrapper>
);

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
