<script lang="ts">
	import '../../../global.css';
	import { userInfo, seen, gallery } from "$lib/stores";
  const options:any = ["https://rare-gallery.com/mocahbig/441945-ultrawide-Vincent-van-Gogh-painting-impressionism.jpg", "https://rare-gallery.com/mocahbig/419988-ultrawide-traditional-art-classical-art-mountain-top.jpg", "https://amazon-webstore-clone-bucket.s3.amazonaws.com/yourmet/new_york_city_buildings-wallpaper-3840x1600.jpg", "https://amazon-webstore-clone-bucket.s3.amazonaws.com/yourmet/classic-art-dresden-ultrawide-wallpaper-2f8502ccbec6ac7b655c6842d1910464.jpg", "https://amazon-webstore-clone-bucket.s3.amazonaws.com/yourmet/claude_monet_the_seine_at_vetheuil_oil_117263_2560x1024.jpg"]; // i explored trying to get the pictures to pre-load but upon checking the network tab it's all the same; they are stored in the disk cache already. i also tried using +page.ts because i know when you hover over <a> tags it pre-loads the data, but it's already stored in disk cache and it just takes a bit of time for the image to load
  let selection:string = "";
	$: onDisplay = [...$gallery]; // it doesn't like it when I do $gallery.filter
  $: if ($userInfo) {
    selection = $userInfo.cover_photo;
  }
  function selectPhoto(i:number) {
    selection = options[i];
    fetch(`/api/users/`, {
      mode: "cors",
      method: "PATCH",
      body: JSON.stringify({cover_photo:selection, username:$userInfo.username}),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
  }
</script>

<title>Change Cover Photo - YourMet</title>
{#if $userInfo}
<div class="wrapper">
  <div class="accountHeader">Your cover photo.</div>
  Current photo
  <div class="coverPhoto" style="background-image: url({selection || "https://rare-gallery.com/mocahbig/441945-ultrawide-Vincent-van-Gogh-painting-impressionism.jpg"})">
    <div class="infoWrapper">
      <div class="username">{$userInfo.first_name}'s Met</div>
      <div class="userStats">
        Seen <span class="userStats">{$seen.length}</span> artworks and a curator of
        <span class="userStats">
          {onDisplay.filter((artwork) => artwork.image_id !== null).length}
        </span>.
      </div>
    </div>
  </div>
  <div class="optionsWrapper">
    Choose your cover photo
    <div class="options">
      {#each options as photo, i}
        <img class="photos selection" src={photo} alt="coverphoto options" on:click={() => selectPhoto(i)}/>
      {/each}
    </div>
  </div>
</div>
{/if}

<style>
  .optionsWrapper{
    margin-top: 3rem;
  }
  .wrapper {
		padding: 3% 12% 0 12%;
    text-align: start;
    font-weight: 400;
	}
  .optionsWrapper{
    font-weight: 400;
  }
	.username,
	.userStats {
		max-width: 80vw;
		margin: auto;
		padding-top: 3%;
		font-size: 1.7rem;
		color: white;
		font-family: 'DM Serif Display', serif;
		text-shadow: 1px 1px #000000;
    /* font-weight: 100; */

	}
	.userStats {
		font-size: 1.1rem;
	}
  .infoWrapper{
    margin-left: 7%;
		height: 36vh;

  }
	.coverPhoto {
		/* background-image: url(var(--image)); */
    margin-top: 1rem;
		background-size: cover;
		background-position: center;
    border: 1px solid gray;
	}
  .options{
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 7px;
    margin-top: 1rem;
    flex-wrap: wrap;
  }
  .selection {
    margin: auto;
    width: 100%;
    height: 155px;
    border: 1px solid gray;
		cursor: pointer;

  }
  .photos{
    object-fit: cover;
    height: 155px;
  }
  @media (max-width: 1400px) {
		.options {
      grid-template-columns: 1fr 1fr;
		}
	}

  @media (max-width: 1200px) {
		.options {
      grid-template-columns: 1fr 1fr 1fr;
		}
	}

  @media (max-width: 900px) {
		.options {
      grid-template-columns: 1fr 1fr 1fr;

		}
	}
  @media (max-width: 700px) {
		.options {
      grid-template-columns: 1fr 1fr;

		}
	}
  @media (max-width: 400px) {
		.options {
      grid-template-columns: 1fr;

		}
	}
</style>