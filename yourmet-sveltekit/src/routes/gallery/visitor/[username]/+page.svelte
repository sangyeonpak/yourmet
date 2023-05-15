<script lang="ts">
  import { seen, userInfo } from "$lib/stores"
	import TheirInfo from '$lib/userinfo/TheirInfo.svelte';
	import TheirGallery from '$lib/gallery/TheirGallery.svelte';
	import '../../../../global.css';
  export let data:any;
	import { reload } from "$lib/functions";
  $: if ($userInfo){
    reload(1, $userInfo.username);
  }
</script>

<title>Visiting {data.theirInfo[0].first_name}'s Gallery - YourMet</title>
<div class="main">
  <TheirInfo theirInfo={data.theirInfo[0]} theirGallery={data.theirGallery} theirSeen={data.theirSeen}/>
  <TheirGallery theirGallery={data.theirGallery}/>
</div>

<style>
  .main{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>