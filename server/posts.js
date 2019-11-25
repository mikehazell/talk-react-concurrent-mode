// Generate a random list of posts
const { LoremIpsum } = require("lorem-ipsum");
const { users } = require("./users");

const DELAY = 1000;

module.exports = {
  list({ filter, limit = 36, relatedTo }) {
    const start = relatedTo ? parseInt(relatedTo, 10) + 1 : 0;
    const end = parseInt(limit, 10) + start;
    return new Promise(resolve => {
      setTimeout(() => {
        if (filter) {
          resolve(postTextSearch(allPosts, filter).slice(start, end));
        } else {
          resolve(allPosts.slice(start, end));
        }
      }, DELAY * 2);
    });
  },
  byId({ id }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const post = allPosts.find(p => p.id === id);
        if (post) {
          resolve({
            ...post,
            body: lorem.generateParagraphs(4)
          });
        } else {
          reject("Post not found");
        }
      }, DELAY);
    });
  }
};

// Search

const postTextSearch = (haystack, needle) =>
  haystack.filter(p => search(p.title, needle) || search(p.subTitle, needle));

const search = (haystack, needle) =>
  haystack.toLowerCase().includes(needle.toLowerCase());

// Generate our testing data

const NOW = Date.now();
const HOURS = 60 * 1000;

const lorem = new LoremIpsum({
  sentencesPerParagraph: { max: 5, min: 3 },
  wordsPerSentence: { max: 8, min: 4 }
});

const loremTitle = new LoremIpsum({
  wordsPerSentence: { max: 9, min: 5 }
});

const loremSubTitle = new LoremIpsum({
  wordsPerSentence: { max: 24, min: 12 }
});

const allPosts = new Array(500).fill(true).map((_, index) => {
  return {
    id: String(index),
    image: `https://picsum.photos/seed/${(index % 15) + 1}/_W_/_H_`,
    title: loremTitle.generateSentences(1),
    subTitle: loremSubTitle.generateSentences(1),
    summary: lorem.generateParagraphs(1),
    user: formatUser(users[index % users.length]),
    createdAt: new Date(NOW - index * HOURS).toISOString(),
    readTime: (Math.round(index * Math.random() * 10) % 15) + 3
  };
});

function formatUser(user) {
  return {
    name: `${user.name.first} ${user.name.last}`,
    avatar: user.picture
  };
}
