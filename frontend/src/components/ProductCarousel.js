import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel, Image } from "react-bootstrap";
import _ from "lodash";

const ProductCarousel = () => {
  const [image, setImage] = useState("");
  const [imageTwo, setImageTwo] = useState("");
  const [imageThree, setImageThree] = useState("");
  const [imageFour, setImageFour] = useState("");
  const [imageFive, setImageFive] = useState("");
  const [imageSix, setImageSix] = useState("");
  const [imageSeven, setImageSeven] = useState("");
  const [imageEight, setImageEight] = useState("");
  const [imageNine, setImageNine] = useState("");
  const [imageTen, setImageTen] = useState("");
  const [uploading, setUploading] = useState(false);
  const [bannerData, setBannerData] = useState();
  const getBanner = () => {
    axios
      .get("/api/bannerUpload/getBanner")
      .then(function (response) {
        console.log();
        if (response.status === 200) {
          setUploading(false);
          setBannerData(response.data);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    if (_.isEmpty(bannerData)) {
      getBanner();
    } else {
      setImage(bannerData.banner1);
      setImageTwo(bannerData.banner2);
      setImageThree(bannerData.banner3);
      setImageFour(bannerData.banner4);
      setImageFive(bannerData.banner5);
      setImageSix(bannerData.banner6);
      setImageSeven(bannerData.banner7);
      setImageEight(bannerData.banner8);
      setImageNine(bannerData.banner9);
      setImageTen(bannerData.banner10);
    }
  });

  return (
    <Carousel pause="hover" fade>
      {image && (
        <Carousel.Item>
          <Image src={image} className="heroImage" />
        </Carousel.Item>
      )}
      {imageTwo && (
        <Carousel.Item>
          <Image src={imageTwo} className="heroImage" />
        </Carousel.Item>
      )}
      {imageThree && (
        <Carousel.Item>
          <Image src={imageThree} className="heroImage" />
        </Carousel.Item>
      )}
      {imageFour && (
        <Carousel.Item>
          <Image src={imageFour} className="heroImage" />
        </Carousel.Item>
      )}
      {imageFive && (
        <Carousel.Item>
          <Image src={imageFive} className="heroImage" />
        </Carousel.Item>
      )}
      {imageSix && (
        <Carousel.Item>
          <Image src={imageSix} className="heroImage" />
        </Carousel.Item>
      )}
      {imageSeven && (
        <Carousel.Item>
          <Image src={imageSeven} className="heroImage" />
        </Carousel.Item>
      )}
      {imageEight && (
        <Carousel.Item>
          <Image src={imageEight} className="heroImage" />
        </Carousel.Item>
      )}
      {imageNine && (
        <Carousel.Item>
          <Image src={imageNine} className="heroImage" />
        </Carousel.Item>
      )}
      {imageTen && (
        <Carousel.Item>
          <Image src={imageTen} className="heroImage" />
        </Carousel.Item>
      )}
    </Carousel>
  );
};

export default ProductCarousel;
