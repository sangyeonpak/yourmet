<script lang="ts">
	import MediaQuery from '$lib/MediaQuery.svelte';
  import { art, exhibition, learn, research, visit, yourMet } from '$lib/stores';
  let classState:any;
  let linkState:any;
  function toggle() {
    art.set(false);
    exhibition.set(false);
    learn.set(false);
    research.set(!$research);
    visit.set(false);
    yourMet.set(false);
  }
  $: $research ? classState = "plus-active" : classState = "plus";
  $: $research ? linkState = "mobileLink-active" : linkState = "mobileLink";
</script>

<div class="mobileDropdown">
  <div class={linkState} on:click={toggle}>
    <div class="mobileInnerWrapper">
      <div class="mobileLinkText">Research</div>
      <div class="mobileLinkButton"><div class={classState}></div></div>
    </div>
  </div>
  {#if $research}
  <div class="mobileSubWrapper">
    <a class="mobileSublink" href="https://www.metmuseum.org/art/libraries-and-research-centers" target="_blank" rel="noreferrer"><div class="mobileSublinkText">Libraries and Research Centers</div></a>
  </div>
  {/if}
</div>
