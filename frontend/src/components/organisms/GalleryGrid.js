// components/GalleryGrid.jsx
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ArrowRightAlt } from '@mui/icons-material';
import styles from '../../style/Common.module.css';
import GradientLine from '../atoms/GradientLine';

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
          const response = await axios.get(`${apiUrl}/api/gallery/project/${name}`);
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
  <div>
    {projectGallery && projectGallery.length > 0 && (
      <section className="mb-5 pb-5 mt-5 pt-5" id="gallery">
        <div className="container">
          <div className="row">
            <GradientLine />
            <h2 className={styles.sectionTitle}>Project Gallery</h2>

            <div className="gallery-grid">
              {projectGallery.map((gallery, i) => (
                <div
                  key={gallery._id || i}
                  className="gallery-box position-relative"
                  onClick={() => {
                    setIndex(i);
                    setOpen(true);
                  }}
                >
                  {gallery.image?.[0]?.filepath && (
                    <img
                      src={gallery.image[0].filepath}
                      alt={gallery.alt || ""}
                    />
                  )}
                  <span className="overlayText">
      Artistic impression for representation purpose only
    </span>
                </div>
              ))}
            </div>

            {open && (
              <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={projectGallery.map((gallery) => ({
                  src: gallery.image?.[0]?.filepath || "",
                }))}
                index={index}
                plugins={[Zoom]}
                zoom={{
                  maxZoomPixelRatio: 3,
                }}
              />
            )}
          </div>
        </div>
      </section>
    )}
  </div>
);

};

export default GalleryGrid;
