<script>
  import { fade } from "svelte/transition";
  let mouseState = false;
</script>

<div class="bottombarLinks" on:mouseenter={()=> mouseState = true}  on:mouseleave={()=> mouseState = false}>
  <a href="#" rel="noreferrer" >YourMet</a>
  {#if mouseState}
  <hr transition:fade={{duration: 100}} class="linkUnderline">
  {/if}
  {#if mouseState}
  <div class="dropdownMenu">
    <a href="/login" target="_blank" rel="noreferrer">
      <div class="dropdownLinks">Your Account</div>
    </a>
  </div>
  {/if}
</div>

<style>
  .bottombarLinks {
    min-width: 70px;
  }
</style>