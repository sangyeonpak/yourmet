<script lang="ts">
	import '../../../global.css';
	import { user, userInfo } from '$lib/stores';
	import Edit from '$lib/account/Edit.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	// import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { z } from 'zod';
	import { checkUser } from '$lib/functions';

	let editable: any;
	export let data: any;
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
			.optional(),
		email: z.string().optional()
	});
	let usernameTaken = 'none';
	let successful: boolean = false;
	const { form, errors, enhance } = superForm(data.form, {
		validators: editProfileSchema,
		onUpdated({ form }) {
			if (form.valid) {
				successful = true;
			} else {
				usernameTaken = 'block';
			}
		}
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
			<div class="label guide">Your current information is in grey.</div>
			<div class="label guide">* Must be unique.</div>
			{#if successful}
				<div class="successful">
					<div class="successfulText">
						<span class="check"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="rgb(4, 88, 4)"
								class="bi bi-check-circle-fill"
								viewBox="0 0 16 16"
							>
								<path
									d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
								/>
							</svg></span
						>Your changes were saved!
					</div>
				</div>
			{/if}
			<form
				method="POST"
				use:enhance
				on:submit={() => {
					checkUser($user.email);
					setTimeout(() => checkUser($user.email), 250);
					$userInfo = $userInfo;
				}}
			>
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
							<p
								class="usernameTaken"
								style="display:{usernameTaken}; color: red; font-weight: 600;"
							>
								Username already exists.
							</p>
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
				{#if $user.email}
					<!-- mega janky fix lmfao-->
					<div style="display:none">
						{($form.email = $user.email)}
						<input class="input" type="text" name="email" bind:value={$form.email} />
					</div>
				{/if}
				<button class="submit" type="submit">Save changes</button>
			</form>
		</div>
	{/if}
</div>

<style>
	.check {
		margin-right: 10px;
	}
	.successful {
		background-color: rgb(248, 242, 242);
		padding: 0.5rem;
		margin-top: 2rem;
	}
	.successfulText {
		color: rgb(4, 88, 4);
		font-size: 0.9rem;
		font-weight: 600;
		display: flex;
		justify-content: start;
		align-items: center;
	}
	p {
		font-size: 0.9rem;
	}
	.guide {
		font-size: 0.9rem;
	}
	.submit {
		margin-top: 2rem;
		height: 3rem;
		background-color: black;
		border: none;
		color: white;
		width: 30%;
		cursor: pointer;
	}
	.inputWrapper {
		margin-top: 2rem;
		text-align: start;
	}
	.label {
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
