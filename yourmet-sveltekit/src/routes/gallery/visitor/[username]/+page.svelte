<script lang="ts">
  import { seen, userInfo } from "$lib/stores"
	import TheirInfo from '$lib/userinfo/TheirInfo.svelte';
	import TheirGallery from '$lib/gallery/TheirGallery.svelte';
	import '../../../../global.css';
  export let data:any;
  console.log($userInfo);
</script>

{#if $seen}
<div class="main">
  <TheirInfo theirInfo={data.theirInfo[0]} theirGallery={data.theirGallery} theirSeen={data.theirSeen}/>
  <TheirGallery theirGallery={data.theirGallery}/>
</div>
{/if}

<style>
  .main{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>