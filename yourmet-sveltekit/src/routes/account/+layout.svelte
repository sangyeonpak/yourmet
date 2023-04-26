<script lang="ts">
	import '../../global.css';
	import { user, seen, gallery } from "$lib/stores"
	import Loader from "$lib/account/Loader.svelte"
</script>

{#if $user != undefined}
	<div class="main">
		<!-- have add this silly Loader component to get $seen and $gallery to load; on:load={() => reload(1, $user.email)} doesn't work, nor #await -->
			<div class="menu">
				<div class="welcome">Welcome, {$user.given_name}</div>
				<div class="options"><a href="/account/profile">Personal info</a></div>
				<div class="options"><a href="/account/coverphoto">Cover photo</a></div>
				<!-- <div class="options">My reviews</div> -->
				<div class="options"><a href="/account/stats">My stats</a></div>
			</div>
		<div class="dashboard">
			<slot></slot>
		</div>
	</div>
{/if}

<style>
	.main {
		/* border-top: 1px solid gray; */
		margin: auto;
		margin-top: 30px;
		margin-bottom: 30px;
		display: flex;
		width: 80%;
	}
	.welcome {
		border-bottom: 1px solid lightgray;
		font-family: 'DM Serif Display', serif;
		text-align: center;
		font-size: 20px;
	}
	.menu {
		outline: 1px solid black;
		width: 20%;
		display: flex;
		flex-direction: column;
		padding: 40px;
	}
	.options {
		margin-top: 40px;
		font-size: 14px;
	}
	.options:hover {
		text-decoration: underline;
	}
	.dashboard {
		outline: 1px solid black;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		text-align: center;
		width: 80%;
	}

</style>