<script lang="ts">
	import Navbar from '$lib/navbar/Navbar.svelte';
	import {canvasState} from "$lib/stores"

	function openCanvas() {
    canvasState.set(true);
  }

</script>

<Navbar {openCanvas} />
<slot/>