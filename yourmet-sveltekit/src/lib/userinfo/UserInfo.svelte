<script lang="ts">
  export let gallery:number;
  export let seen:number;
</script>

<div class="userInfo">
  <div class="username">Sangyeon's Met</div>
  <div class="userStats">
    Seen <span class="userStats">{seen}</span> artworks and a curator of <span class="userStats">
      {gallery}
      <!-- {props.gallery.filter(container => container.image_id !== null).length} -->
      </span>.
  </div>
</div>

<style>

.userInfo {
  max-width: 100vw;
  justify-content: center;
  background-image: url(https://rare-gallery.com/mocahbig/441945-ultrawide-Vincent-van-Gogh-painting-impressionism.jpg);
  background-size: cover;
}

.username,
.userStats {
  max-width: 80vw;
  margin: auto;
  padding-top: 35px;
  font-size: 60px;
  color: white;
  font-family: "DM Serif Display", serif;
}

.userStats {
  font-size: 32px;
  padding-bottom: 200px;
}

</style>