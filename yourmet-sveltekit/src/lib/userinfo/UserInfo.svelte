<script lang="ts">
	import { gallery, seen, user, userInfo } from '$lib/stores';
	import { checkUser } from '$lib/functions'
	$: onDisplay = [...$gallery]; // it doesn't like it when I do $gallery.filter
	checkUser($user.email)
</script>

{#if $userInfo != undefined}
	<div class="userInfo" style="background-image: url({`${$userInfo.cover_photo || "https://rare-gallery.com/mocahbig/441945-ultrawide-Vincent-van-Gogh-painting-impressionism.jpg"}`})">
		{#if $userInfo.first_name != undefined}
		<div class="username">{$userInfo.first_name}'s Met</div>
		{:else}
		<div class="username">Your gallery</div>
		{/if}
		<div class="userStats">
			Seen <span class="userStats">{$seen.length}</span> artworks and a curator of
			<span class="userStats">
				{onDisplay.filter((artwork) => artwork.image_id !== undefined).length}
			</span>.
		</div>
	</div>
{/if}

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
