<script>
  let shopState = false;
</script>

<div class="bottombarLinks" >
  <a class="shopText" href="https://www.metmuseum.org/shop" target="_blank" rel="noreferrer" on:mouseenter={()=> shopState = true} on:mouseleave={()=> shopState = false}>
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

<style>
  .bottombarLinks {
    min-width: 55px;
    transition: .15s;
  }
  .arrow {
    margin-left: 1px;
  }
  .shopText{
  font-family: "Roboto", sans-serif;

  }
</style>
