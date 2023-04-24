<script lang="ts">
	import { gallery, seen } from '$lib/stores';
  import { user } from "$lib/stores";
	$: onDisplay = [...$gallery]; // it doesn't like it when I do $gallery.filter
</script>

{#if $user != undefined}
	<div class="userInfo">
		{#if $user.given_name != undefined}
		<div class="username">{$user.given_name}'s Met</div>
		{:else}
		<div class="username">Your gallery</div>
		{/if}
		<div class="userStats">
			Seen <span class="userStats">{$seen.length}</span> artworks and a curator of
			<span class="userStats">
				{onDisplay.filter((artwork) => artwork.image_id !== null).length}
			</span>.
		</div>
	</div>
{/if}

<style>
	.userInfo {
		max-width: 100vw;
		justify-content: center;
		background-image: url(https://rare-gallery.com/mocahbig/441945-ultrawide-Vincent-van-Gogh-painting-impressionism.jpg);
		background-size: cover;
	}

	.username,
	.userStats {
		max-width: 80vw;
		margin: auto;
		padding-top: 35px;
		font-size: 60px;
		color: white;
		font-family: 'DM Serif Display', serif;
	}

	.userStats {
		font-size: 32px;
		padding-bottom: 200px;
	}
</style>
