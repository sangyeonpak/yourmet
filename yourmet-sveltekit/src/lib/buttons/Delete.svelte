<script lang="ts">
	import { reload } from "$lib/functions";
  export let container:number;
  async function deleteContainer(container:number){
    fetch(`/api/art/${container}`, {
      mode: "cors",
      method: "DELETE",
      body: JSON.stringify({id: container}),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    reload(2);
  }
</script>

<div class="div">
  <button class="deleteContainerButton" on:click={()=>deleteContainer(container)}>
    X
  </button>
</div>

<style>
.div {
  display: flex;
  justify-content: flex-end;
}
</style>
