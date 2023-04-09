<script lang="ts">
  export let openModal:any;
  export let container:number;
</script>

<button class="addArtButton" on:click={openModal(container)}>
  +
</button>