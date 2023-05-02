<script lang="ts">
	import '../../global.css';
	import { user } from "$lib/stores"
</script>

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

<style>
	.main {
		/* border-top: 1px solid gray; */
		margin: auto;
		margin-top: 30px;
		margin-bottom: 30px;
		display: flex;
		width: 80%;
	}

	.menu {
		outline: 1px solid black;
		width: 10%;
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