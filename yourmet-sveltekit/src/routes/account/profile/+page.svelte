<script lang="ts">
	import '../../../global.css';
	import Loader from "$lib/account/Loader.svelte"
	import { checkUser } from '$lib/functions'
	import { user } from "$lib/stores"
	import Edit from "$lib/account/Edit.svelte"
	checkUser($user.email)
</script>

<div class="profile">
  <img class="profilePhoto" src={$user.picture} alt="user"/>
  <div class="profileInfo">{$user.given_name || ""} {$user.family_name || ""} <span><Edit/></span></div>
  <div class="profileInfo">Favorite Artist <span><Edit/></span></div>
  <div class="profileInfo">Favorite Artwork <span><Edit/></span></div>
  <div class="profileInfo">Favorite Period <span><Edit/></span></div>
</div>

<style>

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