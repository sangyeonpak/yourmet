<script lang="ts">
	import '../../global.css';
	import { user } from "$lib/stores"
	import MediaQuery from '$lib/MediaQuery.svelte';

</script>

<MediaQuery query="(min-width: 600px)" let:matches>
	{#if $user != undefined}
		<div class="main">
			<!-- have add this silly Loader component to get $seen and $gallery to load; on:load={() => reload(1, $user.email)} doesn't work, nor #await -->
				<div class="menu">
					<div class="options"><a href="/account/">Account</a></div>
					<div class="options"><a href="/account/profile">Edit Profile Info</a></div>
					<div class="options"><a href="/account/coverphoto">Change Cover Photo</a></div>
					<!-- <div class="options">My reviews</div> -->
				</div>
			<div class="dashboard">
				<slot></slot>
			</div>
		</div>

	{:else}
	Please login
{/if}
</MediaQuery>

<style>
	.main {
			/* border-top: 1px solid gray; */
			margin: auto;
			margin-top: 30px;
			margin-bottom: 30px;
			display: flex;
			width: 60%;
		}

	.menu {
		outline: 1px solid lightgray;
		display: flex;
		flex-direction: column;
		padding: 2rem;
		margin-top: 3%;
		height: 100%;
	}
	.options {
		font-size: 14px;
		margin: 15% 0 15% 0;
	}
	.options:hover {
		text-decoration: underline;
	}
	.dashboard {
		/* outline: 1px solid black; */
		display: flex;
		flex-direction: column;
		text-align: center;
		width: 100%;
	}
	@media (max-width: 1200px) {
		.dashboard {
			width: 100%;
		}
		.main {
			flex-direction: column;
			position:relative;
			justify-content: center;
			align-items: center;
			width: 100%;
		}
		.menu {
			width: 75%;
			padding: 0;
		}
		.options {
			font-size: 14px;
			margin: 0;
		}
	}
	@media (min-width: 2100px) {
		.main{
			width: 40%
		}
	}

</style>