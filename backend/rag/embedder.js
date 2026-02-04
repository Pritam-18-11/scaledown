const stopWords = new Set([
  "the",
  "is",
  "and",
  "or",
  "to",
  "of",
  "a",
  "in",
  "on",
  "for",
  "with",
  "your",
  "our",
  "you",
  "we",
  "be",
  "are",
  "an",
  "by",
  "at",
  "from",
  "as"
]);

export const tokenize = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token && !stopWords.has(token));

export const embedText = (text) => {
  const tokens = tokenize(text);
  return tokens.reduce((acc, token) => {
    acc[token] = (acc[token] || 0) + 1;
    return acc;
  }, {});
};

export const cosineSimilarity = (vecA, vecB) => {
  const keys = new Set([...Object.keys(vecA), ...Object.keys(vecB)]);
  let dot = 0;
  let magA = 0;
  let magB = 0;

  keys.forEach((key) => {
    const a = vecA[key] || 0;
    const b = vecB[key] || 0;
    dot += a * b;
    magA += a * a;
    magB += b * b;
  });

  if (magA === 0 || magB === 0) {
    return 0;
  }

  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
};
