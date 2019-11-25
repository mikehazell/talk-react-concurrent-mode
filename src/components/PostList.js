import React from "react";
import { format as formatDate } from "date-fns";
import {
  AspectRatioBox,
  Avatar,
  Box,
  Grid,
  Heading,
  Image as CKImage,
  Stack,
  Text
} from "@chakra-ui/core";

import { Link } from "../router";
import { style } from "../constants";

import { formatImage } from "../lib/formatImage";

export const PostList = React.memo(({ posts, ...props }) => (
  <PostListWrapper>
    {posts.map(p => (
      <Post key={p.id} post={p} />
    ))}
  </PostListWrapper>
));

export const PostListPH = ({ placeholders = 9 }) => (
  <PostListWrapper>
    {Array(placeholders)
      .fill(true)
      .map((_, index) => (
        <PostPH key={index} />
      ))}
  </PostListWrapper>
);

// Post

const PostListWrapper = props => (
  <Grid
    gap={4}
    templateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
    {...props}
  />
);

const Post = ({ post, ...props }) => (
  <PostWrapper {...props} as={Link} to={`/posts/${post.id}`}>
    <Image image={post.image} />
    <Title title={post.title} />
    <Summary summary={post.subTitle} />
    <Meta post={post} />
  </PostWrapper>
);

const PostPH = props => (
  <PostWrapper {...props}>
    <ImagePH />
    <TitlePH />
    <SummaryPH />
    <MetaPH />
  </PostWrapper>
);

const PostWrapper = props => (
  <Stack
    spacing={3}
    paddingBottom={4}
    bg="white"
    overflow="hidden"
    {...props}
  />
);

// Image

const IMAGE_W = 460;
const IMAGE_H = 244;
const IMAGE_Ratio = IMAGE_W / IMAGE_H;

const Image = ({ image, size, ...props }) => (
  <ImageWrapper {...props}>
    <CKImage
      src={formatImage(image, IMAGE_W, IMAGE_H)}
      w={IMAGE_W}
      h={IMAGE_H}
    />
  </ImageWrapper>
);

const ImagePH = ({ src, ...props }) => (
  <ImageWrapper {...props}>
    <Box w={IMAGE_W} h={IMAGE_H} />
  </ImageWrapper>
);

const ImageWrapper = props => (
  <AspectRatioBox
    ratio={IMAGE_Ratio}
    backgroundColor={style.FALLBACK_COLOR}
    {...props}
  />
);

// Title

const Title = ({ title, ...props }) => (
  <TitleWrapper {...props}>
    <Heading as="h3" fontSize="2xl">
      {title}
    </Heading>
  </TitleWrapper>
);

const TitlePH = props => (
  <TitleWrapper {...props}>
    <Box bg={style.FALLBACK_COLOR} height={"30px"} width="75%" />;
  </TitleWrapper>
);

const TitleWrapper = props => <Stack spacing={2} {...props} />;

// Meta

const Meta = ({ post: { user, createdAt, readTime }, title, ...props }) => (
  <MetaWrapper {...props}>
    <Avatar name={user.name} src={user.avatar.thumbnail} size="sm" />
    <Stack spacing={1}>
      <Text fontSize="xs" color="gray.500" lineHeight="shorter">
        {user.name}
      </Text>
      <Text fontSize="xs" color="gray.500" lineHeight="shorter">
        {formatDate(new Date(createdAt), "MMM d")} • {readTime} min read
      </Text>
    </Stack>
  </MetaWrapper>
);

const MetaPH = props => (
  <MetaWrapper {...props}>
    <Box
      rounded="full"
      w={8}
      h={8}
      flexShrink={0}
      lineHeight={0}
      background={style.FALLBACK_COLOR}
    />
    <Stack spacing={1} w="100%">
      <Box h={"10px"} w={"40%"} bg={style.FALLBACK_COLOR} />
      <Box h={"10px"} w={"50%"} bg={style.FALLBACK_COLOR} />
    </Stack>
  </MetaWrapper>
);

const MetaWrapper = props => (
  <Stack isInline spacing={3} alignItems="center" {...props} />
);

// Summary

export const Summary = ({ summary, ...props }) => (
  <SummaryWrapper {...props}>
    <Text as="p" fontSize="md" color="gray.500">
      {summary}
    </Text>
  </SummaryWrapper>
);

export const SummaryPH = props => (
  <SummaryWrapper {...props}>
    <Box bg={style.FALLBACK_COLOR} height={"15px"} width="98%" />
    <Box bg={style.FALLBACK_COLOR} height={"15px"} width="92%" />
    <Box bg={style.FALLBACK_COLOR} height={"15px"} width="94%" />
  </SummaryWrapper>
);

const SummaryWrapper = props => <Stack spacing={2} {...props} />;
