<script context="module">
  export const load = async ({ page, fetch }) => {
    const id = page.params.id;
    const res = await fetch(`/api/blog/${id}.json`);
    const post = await res.json();
    const user = post.user;
    return {
      props: {
        post,
        user,
      },
    };
  };
</script>

<script>
  export let post;
  export let user;
</script>

<h1>{post.title}</h1>
<p>{post.body}</p>
<p>
  - Written by <a sveltekit:prefetch href={`/authors/${user.id}`}>{user.name}</a
  >
</p>
