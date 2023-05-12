<script lang="ts">
	import { gallery } from "$lib/stores";
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

<div class="div">
  <button class="actionButton" on:click={()=>deleteContainer(container)}>
    X
  </button>
</div>

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
