<script lang="ts">
  export let openCanvas:any;
  let mouseState = false;
</script>

<div class="bottombarLinks" on:mouseenter={()=> mouseState = true}  on:mouseleave={()=> mouseState = false}>
  <a class="yourMetUnderline" href="#" rel="noreferrer" >YourMet</a>
  {#if mouseState}
  <div class="dropdownMenu">
    <a href="/account" rel="noreferrer">
      <div class="dropdownLinks">Your Account</div>
    </a>
  </div>
  {/if}
</div>

<style>
  .bottombarLinks {
    min-width: 70px;
    transition: .15s;
  }
  .yourMetUnderline{
    border-bottom: 2px solid black;
    padding-bottom:8px;
  }
</style>