import React from "react";
import {
  AspectRatioBox,
  Avatar,
  Box,
  Heading,
  Image as CKImage,
  Stack,
  Text
} from "@chakra-ui/core";
import { format as formatDate } from "date-fns";
import { formatImage } from "../lib/formatImage";

import { style } from "../constants";

export const PostDetail = ({ post, ...props }) => (
  <Stack maxW={640} width="full" marginX="auto" spacing={8} {...props}>
    <Stack spacing={2}>
      <Title>{post.title}</Title>
      <SubTitle>{post.subTitle}</SubTitle>
    </Stack>
    <Meta post={post} title={post.user.name} />
    <Image image={post.image} size="large" />
    <Content body={post.body} pb={5} />
  </Stack>
);

export const PostDetailPH = props => (
  <Stack maxW={640} width="full" marginX="auto" spacing={8} {...props}>
    <Stack spacing={2}>
      <TitlePH />
      <SubTitlePH />
    </Stack>
    <MetaPH />
    <ImagePH />
    <ContentPH />
  </Stack>
);

// Title

const Title = props => (
  <Heading
    as="h1"
    margin={0}
    fontFamily="heading"
    fontWeight="lighter"
    fontSize="4xl"
    {...props}
  />
);

const TitlePH = props => (
  <Box h={8} w="90%" bg={style.FALLBACK_COLOR} {...props} />
);

// SubTitle

const SubTitle = props => (
  <Heading
    as="h2"
    margin={0}
    color="gray.500"
    fontWeight="normal"
    fontSize="xl"
    {...props}
  />
);

const SubTitlePH = props => (
  <Box h={4} w="85%" bg={style.FALLBACK_COLOR} {...props} />
);

// Meta

const Meta = ({ post, ...props }) => (
  <MetaWrapper {...props}>
    <Avatar name={post.user.name} src={post.user.avatar.medium} size="md" />
    <Stack spacing={1}>
      <Text fontSize="sm" lineHeight="shorter">
        {post.user.name}
      </Text>
      <Text fontSize="sm" color="gray.500">
        {formatDate(new Date(post.createdAt), "MMM d")} • {post.readTime} min
        read
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
      <Box h={"10px"} w={"20%"} bg={style.FALLBACK_COLOR} />
      <Box h={"10px"} w={"25%"} bg={style.FALLBACK_COLOR} />
    </Stack>
  </MetaWrapper>
);

const MetaWrapper = props => (
  <Stack isInline spacing={3} alignItems="center" {...props} />
);

// Image

const IMAGE_W = 1024;
const IMAGE_H = 600;
const IMAGE_RATIO = IMAGE_W / IMAGE_H;

const Image = ({ image, ...props }) => (
  <ImageWrapper {...props}>
    <CKImage src={formatImage(image, IMAGE_W, IMAGE_H)} />
  </ImageWrapper>
);

const ImagePH = ({ src, ...props }) => (
  <ImageWrapper {...props}>
    <Box />
  </ImageWrapper>
);

const ImageWrapper = props => (
  <AspectRatioBox
    ratio={IMAGE_RATIO}
    backgroundColor={style.FALLBACK_COLOR}
    {...props}
  />
);

// Content

export const Content = ({ body, ...props }) => (
  <ContentWrapper {...props}>
    {body.split("\n").map((line, index) => (
      <Text key={index} as="p" fontSize="md">
        {line}
      </Text>
    ))}
  </ContentWrapper>
);

export const ContentPH = props => (
  <ContentWrapper {...props}>
    <Box bg={style.FALLBACK_COLOR} height={"15px"} />
    <Box bg={style.FALLBACK_COLOR} height={"15px"} />
    <Box bg={style.FALLBACK_COLOR} height={"15px"} />
    <Box bg={style.FALLBACK_COLOR} height={"15px"} />
    <Box bg={style.FALLBACK_COLOR} height={"15px"} />
    <Box bg={style.FALLBACK_COLOR} height={"15px"} />
  </ContentWrapper>
);

const ContentWrapper = props => <Stack spacing={2} {...props} />;
