import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Carousel, Image } from 'react-bootstrap'
import _ from 'lodash'

const ProductCarousel = () => {
  const [image, setImage] = useState('')
  const [imageTwo, setImageTwo] = useState('')
  const [imageThree, setImageThree] = useState('')
  const [imageFour, setImageFour] = useState('')
  const [imageFive, setImageFive] = useState('')
  const [uploading, setUploading] = useState(false)
  const [bannerData, setBannerData] = useState()
  const getBanner = () => {

    axios.get('/api/bannerUpload/getBanner').then(function (response) {
      console.log()
      if (response.status === 200) {
        setUploading(false)
        setBannerData(response.data)
      }
    })
      .catch(function (error) {
        console.error(error)
      })
  }

  useEffect(() => {
    if (_.isEmpty(bannerData)) {
      getBanner()
    } else {
      setImage(bannerData.banner1)
      setImageTwo(bannerData.banner2)
      setImageThree(bannerData.banner3)
      setImageFour(bannerData.banner4)
      setImageFive(bannerData.banner5)
    }
  })

  return (
    <Carousel pause='hover' fade>
      {image && <Carousel.Item>
        <Image src={image} className="heroImage" />
      </Carousel.Item>}
      {imageTwo && <Carousel.Item>
        <Image src={imageTwo} className="heroImage" />
      </Carousel.Item>}
      {imageThree && <Carousel.Item>
        <Image src={imageThree} className="heroImage" />
      </Carousel.Item>}
      {imageFour && <Carousel.Item>
        <Image src={imageFour} className="heroImage" />
      </Carousel.Item>}
      {imageFive && <Carousel.Item>
        <Image src={imageFive} className="heroImage" />
      </Carousel.Item>}
    </Carousel>
  )
}

export default ProductCarousel