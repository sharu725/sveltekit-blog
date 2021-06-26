<script context="module">
  export const load = async ({ page, fetch }) => {
    const id = page.params.authorId;

    const [resUser, resPosts] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`),
      fetch("https://jsonplaceholder.typicode.com/posts"),
    ]);

    const user = await resUser.json();
    const allPosts = await resPosts.json();

    const posts = allPosts.filter((post) => {
      return post.userId === user.id;
    });

    return {
      props: {
        user,
        posts,
      },
    };
  };
</script>

<script>
  export let user;
  export let posts;
</script>

<h1>{user.name}</h1>
<p>{user.company.catchPhrase}</p>
<p>{user.email}</p>

<h2>Posts by {user.name}</h2>
<ul>
  {#each posts as item}
    <li>
      <a href={`/blog/${item.id}`}>{item.title}</a>
    </li>
  {/each}
</ul>

<style>
  li {
    margin-bottom: 10px;
  }
</style>
