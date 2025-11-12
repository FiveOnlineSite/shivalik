import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styles from "../../style/Common.module.css";
import axios from "axios";
import Slider from "react-slick";

const TestimonialBox = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const [testimonials, setTestimonials] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const getInitials = (name = "") =>
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("");

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/testimonial`);
        setTestimonials(response.data.testimonials || []);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="container">
      <Slider {...settings}>
  {testimonials.map((testimonial, index) => {
    const text = testimonial.content || "";
    const isExpanded = expandedIndex === index;
    const charLimit = 200; // Adjust this number if you want longer/shorter previews
    const visibleText = isExpanded ? text : text.slice(0, charLimit);

    return (
      <div className="container" key={testimonial._id}>
        <div className="row align-items-center">
          {/* Left: Image or Video */}
          <div className="col-lg-5">
            <div className={`${styles.testiImg} pt-3 pb-3`}>
              {testimonial.type === "image" && testimonial.media?.filepath && (
                <img
                  src={testimonial.media.filepath}
                  width="100%"
                  alt={testimonial.alt || ""}
                />
              )}

              {testimonial.type === "video" && testimonial.media?.filepath && (
                <video
                  src={testimonial.media.filepath}
                  width="100%"
                  muted
                  autoPlay
                  playsInline
                  controls
                  style={{ height: "500px", objectFit: "cover" }}
                />
              )}
            </div>
          </div>

          {/* Right: Text */}
          <div className="col-lg-7">
            <img className="mb-3 pb-3" src="/images/Quotes.png" alt="quote" />

            <div className={styles.testiText}>
              <div className={styles.testiInfo}>
                {/* Stars */}
                <div className="mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      style={{ fontSize: "1.2rem", color: "#F58634" }}
                    />
                  ))}
                </div>

                {/* Testimonial text */}
                <div className={`testimonialText ${isExpanded ? "expanded" : ""}`}>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: visibleText + (!isExpanded && text.length > charLimit ? "..." : ""),
                    }}
                  />
                </div>

                {/* Read More / Less Button */}
                {text.length > charLimit && (
                  <button
                    className="readMoreBtn mt-1 ps-0"
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>

              {/* User Info */}
              <ul className="d-flex align-items-center gap-2">
                <li className={styles.initialsCircle}>{getInitials(testimonial.name)}</li>
                <li>{testimonial.name}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  })}
</Slider>

    </div>
  );
};

export default TestimonialBox;
