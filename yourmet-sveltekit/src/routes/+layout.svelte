<script lang="ts">
	import Navbar from '$lib/navbar/Navbar.svelte';
	import MobileNavbar from '$lib/navbar/MobileNavbar.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import MediaQuery from '$lib/MediaQuery.svelte';
	let show = true;
</script>

<!-- {#if show}
<div class="welcome">
	<button on:click={() => show = false}>X</button>
	<p>Welcome to YourMet!</p>
	<p>If you are signing up, it's recommended you change your username as it is derived from your email.</p>
</div>
{/if} -->
<MediaQuery query="(min-width: 900px)" let:matches>
	{#if matches}
		<Navbar />
	{:else}
		<MobileNavbar />
	{/if}
</MediaQuery>

<slot />
<Footer />

<style>
	.welcome{

	}
</style>
