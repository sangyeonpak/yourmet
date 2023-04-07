<script>
	import metLogo from './metlogo.png';
  import Art from './dropdowns/Art.svelte';
  import Exhibitions from './dropdowns/Exhibitions.svelte';
  import Learn from './dropdowns/Learn.svelte';
  import Research from './dropdowns/Research.svelte';
  import Visit from './dropdowns/Visit.svelte';
  import YourMet from './dropdowns/YourMet.svelte';
  import { fade, scale } from "svelte/transition";
  import { cubicInOut } from 'svelte/easing';

  let mouseState = false;
  let logoState = false;
  let shopState = false;
</script>

<div class="wrapper">
	<a href="https://www.metmuseum.org/" target="_blank" rel="noreferrer">
    {#if logoState}
    <div class="logoBackdrop" transition:scale={{
      duration: 200,
      easing: cubicInOut
    }}></div>
    {/if}
		<img src={metLogo} alt="metlogo" class="metLogo" on:mouseenter={()=>logoState = !logoState} on:mouseleave={()=>logoState = !logoState} />
	</a>
  <div class="navbar">
    <div class="topbar">
      <div class="topbarLinks tickets">
        <a href="https://engage.metmuseum.org/admission/?promocode=48946" target="_blank" rel="noreferrer">
          Buy tickets
        </a>
      </div>
      <div class="topbarLinks member">
        <a href="https://engage.metmuseum.org/members/members-count/?promocode=49261" target="_blank" rel="noreferrer">
          Become a Member
        </a>
      </div>
      <div class="topbarLinks donation">
        |
        <a href="https://engage.metmuseum.org/donate?promocode=49278" target="_blank" rel="noreferrer" class="topbarLinks donation">
          Make a donation
        </a>
      </div>
    </div>
    <div class="bottombar">
      <Visit />
      <Exhibitions />
      <Art />
      <Learn />
      <Research />
      <YourMet />
      <div class="bottombarLinks" on:mouseenter={()=> shopState = true} on:mouseleave={()=> shopState = false}>
        <a href="https://www.metmuseum.org/shop" target="_blank" rel="noreferrer">
          Shop
        </a>
        {#if shopState}
        <span class="nav-main__external-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 12 11">
            <path fill="currentColor" id="ShopArrow.svg" class="cls-1" d="M945.991,310L946,316h-2v-4.483L935.5,320l-1.5-1.5,8.52-8.5H938v-2l6,0.009V308l0.677,0.01,1.318,0,0,1.507h0V310h-0.009Z" transform="translate(-934 -308)"></path>
          </svg>
        </span>
        {/if}
      </div>
        <div class="listView">
          <a href="#" rel="noreferrer" on:mouseenter={()=> mouseState = true} on:mouseleave={()=> mouseState = false}>
            Gallery List View
          </a>
          {#if mouseState}
          <hr transition:fade={{duration: 100}} class="linkUnderline">
          {/if}
        </div>
    </div>
  </div>
</div>

<style>
  .listView {
  margin-left: auto;
  font-size: 16px;
  transform: scale(1, 0.95);
  padding: 7px 0px 10px 10px;
  white-space: pre;
  }

  .metLogo {
  width: 40px;
  max-width: 40px;
  height: 40px;
  max-height: 40px;
  position: absolute;
  padding: 10px;
  z-index: 3;
  left: 6%;
  top:10px;
  align-self: center;
  }

  .logoBackdrop{
    width: 40px;
    max-width: 40px;
    height: 40px;
    max-height: 40px;
    position: absolute;
    padding: 10px;
    z-index: 1;
    left: 6%;
    top:10px;
    align-self: center;
    background-color: rgb(170, 168, 168);

  }

  /* this one only applies to the Shop div */
  .bottombarLinks {
    min-width: 53px;
  }

  .navbar {
    margin: 0 auto;
    max-width: 85vw;
  }

  .topbar {
    height: 35px;
    display: flex;
    justify-content: flex-end;
  }

  .topbarLinks {
    padding: 9px 10px;
    font-size: 13px;
    transform: scale(0.96, 1);
  }

  .member,
  .donation {
    padding-right: 0;
  }

  .bottombar {
    display: flex;
    align-items: flex-start;
    height: 45px;
    margin-left: 40px;
  }


</style>