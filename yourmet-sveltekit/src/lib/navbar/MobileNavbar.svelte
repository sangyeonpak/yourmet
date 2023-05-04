<script lang="ts">
	import metLogo from './metlogo.png';
	import Art from './mobile-dropdowns/Art.svelte';
	import Exhibitions from './mobile-dropdowns/Exhibitions.svelte';
	import Learn from './mobile-dropdowns/Learn.svelte';
	import Research from './mobile-dropdowns/Research.svelte';
	import Visit from './mobile-dropdowns/Visit.svelte';
	import Shop from './mobile-dropdowns/Shop.svelte';
	import MediaQuery from '$lib/MediaQuery.svelte';
	import { scale } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import Hamburger from './Hamburger.svelte';
	import { page } from '$app/stores';
	import { reload } from '$lib/functions';
	let logoState = false;
	let showOuterMenu = true;

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
				userInfo.set(checked[0]);
				reload(1, checked[0].username);
			});
	}
</script>

<div class="outerWrapper">
	<div class="wrapper">
		<div class="widthConstraint">
			<div class="mobileLogo">
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
			<div class="mobileNavbar">
				<a
					href="https://engage.metmuseum.org/admission/?promocode=48946"
					target="_blank"
					rel="noreferrer">Tickets</a
				>
				<a
					href="https://engage.metmuseum.org/members/members-count/?promocode=49261"
					target="_blank"
					rel="noreferrer">Membership</a
				>
        <span on:click={() => showOuterMenu = true}><Hamburger/></span>
			</div>
		</div>
	</div>
  <div class="outerMenu">
    <Visit/>
    <Exhibitions/>
    <Art/>
    <Learn />
    <Research/>
    <Shop/>
  </div>

</div>

<style>
	.outerWrapper {
		position: relative;
		display: flex;
		justify-content: center;
		height: 60px;

	}
	.wrapper {
    position:fixed;
		width: 100%;
		height: 60px;
    display:flex;
    justify-content: center;
    background-color:white;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    z-index: 10;

	}
  .widthConstraint{
    display: flex;
    align-items: center;
    width: 88%;

  }
	.mobileLogo {
		width: 40px;
		height: 40px;
	}
	.mobileNavbar {
    position: absolute;
    display:flex;
    align-items: center;
    right: 6%;
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
  .outerMenu {
    position: fixed;
    top: 60px;
    right: 0;
  }
</style>
