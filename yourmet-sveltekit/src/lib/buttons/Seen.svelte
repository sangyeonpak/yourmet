<script lang="ts">
	import { reload } from "$lib/functions";
  import { seen, user } from "$lib/stores"
  export let artwork:any;
  let isItSeen:boolean = false;
  for (let toFind of $seen){
    if (toFind.image_id == artwork.image_id){
      // console.log(toFind.image_id, artwork.image_id);
      isItSeen = true;
    }
  }
  function markSeen() {
    fetch(`/api/seen/`, {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({...artwork, email:$user.email}),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    reload(1, $user.email);
    isItSeen = !isItSeen;
  }
  function undoSeen() {
    fetch(`/api/seen/`, {
      mode: "cors",
      method: "DELETE",
      body: JSON.stringify({image_id:artwork.image_id, email:$user.email}),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    reload(1, $user.email);
    isItSeen = !isItSeen;
  }
</script>

{#if !isItSeen}
<button class="markSeenButton" on:click={markSeen} value={artwork.image_id}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
  </svg>
</button>
{:else}
  <button class="markUnseen" on:click={undoSeen} value={artwork.image_id}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
    </svg>
  </button>
{/if}