<script lang="ts">
	import '../../../global.css';
	import { user, userInfo } from '$lib/stores';
	import Edit from '$lib/account/Edit.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { PageData } from './$types';
	let editable: any;
	export let data: PageData;
	const { form, errors, enhance } = superForm(data.form);
	console.log($errors)
	$: if ($userInfo) {
		editable = $userInfo;
	}
</script>

<SuperDebug data={$form} />
<title>Edit Profile Info - MyMet</title>
{#if editable != undefined}
	<div class="profile">
		<div class="header">Your public info.</div>
		<img class="profilePhoto" src={editable.picture || $user.picture} alt="user" />
		<!-- <div class="profileInfo">First and last name:</div> -->
		<form method="POST" use:enhance>
			<div>
				<label for="first_name">First name</label>
				<input type="text" name="first_name" bind:value={$form.first_name} />
				{#if $errors.first_name}
					<p>{$errors.first_name}</p>
				{/if}
			</div>
			<div>
				<label for="last_name">Last name</label>
				<input type="text" name="last_name" bind:value={$form.last_name} />
				{#if $errors.last_name}
					<p>{$errors.last_name}</p>
				{/if}
			</div>
			<div>
				<label for="username">Username</label>
				<input type="text" name="username" bind:value={$form.username} />
				{#if $errors.username}
					<p>{$errors.username}</p>
				{/if}
			</div>
			<div>
				<label for="favorite_artist">Favorite artist</label>
				<input type="text" name="favorite_artist" bind:value={$form.favorite_artist} />
				{#if $errors.favorite_artist}
					<p>{$errors.favorite_artist}</p>
				{/if}
			</div>
			<div>
				<label for="favorite_artwork">Favorite artwork</label>
				<input type="text" name="favorite_artwork" bind:value={$form.favorite_artwork} />
				{#if $errors.favorite_artwork}
					<p>{$errors.favorite_artwork}</p>
				{/if}
			</div>
			<div>
				<label for="favorite_period">Favorite period</label>
				<input type="text" name="favorite_period" bind:value={$form.favorite_period} />
				{#if $errors.favorite_period}
					<p>{$errors.favorite_period}</p>
				{/if}
			</div>

			<button type="submit" on:submit>Submit</button>
		</form>

		<!-- <input type="text" bind:value={editable.first_name} on:input={() => nameValidation(editable.first_name)}/>
		<input type="text" bind:value={editable.last_name} on:input={() => nameValidation(editable.last_name)}/>
		<div class="profileInfo">Username (this is how people will find your gallery):</div>
		<input type="text" bind:value={editable.username} />
		<div class="profileInfo">Favorite Artist:</div>
		<input type="text" bind:value={editable.favorite_artist} />
		<div class="profileInfo">Favorite Artwork:</div>
		<input type="text" bind:value={editable.favorite_artwork} />
		<div class="profileInfo">Favorite Period:</div>
		<input type="text" bind:value={editable.favorite_period} /> -->
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
