<script lang="ts">
	import { gallery } from "$lib/stores";
	import MediaQuery from '$lib/MediaQuery.svelte';
  export let container:number;
  function deleteContainer(container:number){
    fetch(`/api/art`, {
      mode: "cors",
      method: "DELETE",
      body: JSON.stringify({id: container}),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    for (let i = 0; i < $gallery.length; i++){
      if ($gallery[i].id === container){
        $gallery.splice(i, 1)
      }
    }
    $gallery = $gallery;
  }
</script>

<MediaQuery query="(min-width: 1100px)" let:matches>
<div class="div">
  <button class="actionButton" style={matches ? "height: 32px; width: 32px; font-size:14px" : "height: 40px; width: 40px; font-size:17px"} on:click={()=>deleteContainer(container)}>
    X
  </button>
</div>
</MediaQuery>

<style>
.div {
  display: flex;
  justify-content: flex-end;
}
.actionButton{
  position: absolute;
  right: 5px;
}
</style>
