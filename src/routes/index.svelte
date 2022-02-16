<script context="module">
  export const load = async ({ fetch }) => {
    const res = await fetch("/api/posts.json");
    const posts = await res.json();
    return {
      props: {
        posts,
      },
    };
  };
</script>

<script>
  export let posts;
  let searchTerm = "";

  $: searchedPosts = posts.filter((post) => {
    return post.title.includes(searchTerm) || post.body.includes(searchTerm);
  });

  $: items = searchedPosts.slice(0, perPage);

  let currentPage = 1;
  let perPage = 10;
  let pages = posts.length / perPage;
  $: items = posts.slice(perPage * (currentPage - 1), perPage * currentPage);

</script>

<h1>Posts</h1>

<input type="text" placeholder="search" bind:value={searchTerm} />

<div class="posts">
  {#if posts.length}
    {#each items as item}
      <div class="post">
        <h2>{item.title.substring(0, 20)}</h2>
        <p>{item.body.substring(0, 80)}</p>
        <p class="link">
          <a sveltekit:prefetch href={`/blog/${item.id}`}>Read More</a>
        </p>
      </div>
    {/each}
  {:else}
    <p>No posts found with "{searchTerm}"</p>
  {/if}
</div>

{#if currentPage != 1}
  <button on:click={() => (currentPage -= 1)}>Previous</button>
{/if}

{#if currentPage != pages}
  <button on:click={() => (currentPage += 1)}>Next</button>
{/if}

<style>
  .posts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    margin: 30px 0;
  }

  .post {
    padding: 20px;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px #eee;
  }

  h2 {
    margin: 0;
  }

  .link {
    text-align: right;
  }

  input {
    border: 1px solid #ddd;
    padding: 10px 20px;
    border-radius: 5px;
  }

  @media screen and (max-width: 600px) {
    .posts {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 20px;
      margin: 30px 0;
    }
  }
</style>
