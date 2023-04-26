<script lang="ts">
	import { gallery, seen } from "$lib/stores"
  export let closeCanvas:any;
  $: onDisplay = [...$gallery];
  $: seenList = [...$seen];
</script>

<div class="offCanvas">
  <button class="closeCanvas" on:click={closeCanvas}>x</button>
  <h3>On Display <span>({onDisplay.filter((artwork) => artwork.image_id !== null).length})</span></h3>
  <ul>
    {#each onDisplay as artwork}
      {#if artwork.image_id !== null}
        <li>
          <a href={artwork.info_url} target="_blank" rel="noreferrer" class="listInfo">
            {artwork.artist || "Unknown artist"} - <span class="name">{artwork.name || "Untitled"}</span>
          </a>
        </li>
      {/if}
    {/each}
  </ul>
  <h3>Seen <span>({seenList.length})</span></h3>
  <ul>
    {#each seenList as artwork}
    <li>
      <a href={artwork.info_url} target="_blank" rel="noreferrer" class="listInfo">
        {artwork.artist || "Unknown artist"} - <span class="name">{artwork.name || "Untitled"}</span>
      </a>
    </li>
    {/each}
  </ul>
</div>
<div on:click={closeCanvas} on:keypress={closeCanvas} class="offCanvasBackdrop"></div>

<style>

.offCanvas {
  z-index: 7;
  position: fixed;
  height: 100%;
  width: 25vw;
  top: 0;
  background-color: white;
  padding: 15px;
}

.offCanvasBackdrop {
  position: fixed;
  z-index: 4;
  background-color: rgba(0, 0, 0, 0.75);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
}
.listInfo{
  font-weight: 100;
}
.listInfo:hover{
  text-decoration:underline;
}
.name {
  /* font-weight: 500; */
  font-style: italic;
}

</style>