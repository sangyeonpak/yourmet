<script lang="ts">
	import '../../../global.css';
	import Loader from "$lib/account/Loader.svelte"
	import { checkUser } from '$lib/functions'
	import { user, userInfo } from "$lib/stores"
	import Edit from "$lib/account/Edit.svelte"
	checkUser($user.email)
</script>

{#if $userInfo != undefined}
<div class="profile">
	<div class="header">Your public info.</div>
  <img class="profilePhoto" src={$userInfo.picture} alt="user"/>
  <div class="profileInfo">{$userInfo.first_name || ""} {$userInfo.last_name || ""}<span><Edit/></span></div>
  <div class="profileInfo">Username (this is how people will find your gallery): {$userInfo.username}<span><Edit/></span></div>
  <div class="profileInfo">Favorite Artist: {$userInfo.favorite_artist || "None"}<span><Edit/></span></div>
  <div class="profileInfo">Favorite Artwork: {$userInfo.favorite_artist || "None"}<span><Edit/></span></div>
  <div class="profileInfo">Favorite Period: {$userInfo.favorite_artist || "None"}<span><Edit/></span></div>
</div>
{/if}

<style>
	.header {
		border-bottom: 1px solid lightgray;
		font-family: 'DM Serif Display', serif;
		text-align: center;
		font-size: 20px;
	}

	.profileInfo {
		margin: 20px;
	}

	.profilePhoto {
		outline: 1px solid black;
		border-radius: 100%;
		width: 150px;
		height: 150px;
		margin-top: 20px;
	}
</style>