<script lang="ts">
	import metLogo from './metlogo.png';
	import Art from './mobile-dropdowns/Art.svelte';
	import Exhibitions from './mobile-dropdowns/Exhibitions.svelte';
	import Learn from './mobile-dropdowns/Learn.svelte';
	import Research from './mobile-dropdowns/Research.svelte';
	import Visit from './mobile-dropdowns/Visit.svelte';
	import Shop from './mobile-dropdowns/Shop.svelte';
	import { scale } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import Hamburger from './Hamburger.svelte';
	let logoState = false;
	let showOuterMenu = false;

	// auth0
	import { onMount } from 'svelte';
	import { reload, clickOutside } from '$lib/functions';
	import auth from '$lib/authService';
	import { page } from '$app/stores';
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
	import MediaQuery from '$lib/MediaQuery.svelte';
  import { art, exhibition, learn, research, visit, yourMet, isAuthenticated, user, userInfo } from '$lib/stores';
  let classState:any;
  let linkState:any;
  function toggle() {
    art.set(false);
    exhibition.set(false);
    learn.set(false);
    research.set(false);
    visit.set(false);
    yourMet.set(!$yourMet);
  }
  $: $yourMet ? classState = "plus-active" : classState = "plus";
  $: $yourMet ? linkState = "mobileLink-active" : linkState = "mobileLink";

</script>

<MediaQuery query="(min-width: 500px)" let:matches>
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
				{#if matches}
				<a
					class="tickets"
					href="https://engage.metmuseum.org/admission/?promocode=48946"
					target="_blank"
					rel="noreferrer">Tickets</a
				>
				<a
					class="membership"
					href="https://engage.metmuseum.org/members/members-count/?promocode=49261"
					target="_blank"
					rel="noreferrer">Membership</a
				>
				{:else}
				<a
					class="tickets"
					href="https://engage.metmuseum.org/admission/?promocode=48946"
					target="_blank"
					rel="noreferrer">Buy tickets</a
				>
				{/if}
				{#if !showOuterMenu}
        <span class="x" on:click={() => showOuterMenu = !showOuterMenu}><Hamburger/></span>
				{:else}
        <span class="x"><div class="close" on:click={() => showOuterMenu = !showOuterMenu}></div></span>
				{/if}
			</div>
		</div>
	</div>
	{#if showOuterMenu}
  <div class="outerMenu">
    <Visit />
    <Exhibitions />
    <Art />
    <Learn />
    <Research />
			<div class="mobileDropdown">
				<div class={linkState} on:click={toggle}>
					<div class="mobileInnerWrapper">
						<div class="mobileLinkText">YourMet</div>
						<div class="mobileLinkButton"><div class={classState}></div></div>
					</div>
				</div>
				{#if $yourMet}
				<div class="mobileSubWrapper">
					{#if $isAuthenticated}
						{#if $page.route.id === '/gallery/curate'}
							<a class="mobileSublink" href="/account" on:click={() => showOuterMenu = false}>
								<div class="mobileSublinkText">Account</div>
							</a>
							<a class="mobileSublink" href="/account/profile" on:click={() => showOuterMenu = false}>
								<div class="mobileSublinkText">Edit Profile Info</div>
							</a>
							<a class="mobileSublink" href="/account/coverphoto" on:click={() => showOuterMenu = false}>
								<div class="mobileSublinkText">Change Cover Photo</div>
							</a>
						{:else}
							<a class="mobileSublink" href="/gallery/curate" on:click={() => showOuterMenu = false}>
								<div class="mobileSublinkText">Back to Gallery</div>
							</a>
						{/if}
						<div class="mobileSublink" on:click={logout} on:click={() => showOuterMenu = false}>
							<div class="mobileSublinkText">Logout</div>
						</div>
					{:else}
						<div class="mobileSublink" on:click={login} on:click={() => showOuterMenu = false}>
							<div class="mobileSublinkText">Login</div>
						</div>
					{/if}
				</div>
				{/if}
			</div>

    <Shop />
  </div>
	{/if}
</div>
</MediaQuery>

<style>
	.tickets,
	.membership{
		margin: 0 1rem 0 1rem;
		font-size: 13px;
		transform: scale(1, 0.95);
	}
	.x{
		height: 32px;
		width: 32px;
		display:flex;
		justify-content:center;
		align-items:center;
		cursor: pointer;
	}
	.close{
		position: relative;
		width: 24px;
		height: 24px;
		transition: .5s;
	}

	.close::before,
	.close::after {
		content: '';
		position: absolute;
		background-color: black;
	}

	.close::before{
		top: 50%;
		left: 0;
		width: 100%;
		height: 2px;
		transform: translateY(-50%) rotate(45deg);
	}

	.close::after {
		transition: .5s;
		top: 0;
		left: 50%;
		width: 2px;
		height: 100%;
		transform: translateX(-50%) rotate(45deg);
	}

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
		z-index: 10;
  }
</style>
