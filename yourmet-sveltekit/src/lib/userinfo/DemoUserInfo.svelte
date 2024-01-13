<script lang="ts">
	export let gallery:any;
	$: num = gallery.filter((artwork:any) => artwork.image_url !== null).length;
</script>

<div class="userInfo" style="background-image: url(https://imgur.com/G4ohc8N.jpeg)">
	<div class="username">Your gallery</div>
	<div class="userStats">
		Seen <span class="userStats">0</span> artworks and a curator of
		<span class="userStats">
			{num}
		</span>.
	</div>
</div>

<style>
	.userInfo {
		/* background-image: url(https://imgur.com/G4ohc8N.jpeg); */
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
