<script lang="ts">
  export let container:any;
  let showList = false;
  function listActions() {

  }
</script>

<span class="button" on:click={() => showList = !showList}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="rgb(77, 77, 77)" class="bi bi-three-dots" viewBox="0 0 16 16">
  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
</svg></span>
<div class="menu">
  <div class="item">Delete</div>
  <div class="item">Change artwork</div>
</div>

<style>
  .menu {
    position: absolute;
    outline: 1px solid black;
    z-index: 2;
  }
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    color: rgb(77, 77, 77)
  }
  .item {
    font-size: 0.9rem;
  }
</style>