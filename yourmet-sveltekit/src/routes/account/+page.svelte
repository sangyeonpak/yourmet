<script lang="ts">
	import '../../global.css';
	import { user, seen, gallery } from "$lib/stores"
	console.log($seen);
	console.log($gallery);
</script>

<div class="main">
	<div class="options">
		<img class="profile" src={$user.picture} alt="user"/>
		<div>{$user.given_name} {$user.family_name}</div>
	</div>
	<div class="dashboard">

	</div>
</div>

<style>
	.main {
		border-top: 1px solid gray;
		margin: auto;
		display: flex;
	}
	.options {
		outline: 1px solid black;
		width: 30%;
	}
	.profile {
		outline: 1px solid black;
		border-radius: 100%;
		width: 150px;
		height: 150px;
	}
</style>