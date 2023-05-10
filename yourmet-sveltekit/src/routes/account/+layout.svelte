<script lang="ts">
	import '../../global.css';
	import { user } from "$lib/stores"
	import MediaQuery from '$lib/MediaQuery.svelte';
	let collapsible:boolean = false;
</script>

<MediaQuery query="(min-width: 1200px)" let:matches>
	{#if $user != undefined}
		<div class="main">
			<!-- have add this silly Loader component to get $seen and $gallery to load; on:load={() => reload(1, $user.email)} doesn't work, nor #await -->
			{#if matches}
				<div class="menu">
					<a class="options" href="/account/">Account</a>
					<a class="options" href="/account/profile">Edit Profile Info</a>
					<a class="options" href="/account/coverphoto">Change Cover Photo</a>
					<!-- <div class="options">My reviews</div> -->
				</div>
			{:else}
				<div class="collapsible" on:click={() => collapsible = !collapsible}>Account Navigation{#if collapsible}<span class="chevron-up"></span>{:else}<span class="chevron-down"></span>{/if}</div>
				{#if collapsible}
					<div class="menu">
						<a class="options" href="/account/">Account</a>
						<a class="options" href="/account/profile">Edit Profile Info</a>
						<a class="options" href="/account/coverphoto">Change Cover Photo</a>
						<!-- <div class="options">My reviews</div> -->
					</div>
				{/if}
			{/if}
			<div class="dashboard">
				<slot></slot>
			</div>
		</div>

	{:else}
	Please login
{/if}
</MediaQuery>

<style>
	.chevron-down {
    box-sizing: border-box;
    position: absolute;
    display: block;
    transform: scale(var(--ggs,1));
    width: 22px;
    height: 22px;
    border: 2px solid transparent;
    border-radius: 100px;
		right: 5px;
	}
	.chevron-down::after {
			content: "";
			display: block;
			box-sizing: border-box;
			position: absolute;
			width: 10px;
			height: 10px;
			border-bottom: 2px solid;
			border-right: 2px solid;
			transform: rotate(45deg);
			top: 2px;
			right: 5px;

	}
	.chevron-up {
    box-sizing: border-box;
    position: absolute;
    display: block;
    transform: scale(var(--ggs,1));
    width: 22px;
    height: 22px;
    border: 2px solid transparent;
    border-radius: 100px;
		right: 5px;
	}
	.chevron-up::after {
			content: "";
			display: block;
			box-sizing: border-box;
			position: absolute;
			width: 10px;
			height: 10px;
			border-top: 2px solid;
			border-right: 2px solid;
			transform: rotate(-45deg);
			right: 5px;
			bottom: 2px;
	}
	.arrow-down {
		position: absolute;
		right: 10px;
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 15px solid blue;
	}
	.main {
		/* border-top: 1px solid gray; */
		margin: auto;
		margin-top: 30px;
		margin-bottom: 30px;
		display: flex;
		width: 60%;
		transform: translateX(-102px);
	}
	.collapsible{
		position: relative;
		border: 1px solid lightgray;
		font-family: 'DM Serif Display', serif;
		font-size:1.2rem;
		width: 76%;
		padding: 5px;
		display: flex;
		align-items: center;
		text-align: left;
		cursor: pointer;
	}

	.menu {
		outline: 1px solid lightgray;
		display: flex;
		flex-direction: column;
		padding: 2rem;
		margin-top: 3%;
		height: 100%;
		min-width: 140px;
  	width: auto;
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
			transform: translateX(0);
		}
		.menu {
			width: 76%;
			margin: 0;
			position: absolute;
			z-index: 1;
			top: 38px;
			background-color: white;
			height: auto;
			padding: 5px;
		}
		.options {
			font-size: 14px;
			margin: 2% 0 2% 0;
			padding: 10px;
		}
	}
	@media (min-width: 2100px) {
		.main{
			width: 40%;
			position:relative;
		}
	}

</style>