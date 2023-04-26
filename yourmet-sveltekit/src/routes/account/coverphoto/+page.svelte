<script lang="ts">
	import '../../../global.css';
	import { user, seen, gallery } from "$lib/stores"
	import Loader from "$lib/account/Loader.svelte"
	$: onDisplay = [...$gallery]; // it doesn't like it when I do $gallery.filter
  const options:any = ["https://rare-gallery.com/mocahbig/441945-ultrawide-Vincent-van-Gogh-painting-impressionism.jpg", "https://rare-gallery.com/mocahbig/419988-ultrawide-traditional-art-classical-art-mountain-top.jpg", "https://amazon-webstore-clone-bucket.s3.amazonaws.com/yourmet/new_york_city_buildings-wallpaper-3840x1600.jpg"]
  let selection:string = "https://rare-gallery.com/mocahbig/441945-ultrawide-Vincent-van-Gogh-painting-impressionism.jpg";
  function selectPhoto(i:number) {
    selection = options[i]
  }
  // let selection = "https://rare-gallery.com/mocahbig/441945-ultrawide-Vincent-van-Gogh-painting-impressionism.jpg"
  // let selection = "https://images.metmuseum.org/CRDImages/ad/original/DP215410.jpg"
  // let selection = "https://rare-gallery.com/mocahbig/419988-ultrawide-traditional-art-classical-art-mountain-top.jpg"
  // let selection = "https://amazon-webstore-clone-bucket.s3.amazonaws.com/yourmet/new_york_city_buildings-wallpaper-3840x1600.jpg"
</script>

<Loader/>
<div class="wrapper">
  <div class="coverPhoto" style="background-image: url({selection})">
    <div class="infoWrapper">
      <div class="username">{$user.given_name}'s Met</div>
      <div class="userStats">
        Seen <span class="userStats">{$seen.length}</span> artworks and a curator of
        <span class="userStats">
          {onDisplay.filter((artwork) => artwork.image_id !== null).length}
        </span>.
      </div>
    </div>
  </div>
  <div class="options">
    {#each options as photo, i}
      <div class="selection">
        <img class="photos" src={photo} on:click={() => selectPhoto(i)} alt="picture"/>
      </div>
    {/each}
  </div>
</div>

<style>
  .wrapper {
		padding: 40px;
    text-align: start;
	}
	.username,
	.userStats {
		max-width: 80vw;
		margin: auto;
		padding-top: 19px;
		font-size: 37px;
		color: white;
		font-family: 'DM Serif Display', serif;
	}
	.userStats {
		font-size: 20px;
		padding-bottom: 250px;
	}
  .infoWrapper{
    margin-left: 10%;
  }
	.coverPhoto {
		/* background-image: url(var(--image)); */
		background-size: cover;
	}
  .selection {
    width: 400px;
    height: 155px;
    margin: 20px;
  }
</style>