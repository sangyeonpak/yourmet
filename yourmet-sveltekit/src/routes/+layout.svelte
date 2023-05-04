<script lang="ts">
	import Navbar from '$lib/navbar/Navbar.svelte';
	import MobileNavbar from '$lib/navbar/MobileNavbar.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import MediaQuery from '$lib/MediaQuery.svelte';
</script>

<MediaQuery query="(min-width: 900px)" let:matches>
	{#if matches}
		<Navbar />
	{:else}
		<MobileNavbar />
	{/if}
</MediaQuery>

<slot />
<Footer />
