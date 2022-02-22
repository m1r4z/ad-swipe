import React from 'react';
import Slider from "react-slick";

const SlickCarousel = ({attachmentObject}) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

      let arr = attachmentObject.map((attachment)=>{
        return (
            <div className='slider-container'>
                <div className='slider-image-container'>
                    <img alt="slider" src={attachment.imageUrl}/>
                </div>
                <div className='slider-title-container' style={{ padding: "10px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start"}}>
                    <a href={attachment.webLink ? attachment.webLink : "#"} style={{textDecoration: "none", textAlign: "left", fontSize: "16px", color: "#000", padding: 0, margin: 0, marginBottom: "5px"}}>{attachment.title}</a>
                    <span style={{textAlign: "left",fontSize: "12px", color: "#e6e6e6", padding: 0, margin: 0, paddingBottom: "5px"}}>{attachment.description}</span>
                </div>
            </div>
        )
    })
    return (
        <div style={{overflow: "hidden"}}>
            <Slider {...settings}>
            {arr}
            </Slider>
        </div>
    );
}

export default SlickCarousel;