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
			.min(2)
			.max(24)
			.regex(/^[a-zA-Z-" "]+$/)
			.optional(),
		last_name: z
			.string()
			.min(2)
			.max(24)
			.regex(/^[a-zA-Z-" "]+$/)
			.optional(),
		username: z
			.string()
			.min(4)
			.max(16)
			.regex(/^[a-zA-Z0-9_-]+$/)
			.optional(),
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

<!-- <SuperDebug data={$form} /> -->
<title>Edit Profile Info - MyMet</title>
<div class="wrapper">
{#if editable != undefined}
	<div class="profile">
		<div class="accountHeader">Your public info.</div>
		<img class="profilePhoto" src={editable.picture || $user.picture} alt="user" />
	</div>
	<div class="edit">
		<div class="label guide">
			Your current information is in grey.
		</div>
		<form method="POST" use:enhance>
			<div class="inputWrapper">
				<div>
					<label class="label" for="first_name">First name</label>
				</div>
				<div>
					<input
						class="input"
						type="text"
						name="first_name"
						bind:value={$form.first_name}
						placeholder={$userInfo.first_name}
					/>
				</div>
				{#if $errors.first_name}
				<div class="error">
					<p>2 characters minimum. 16 characters maximum.</p>
					<p>Numbers and symbols are not allowed.</p>
					<p>Hyphens are okay.</p>
				</div>
				{/if}
			</div>
			<div class="inputWrapper">
				<div>
					<label class="label" for="username">Username (visible as public website link)*</label>
				</div>
				<input
					class="input"
					type="text"
					name="username"
					bind:value={$form.username}
					placeholder={$userInfo.username}
				/>
				{#if $errors.username}
				<div class="error">
					<p>4 characters minimum. 16 characters maximum.</p>
					<p>Symbols are not allowed.</p>
					<p>Numbers, hyphens, and underscores are okay.</p>
				</div>
				{/if}
			</div>
			<!-- <div>
				<div>
					<label for="favorite_artist">Favorite artist</label>
				</div>
				<input
					class="input"
					type="text"
					name="favorite_artist"
					bind:value={$form.favorite_artist}
					placeholder={$userInfo.favorite_artist}
				/>
				{#if $errors.favorite_artist}
					<p>Symbols are not allowed. Hyphens and underscores okay.</p>
				{/if}
			</div>
			<div>
				<div><label for="favorite_artwork">Favorite artwork</label></div>
				<input
					class="input"
					type="text"
					name="favorite_artwork"
					bind:value={$form.favorite_artwork}
					placeholder={$userInfo.favorite_artwork}
				/>
				{#if $errors.favorite_artwork}
					<p>Symbols are not allowed. Hyphens are okay.</p>
				{/if}
			</div>
			<div>
				<div>
					<label for="favorite_period">Favorite period</label>
				</div>
				<input
					class="input"
					type="text"
					name="favorite_period"
					bind:value={$form.favorite_period}
					placeholder={$userInfo.favorite_period}
				/>
				{#if $errors.favorite_period}
					<p>Symbols are not allowed. Hyphens are okay.</p>
				{/if}
			</div> -->

			<button class="submit" type="submit">Save changes</button>
		</form>
	</div>
{/if}
</div>

<style>
	p{
		font-size: 0.9rem;
		font-weight: 500;
	}
	.guide{
		font-size: .9rem;
		font-weight: 500;
	}
	.submit{
		margin-top: 2rem;
		height: 3rem;
		background-color: black;
		border: none;
		color: white;
		font-weight: 100;
		width: 30%;
		cursor: pointer;
	}
	.inputWrapper{
		margin-top: 2rem;
		text-align: start;
	}
	.label{
		display: flex;
		margin-bottom: 0.5rem;
	}
	.edit {
		/* display: flex; */
		/* text-align: start; */
		padding: 0 12% 0 12%;
	}
	.input {
		height: 3rem;
		min-width: 97%;
		border: 1px solid black;
		font-size: 20px;
		padding-left: 2%;
	}
	.profile {
		padding: 3% 12% 0 12%;
	}
	.accountHeader {
		text-align: start;
	}

	.profilePhoto {
		outline: 1px solid black;
		border-radius: 100%;
		width: 150px;
		height: 150px;
		margin-bottom: 5%;
	}

</style>
