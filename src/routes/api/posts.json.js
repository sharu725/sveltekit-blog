export const get = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  return {
    status: 200,
    body: await res.json(),
  };
};
