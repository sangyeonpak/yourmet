<script lang="ts">
	import '../../../global.css';
	import { user, userInfo } from '$lib/stores';
	import Edit from '$lib/account/Edit.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { PageData } from './$types';
	import { z } from 'zod';

	let editable: any;
	export let data: PageData;
	const editProfileSchema = z.object({
		first_name: z
			.string()
			.max(24)
			.regex(/^[a-zA-Z-" "]+$/)
			.optional(),
		last_name: z
			.string()
			.max(24)
			.regex(/^[a-zA-Z-" "]+$/)
			.optional(),
		username: z
			.string()
			.min(4)
			.max(16)
			.regex(/^[a-zA-Z0-9_-]+$/),
		favorite_artist: z
			.string()
			.max(48)
			.regex(/^[a-zA-Z0-9" "_-]+$/)
			.optional(),
		favorite_artwork: z
			.string()
			.max(48)
			.regex(/^[a-zA-Z0-9" "-]+$/)
			.optional(),
		favorite_period: z
			.string()
			.max(48)
			.regex(/^[a-zA-Z-" "]+$/)
			.optional()
	});
	const { form, errors, enhance, constraints } = superForm(data.form, {
		validators: editProfileSchema
	});
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
	</div>
	<div class="edit">
		<form method="POST" use:enhance>
			<div>
				<div>
					<label for="first_name">First name</label>
				</div>
				<div>
					<input type="text" name="first_name" bind:value={$form.first_name} />
				</div>
				{#if $errors.first_name}
					<p>Numbers are not allowed.</p>
					<p>Symbols are not allowed. Hyphens are okay.</p>
				{/if}
			</div>
			<div>
				<label for="last_name">Last name</label>
				<input
					type="text"
					name="last_name"
					bind:value={$form.last_name}
					{...$constraints.last_name}
				/>
				{#if $errors.last_name}
					<p>Numbers are not allowed.</p>
					<p>Symbols are not allowed. Hyphens are okay.</p>
				{/if}
			</div>
			<div>
				<label for="username">Username*</label>
				<input type="text" name="username" bind:value={$form.username} {...$constraints.username} />
				{#if $errors.username}
					<p>Required field.</p>
					<p>4 characters minimum. 16 characters maximum.</p>
					<p>Symbols are not allowed. Hyphens and underscores okay.</p>
				{/if}
			</div>
			<div>
				<label for="favorite_artist">Favorite artist</label>
				<input
					type="text"
					name="favorite_artist"
					bind:value={$form.favorite_artist}
					{...$constraints.favorite_artist}
				/>
				{#if $errors.favorite_artist}
					<p>Symbols are not allowed. Hyphens and underscores okay.</p>
				{/if}
			</div>
			<div>
				<label for="favorite_artwork">Favorite artwork</label>
				<input
					type="text"
					name="favorite_artwork"
					bind:value={$form.favorite_artwork}
					{...$constraints.favorite_artwork}
				/>
				{#if $errors.favorite_artwork}
					<p>Symbols are not allowed. Hyphens are okay.</p>
				{/if}
			</div>
			<div>
				<label for="favorite_period">Favorite period</label>
				<input
					type="text"
					name="favorite_period"
					bind:value={$form.favorite_period}
					{...$constraints.favorite_period}
				/>
				{#if $errors.favorite_period}
					<p>Symbols are not allowed. Hyphens are okay.</p>
				{/if}
			</div>

			<button type="submit">Submit</button>
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
