<script lang="ts">
	import metLogo from './metlogo.png';
	import Art from './dropdowns/Art.svelte';
	import Exhibitions from './dropdowns/Exhibitions.svelte';
	import Learn from './dropdowns/Learn.svelte';
	import Research from './dropdowns/Research.svelte';
	import Visit from './dropdowns/Visit.svelte';
	import Shop from './dropdowns/Shop.svelte';
	import { scale } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { page } from '$app/stores';
	import { reload } from '$lib/functions';
	let logoState = false;
	let mouseState = false;

	// auth0
	import { onMount } from 'svelte';
	import auth from '$lib/authService';
	import { isAuthenticated, user, userInfo } from '$lib/stores';
	let auth0Client: any;
	onMount(async () => {
		auth0Client = await auth.createClient();
		isAuthenticated.set(await auth0Client.isAuthenticated());
		user.set(await auth0Client.getUser());
	});

	function login() {
		auth.loginWithPopup(auth0Client, undefined);
	}

	function logout() {
		auth.logout(auth0Client);
	}
	$: if ($user) {
		fetch(`/api/users/${$user.email}`, { method: 'GET' })
			.then((data) => data.json())
			.then((checked) => {
				console.log($user);
				console.log(checked[0]);
				userInfo.set(checked[0]);
				reload(1, checked[0].username);
			});
	}
</script>

<div class="outerWrapper">
	<div class="wrapper">
		<div class="logoWrapper">
			<a class="metLogo" href="https://www.metmuseum.org/" target="_blank" rel="noreferrer">
				{#if logoState}
					<div
						class="backdrop"
						transition:scale={{ duration: 200, easing: cubicInOut }}
						on:mouseenter={() => (logoState = !logoState)}
						on:mouseleave={() => (logoState = !logoState)}
					/>
				{/if}
				<img
					src={metLogo}
					alt="metlogo"
					class="metLogo"
					on:mouseenter={() => (logoState = !logoState)}
					on:mouseleave={() => (logoState = !logoState)}
				/>
			</a>
		</div>
		<div class="navbar">
			<div class="topbar">
				<div class="topbarWrapper">
					<div class="topbarLinks tickets">
						<a
							class="topbarText"
							href="https://engage.metmuseum.org/admission/?promocode=48946"
							target="_blank"
							rel="noreferrer"
						>
							Buy tickets
						</a>
					</div>
					<div class="topbarLinks member">
						<a
							class="topbarText"
							href="https://engage.metmuseum.org/members/members-count/?promocode=49261"
							target="_blank"
							rel="noreferrer"
						>
							Become a Member
						</a>
					</div>
					<div class="topbarLinks donation">
						|
						<a
							href="https://engage.metmuseum.org/donate?promocode=49278"
							target="_blank"
							rel="noreferrer"
							class="donationText"
						>
							Make a donation
						</a>
					</div>
				</div>
			</div>
			<div class="bottombar">
				<Visit />
				<Exhibitions />
				<Art />
				<Learn />
				<Research />
				<div
					class="bottombarLinks"
					on:mouseenter={() => (mouseState = true)}
					on:mouseleave={() => (mouseState = false)}
				>
					<span class="yourMetUnderline">YourMet</span>
					{#if mouseState}
						<div class="dropdownMenu">
							{#if $isAuthenticated}
								{#if $page.route.id === '/gallery/curate'}
									<a href="/account" rel="noreferrer">
										<div class="dropdownLinks" on:click={() => (mouseState = false)}>Account</div>
									</a>
									<a href="/account/profile" rel="noreferrer">
										<div class="dropdownLinks" on:click={() => (mouseState = false)}>
											Edit Profile Info
										</div>
									</a>
									<a href="/account/coverphoto" rel="noreferrer">
										<div class="dropdownLinks" on:click={() => (mouseState = false)}>
											Change Cover Photo
										</div>
									</a>
								{:else}
									<a href="/gallery/curate" rel="noreferrer">
										<div class="dropdownLinks" on:click={() => (mouseState = false)}>
											Back to Gallery
										</div>
									</a>
								{/if}
								<div class="dropdownLinks bottomDropdownLinks" on:click={logout}>Logout</div>
							{:else}
								<div class="dropdownLinks bottomDropdownLinks" on:click={login}>Login</div>
							{/if}
						</div>
					{/if}
				</div>
				<Shop />

			</div>
		</div>
	</div>
</div>

<style>
	.bottombarLinks {
		cursor: pointer;
	}
	.wrapper {
		display: flex;
		margin: auto;
		width: 85vw;
		align-items: center;
		justify-content: center;
	}
	.outerWrapper {
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
		z-index: 10;
		position:relative;
	}

	.logoWrapper {
		width: 40px;
		display: flex;
		align-items: center;
	}

	.metLogo {
		width: 40px;
		height: 40px;
		position: absolute;
	}

	.backdrop {
		margin-top: -10px;
		margin-left: -10px;
		width: 60px;
		height: 60px;
		position: absolute;
		background-color: rgb(170, 168, 168);
	}

	.navbar {
		width: 100%;
		margin: auto;
	}

	.topbar {
		height: 35px;
		display: flex;
		justify-content: flex-end;
	}

	.topbarWrapper {
		display: flex;
		height: 31px;
	}

	.donationText,
	.topbarLinks {
		padding: 8px 10px;
		font-size: 13px;
		transform: scale(0.96, 1);
		font-weight: 600;
		font-family: 'Roboto', sans-serif;
	}
	.topbarText {
		font-family: 'Roboto', sans-serif;
		font-weight: 600;

	}

	.donationText:hover,
	.member:hover {
		text-decoration: underline;
	}

	.member,
	.donation {
		padding-right: 0;
	}

	.bottombar {
		display: flex;
		align-items: flex-start;
		height: 45px;
	}

	.yourMetUnderline {
		border-bottom: 2px solid black;
		padding-bottom: 8px;
		font-family: 'Roboto', sans-serif;
		font-weight: 600;

	}

	.tickets {
		cursor: pointer;
		background-color: rgb(214, 212, 212);
		transition: 0.15s;
	}
	.tickets:hover{
		background-color: rgb(170, 168, 168);
	}


</style>
