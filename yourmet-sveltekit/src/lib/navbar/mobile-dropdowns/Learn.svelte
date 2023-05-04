<script lang="ts">
	import MediaQuery from '$lib/MediaQuery.svelte';
  import { art, exhibition, learn, research, visit, yourMet } from '$lib/stores';
  let classState:any;
  let linkState:any;
  function toggle() {
    art.set(false);
    exhibition.set(false);
    learn.set(!$learn);
    research.set(false);
    visit.set(false);
    yourMet.set(false);
  }
  $: $learn ? classState = "plus-active" : classState = "plus";
  $: $learn ? linkState = "mobileLink-active" : linkState = "mobileLink";
</script>

<MediaQuery query="(min-width: 500px)" let:matches>
<div class="mobileDropdown">
  <a class={linkState} on:click={toggle}>
    <div class="mobileInnerWrapper">
      <div class="mobileLinkText">Learn With Us</div>
      <div class="mobileLinkButton"><div class={classState}></div></div>
    </div>
  </a>
  {#if $learn}
  <div class="mobileSubWrapper">
    <a class="mobileSublink" href="https://www.metmuseum.org/learn/learning-resources" target="_blank" rel="noreferrer"><div>Learning Resources</div></a>
    <a class="mobileSublink" href="https://www.metmuseum.org/art/metpublications" target="_blank" rel="noreferrer"><div>Publications</div></a>
    <a class="mobileSublink" href="https://www.metmuseum.org/toah/" target="_blank" rel="noreferrer"><div>Timeline of Art History</div></a>
    <a class="mobileSublink" href="https://www.metmuseum.org/learn/workshops-and-activities" target="_blank" rel="noreferrer"><div>Workshop and Activities</div></a>
    <a class="mobileSublink" href="https://www.metmuseum.org/perspectives" target="_blank" rel="noreferrer"><div>Articles, Videos, and Podcasts</div></a>
  </div>
  {/if}
</div>
</MediaQuery>
