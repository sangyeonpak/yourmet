<script lang="ts">
  import { userInfo, gallery, seen } from "$lib/stores"
  let today = new Date();
  let greeting:string;
  if (today.getHours() > 0 && today.getHours() < 12){
    greeting = "morning"
  } else if (today.getHours() >= 12 && today.getHours() < 18){
    greeting = "afternoon"
  } else {
    greeting = "evening";
  }
</script>

<title>Account - YourMet</title>
{#if $userInfo}
<div class="stats">
  <div class="welcome">{#if $userInfo.first_name}Good {greeting}, {$userInfo.first_name}.{:else}Good {greeting}.{/if}</div>
  <div class="seen">
    You have
    {#if $seen.length == 0}not seen any artworks yet.

    {:else if $seen.length == 1}seen 1 artwork. It is:
      <li>
        <a href={$seen[0].info_url} target="_blank" rel="noreferrer" class="listInfo">
          {$seen[0].artist || "Unknown artist"} - <span class="name">{$seen[0].name || "Untitled"}</span>
        </a>
      </li>

    {:else}seen {$seen.length} artworks. They are:
      {#each $seen as artwork}
        <li>
          <a href={artwork.info_url} target="_blank" rel="noreferrer" class="listInfo">
            {artwork.artist || "Unknown artist"} - <span class="name">{artwork.name || "Untitled"}</span>
          </a>
        </li>
      {/each}
    {/if}
  </div>

  <div class="gallery">
    You have
    {#if $gallery.length == 0}not displayed any artworks yet.

    {:else if $gallery.length == 1} 1 displayed artwork. It is:
      <li>
        <a href={$gallery[0].info_url} target="_blank" rel="noreferrer" class="listInfo">
          {$gallery[0].artist || "Unknown artist"} - <span class="name">{$gallery[0].name || "Untitled"}</span>
        </a>
      </li>

    {:else}{$gallery.length} displayed artworks. They are:
      {#each $gallery as artwork}
        <li>
          <a href={artwork.info_url} target="_blank" rel="noreferrer" class="listInfo">
            {artwork.artist || "Unknown artist"} - <span class="name">{artwork.name || "Untitled"}</span>
          </a>
        </li>
      {/each}
    {/if}
  </div>
</div>
{/if}

<style>
  .welcome {
		border-bottom: 1px solid lightgray;
		font-family: 'DM Serif Display', serif;
		text-align: center;
		font-size: 20px;
	}
  .stats{
    text-align: start;
    padding: 20px;
  }
  .seen{
    margin-bottom: 20px;
  }
</style>