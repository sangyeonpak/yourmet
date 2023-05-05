<script lang="ts">
  export let theirInfo:any;
  export let theirGallery:any;
  export let theirSeen:any;
</script>

<div class="userInfo" style="background-image: url({`${theirInfo.cover_photo || "https://rare-gallery.com/mocahbig/441945-ultrawide-Vincent-van-Gogh-painting-impressionism.jpg"}`})">
  {#if theirInfo.first_name != undefined}
  <div class="username">{theirInfo.first_name}'s Met</div>
  {:else}
  <div class="username">{theirInfo.username}'s Met</div>
  {/if}
  <div class="userStats">
    Seen <span class="userStats">{theirSeen.length}</span> artworks and a curator of
    <span class="userStats">
      {theirGallery.length}
    </span>.
  </div>
</div>

<style>
	.userInfo {
		/* background-image: url(https://rare-gallery.com/mocahbig/441945-ultrawide-Vincent-van-Gogh-painting-impressionism.jpg); */
		background-size: cover;
		background-position: center;
		height: 70vh;
	}

	.username,
	.userStats {
		max-width: 80vw;
		margin: auto;
		padding-top: 35px;
		font-size: 3.3rem;
		color: white;
		font-family: 'DM Serif Display', serif;
    /* font-weight: 100; */
		text-shadow: 2px 2px #000000;
	}

	.userStats {
		font-size: 32px;
	}
</style>
