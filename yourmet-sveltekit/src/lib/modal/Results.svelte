<script lang="ts">
  interface ForDB {
    // id: number,
    image_url: string,
    info_url: string,
    name: string,
    artist: string,
    born: string,
    death: string,
    year: string,
    wing: string
  }
  export let id:number;
  let info:any;
  let body:ForDB;
  export async function gatherInfo(id:number) {
    let data = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
    info = await data.json();
    body = {
      // id: number,
      image_url: info.primaryImageSmall,
      info_url: info.objectURL,
      name: info.title,
      artist: info.artistDisplayName,
      born: info.artistBeginDate,
      death: info.artistEndDate,
      year: info.objectDate,
      wing: info.department
    }
    console.log(body);
  }

  gatherInfo(id);
</script>

<div class="resultContainer">
  <!-- <div class="resultImage">
    <a href={info.info_url} target="_blank" rel="noreferrer">
      <img
        src={info.image_url}
        alt="Currently unavailable for view on YourMet. Click here to view the art on our main website."
      />
    </a>
  </div>
  <div class="resultInfo">
    <p class="resultInfoText">
      {info.artist !== "Unknown artist"
        ? `${info.artist} (${info.born}-${info.death})`
        : "Unknown artist"}
    </p>
    <p class="resultInfoText resultInfoName">{info.name}</p>
    <p class="resultInfoText">{info.year}</p>
    <p class="resultInfoText">{info.wing}</p>
    <div class="resultButtonsDiv">
    {(props.seen.some((match) => match.image_id === image_id) ? filledEye() : unfilledEye())}
    <button class="addToGalleryButton" onClick={addToGallery}>+</button>
    </div>
  </div> -->
</div>