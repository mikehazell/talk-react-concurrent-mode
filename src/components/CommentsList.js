import React from "react";
import { Stack, Heading, Box, Text } from "@chakra-ui/core";
import { style } from "../constants";

export const CommentsList = ({ comments }) => (
  <Stack spacing={4}>
    {comments.map(c => (
      <Comment key={c.id} comment={c} />
    ))}
  </Stack>
);

export const CommentsListPH = ({ placeholders = 3 }) => (
  <Stack spacing={4}>
    {new Array(placeholders).fill().map((_, index) => (
      <CommentPH key={index} />
    ))}
  </Stack>
);

const Comment = ({ comment }) => (
  <Box p={4}>
    <Text>{comment.comment}</Text>
    <Text fontWeight="bold">{comment.userName}</Text>
  </Box>
);

const CommentPH = () => <Box w="60%" h={4} background={style.FALLBACK_COLOR} />;
