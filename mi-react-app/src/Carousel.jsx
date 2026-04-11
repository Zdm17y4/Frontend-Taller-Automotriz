import { useState, useEffect } from 'react';
import './Carousel.css';

const Carousel = ({ items}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex + 1) % items.length
        );
    };
    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? items.length - 1 : prevIndex - 1
        );
    };
    return (
        <div className='carousel-container'>
            <button className='carousel-arrow left' onClick={prevSlide}>
                ❮
            </button>

            <div className='carousel-slide'>
                {items[currentIndex]}
            </div>

            <button className='carousel-arrow right' onClick={nextSlide}>
                ❯
            </button>
        </div>
    )
}

export default Carousel;