// components/GalleryGrid.jsx
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// const images = [
//   { src: "images/gallery/one-gallery8.png" },
//   { src: "images/gallery/one-gallery9.png" },
//   { src: "images/gallery/one-gallery7.png" },
//   { src: "images/gallery/one-gallery6.png" },
//   { src: "images/gallery/one-gallery5.png" },
//   { src: "images/gallery/one-gallery4.png" },
//   { src: "images/gallery/one-gallery3.png" },
//   { src: "images/gallery/one-gallery2.png" },
//   { src: "images/gallery/one-gallery1.png" },
// ];

const GalleryGrid = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [projectGallery, setProjectGallery] = useState([])
  const {name} = useParams()

   useEffect(() => {
      const fetchProjectGallery = async () => {
        try {
          const apiUrl = process.env.REACT_APP_API_URL;
          const response = await axios.get(`${apiUrl}/api/gallery/title/${name}`);
          const ProjectGalleryData = response.data.Galleries;
          console.log("gallery", ProjectGalleryData)
          setProjectGallery(ProjectGalleryData);
        } catch (error) {
          console.error("Error fetching project gallery:", error);
        }
      };
      fetchProjectGallery();
    }, [name]);


  return (
    <>
      <div className="gallery-grid">
        {projectGallery && projectGallery.map((gallery, i) => (
          <div key={gallery._id} className="gallery-box" onClick={() => { setIndex(i); setOpen(true); }}>
            {gallery.image?.[0]?.filepath && (
            <img src={gallery.image?.[0]?.filepath} alt={gallery.alt} />
            )}
          </div>
        ))}
      </div>

      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={projectGallery.map(gallery => ({
            src: gallery.image?.[0]?.filepath || ""
          }))}
          index={index}
          plugins={[Zoom]}        // add zoom plugin
        zoom={{
          maxZoomPixelRatio: 3, // optional, maximum zoom level
        }}
          // optional: update index when navigating
          // onIndexChange={setIndex}
        />
      )}
    </>
  );
};

export default GalleryGrid;
