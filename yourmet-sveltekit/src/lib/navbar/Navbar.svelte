<script lang="ts">
	import metLogo from './metlogo.png';
  import Art from './dropdowns/Art.svelte';
  import Exhibitions from './dropdowns/Exhibitions.svelte';
  import Learn from './dropdowns/Learn.svelte';
  import Research from './dropdowns/Research.svelte';
  import Visit from './dropdowns/Visit.svelte';
  import YourMet from './dropdowns/YourMet.svelte';
  import { scale } from "svelte/transition";
  import { cubicInOut } from 'svelte/easing';
  export let openCanvas:any;
  let logoState = false;
  let shopState = false;
</script>

<div class="wrapper">
  <div class="logoWrapper">
    <a class="metLogo" href="https://www.metmuseum.org/" target="_blank" rel="noreferrer">
      {#if logoState}
      <div class="backdrop"
        transition:scale={{duration: 200, easing: cubicInOut}}
        on:mouseenter={()=>logoState = !logoState}
        on:mouseleave={()=>logoState = !logoState}>
      </div>
      {/if}
      <img src={metLogo} alt="metlogo" class="metLogo" on:mouseenter={()=>logoState = !logoState} on:mouseleave={()=>logoState = !logoState} />
    </a>
  </div>
  <div class="navbar">
    <div class="topbar">
      <div class="topbarWrapper">
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
          <a href="https://engage.metmuseum.org/donate?promocode=49278" target="_blank" rel="noreferrer" class="donationText">
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
      <YourMet />
      <div class="bottombarLinks" >
        <a href="https://www.metmuseum.org/shop" target="_blank" rel="noreferrer" on:mouseenter={()=> shopState = true} on:mouseleave={()=> shopState = false}>
          Shop
        </a>
        {#if shopState}
        <span class="arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 12 11">
            <path fill="currentColor" id="ShopArrow.svg" class="cls-1" d="M945.991,310L946,316h-2v-4.483L935.5,320l-1.5-1.5,8.52-8.5H938v-2l6,0.009V308l0.677,0.01,1.318,0,0,1.507h0V310h-0.009Z" transform="translate(-934 -308)"></path>
          </svg>
        </span>
        {/if}
      </div>
      <div class="listView">
        <a class="bottombarText" href="#" rel="noreferrer" on:click={openCanvas}>
          Gallery List View
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  .listView:hover .bottombarText{
    border-bottom: 2px solid black;
  }

  .arrow {
    margin-left: 1px;
  }

  .wrapper {
    display: flex;
    margin: auto;
    width: 85vw;
    align-items: center;
    justify-content: center;
  }

  .logoWrapper{
    width: 40px;
    display: flex;
    align-items: center;
  }

  .listView {
  margin-left: auto;
  font-size: 16px;
  transform: scale(1, 0.95);
  padding: 7px 0px 10px 10px;
  white-space: pre;
  }

  .metLogo {
    width: 40px;
    height: 40px;
    z-index: 3;
    position: absolute;
  }

  .backdrop{
    margin-top: -10px;
    margin-left: -10px;
    width: 60px;
    height: 60px;
    position: absolute;
    background-color: rgb(170, 168, 168);
  }

  /* this one only applies to the Shop div */
  .bottombarLinks {
    min-width: 53px;

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


</style>