<script lang="ts">
	import { userInfo } from "$lib/stores";
	import { reload } from "$lib/functions";
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
    reload(2, $userInfo.username);
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
