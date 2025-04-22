import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'; // ✅ 여기로 변경!
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/swiper.css'; // ← 너가 만든 스타일이 있다면 유지

const GallerySlider = ({ images, showProgressBar, isPrv }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef(null);
    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
          swiperRef.current.swiper.updateAutoHeight();
        }
    }, [images]);

    return (
        <>
            <Swiper
            autoHeight={true}
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // loop일 경우 realIndex 사용
            loop={images.length > 1}
            spaceBetween={10}
            navigation  
            >
            {images.map((img, idx) => (
                <SwiperSlide key={idx}>
                <img src={isPrv === "prv" ? img : img.previewUrl} alt={`slide-${idx}`} className="gallery-img" />
                </SwiperSlide>
            ))}
            </Swiper>
            {showProgressBar === "true" && (
            <div className="progress-bar-wrap">
                <div
                className="progress-bar"
                style={{
                    width: `${((activeIndex + 1) / images.length) * 100}%`,
                }}
                />
            </div>
            )}

            <div className="gallery-pagination">
                {activeIndex + 1} / {images.length}
            </div>

        </>
        
    
    );
};

export default GallerySlider;
