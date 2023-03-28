import React, { useState, useEffect } from "react";
import Navbar from "./navbar/Navbar.js";
import OffCanvas from "./navbar/OffCanvas.js";
import UserInfo from "./user-info/UserInfo.js";
import Gallery from "./gallery/Gallery.js";
import Modal from "./modal/Modal.js";

function App() {
  const [gallery, setGallery] = useState([]);
  const [modalState, showModal] = useState(false);
  const [offCanvasState, showCanvas] = useState(false);
  const [buttonID, setButtonID] = useState("");
  const [fetchSwitch, toggleFetchSwitch] = useState(false);
  const [seen, setSeen] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/art", {
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        //list.sort((a, b) => (a.color > b.color) ? 1 : -1)
        let sortedData = data.sort((a, b) => (a.id > b.id ? 1 : -1));
        setGallery(sortedData);
      });
  }, [fetchSwitch]);

  useEffect(() => {
    fetch("http://localhost:3001/api/seen", {
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        //list.sort((a, b) => (a.color > b.color) ? 1 : -1)
        let sortedData = data.sort((a, b) => (a.id > b.id ? 1 : -1));
        setSeen(sortedData);
      });
  }, [fetchSwitch]);

  function addContainer() {
    fetch(`http://localhost:3001/api/art/`, {
      mode: "cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    toggleFetchSwitch((prevState) => !prevState);
    setTimeout(() => {
      toggleFetchSwitch((prevState) => !prevState);
    }, "10");
  }

  return (
    <div className="App">
      <Navbar showCanvas={showCanvas} />
      {offCanvasState ? (
        <OffCanvas gallery={gallery} seen={seen} showCanvas={showCanvas} />
      ) : null}
      <div className="separator"></div>
      <UserInfo gallery={gallery} seen={seen} />
      <Gallery
        gallery={gallery}
        showModal={showModal}
        setButtonID={setButtonID}
        seen={seen}
        toggleFetchSwitch={toggleFetchSwitch}
      />
        <button className="addContainerButton" onClick={addContainer}>Add more art</button>
      {modalState ? (
        <Modal
          showModal={showModal}
          buttonID={buttonID}
          seen={seen}
          toggleFetchSwitch={toggleFetchSwitch}
          fetchSwitch={fetchSwitch}
        />
      ) : null}
    </div>
  );
}

export default App;
