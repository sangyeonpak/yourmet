<script lang="ts">
  import { user, seen, userInfo } from "$lib/stores"
	import MediaQuery from '$lib/MediaQuery.svelte';
  export let artwork:any;
  export let dimensions: any;
  let isItSeen:boolean = false;
  $: for (let toFind of $seen){
    if (toFind.image_id == artwork.image_id){
      isItSeen = true;
    }
  }

  function markSeen() {
    fetch(`/api/seen/`, {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({...artwork, email:$user.email, username:$userInfo.username}),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    $seen = [...$seen, {...artwork, email:$user.email, username:$userInfo.username}];
    isItSeen = !isItSeen;
  }
  function undoSeen() {
    fetch(`/api/seen/`, {
      mode: "cors",
      method: "DELETE",
      body: JSON.stringify({image_id:artwork.image_id, username:$userInfo.username}),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    for (let i = 0; i < $seen.length; i++){
      if ($seen[i].image_id == artwork.image_id){
        $seen.splice(i, 1);
      }
      $seen = $seen;
    }
    isItSeen = !isItSeen;
  }
</script>

<MediaQuery query="(min-width: 1100px)" let:matches>
{#if !isItSeen}
<button class="actionButton" style={matches ? "height: 32px; width: 32px" : "height: 40px; width: 40px"} on:click={markSeen} value={artwork.image_id}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={matches ? "32" : "40"}
    height={matches ? "32" : "40"}
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
  </svg>
</button>
{:else}
  <button class="actionButton" style={matches ? "height: 32px; width: 32px" : "height: 40px; width: 40px"} on:click={undoSeen} value={artwork.image_id}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={matches ? "32" : "40"}
      height={matches ? "32" : "40"}
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
    </svg>
  </button>
  {/if}
</MediaQuery>