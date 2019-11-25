const { LoremIpsum } = require("lorem-ipsum");
const DELAY = 3000;

module.exports = {
  byPost({ postId }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const comments = allComments.filter(c => c.postId === postId);
        if (comments) {
          resolve(comments);
        } else {
          reject("Comments not found");
        }
      }, DELAY);
    });
  }
};

const loremComment = new LoremIpsum({
  wordsPerSentence: { max: 9, min: 5 }
});

const allComments = new Array(500).fill(true).reduce((acc, _, postId) => {
  new Array(postId % 7).fill().forEach((_, commentId) => {
    acc.push({
      id: commentId,
      postId,
      comment: loremComment.generateParagraphs((commentId % 2) + 1),
      userName: loremComment.generateWords(2)
    });
  });

  return acc;
}, []);
