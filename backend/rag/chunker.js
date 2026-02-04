const MAX_CHUNK_SIZE = 480;

export const chunkDocument = (doc) => {
  const paragraphs = doc.content.split(/\n\n+/);
  const chunks = [];
  let buffer = "";

  const flush = () => {
    if (buffer.trim()) {
      chunks.push({
        id: `${doc.id}-${chunks.length + 1}`,
        title: doc.title,
        source: doc.source,
        content: buffer.trim()
      });
    }
    buffer = "";
  };

  paragraphs.forEach((paragraph) => {
    if ((buffer + paragraph).length > MAX_CHUNK_SIZE) {
      flush();
    }
    buffer = `${buffer}\n${paragraph}`.trim();
  });

  flush();
  return chunks;
};
