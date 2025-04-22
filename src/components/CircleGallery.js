// CircleGallery.js
import { useState } from "react";
import GallerySlider from "./gallerySlider";
import "../styles/circleGallery.css";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/swiper.css'; // ← 너가 만든 스타일이 있다면 유지

const CircleGallery = ({ images, onImageClick }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openSlider = (index) => {
    setSelectedIndex(index);
  };

  const closeSlider = () => {
    setSelectedIndex(null);
  };

  return (
    <div>
      <div className="circle-gallery">
        {images.map((img, index) => (
          <div
            className={`circle-item size-${index % 5}`}
            key={index}
            onClick={() => onImageClick(index)}
          >
            <img src={img.previewUrl} alt={`circle-${index}`} />
            {/* <span className="number">{index + 1}</span> */}
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="gallery-slider-modal">
          <div className="gallery-slider-backdrop" onClick={closeSlider} />
          <div className="gallery-slider-container">
            <button className="close-btn" onClick={closeSlider}>✕</button>
            {/* <GallerySlider
              images={images}
              initialSlide={selectedIndex}
              onClose={closeSlider}
            /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CircleGallery;

