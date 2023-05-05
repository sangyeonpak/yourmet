<script lang="ts">
  import { art, exhibition, learn, research, visit, yourMet } from '$lib/stores';
  let classState:any;
  let linkState:any;
  function toggle() {
    art.set(!$art);
    exhibition.set(false);
    learn.set(false);
    research.set(false);
    visit.set(false);
    yourMet.set(false);

  }
  $: $art ? classState = "plus-active" : classState = "plus";
  $: $art ? linkState = "mobileLink-active" : linkState = "mobileLink";
</script>

<div class="mobileDropdown">
  <div class={linkState} on:click={toggle}>
    <div class="mobileInnerWrapper">
      <div class="mobileLinkText">Art</div>
      <div class="mobileLinkButton"><div class={classState}></div></div>
    </div>
  </div>
  {#if $art}
  <div class="mobileSubWrapper">
    <a class="mobileSublink" href="https://www.metmuseum.org/art/the-collection" target="_blank" rel="noreferrer"><div>The Met Collection</div></a>
    <a class="mobileSublink" href="https://www.metmuseum.org/about-the-met/collection-areas" target="_blank" rel="noreferrer"><div>Curatorial Areas</div></a>
    <a class="mobileSublink" href="https://www.metmuseum.org/about-the-met/conservation-and-scientific-research" target="_blank" rel="noreferrer"><div>Convservation and Scientific Research</div></a>
  </div>
  {/if}
</div>
