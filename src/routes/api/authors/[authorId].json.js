export const get = async (request) => {

  const id = request.params.authorId;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}?_embed=posts`
  );

  return {
    status: 200,
    body: await res.json(),
  };
};
