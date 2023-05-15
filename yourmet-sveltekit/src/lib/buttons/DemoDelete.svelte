<script lang="ts">
  export let container:number;
  export let gallery:any;
  export let galleryIsGallery:any;
  export let dimensions:number;
  export let fontSize: number;
  function demoDelete(container:number){
    for (let i = 0; i < gallery.length; i++){
      if (gallery[i].id === container){
        gallery.splice(i, 1)
        galleryIsGallery();
      }
    }
  }
</script>

<div class="div">
  <button class="actionButton"style="height: {dimensions}px; width: {dimensions}px; font-size:{fontSize}px" on:click={()=>demoDelete(container)}>
    X
  </button>
</div>

<style>
.div {
  display: flex;
  justify-content: flex-end;
}
.actionButton{
  position: absolute;
  right: 5px;
}
</style>
