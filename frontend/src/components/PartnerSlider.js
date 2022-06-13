import React from 'react'
import Marquee from "react-fast-marquee";
import image1 from '../images/1.jpg'
import image2 from '../images/2.jpg'
import image3 from '../images/3.png'
import image4 from '../images/4.jpg'
import image5 from '../images/5.png'
import image6 from '../images/6.png'
import image7 from '../images/8.png'
import image8 from '../images/9.jpg'
import image9 from '../images/10.jpg'
import image10 from '../images/11.png'
import image11 from '../images/12.jpg'
import image12 from '../images/13.png'
import image13 from '../images/14.png'
import image14 from '../images/15.png'
import image15 from '../images/16.png'
import image16 from '../images/17.png'
import image17 from '../images/18.png'
import image18 from '../images/19.png'
import image19 from '../images/20.png'
import image20 from '../images/21.png'

const PartnerSlider = () => {
    return (
        <div className='app'>
            <div className='title'>
                <h3 className='text-center'>Our Associate Partner</h3>
            </div>

            <div>
                <Marquee speed={100}>
                    {/* <div className='image-wrapper'>
                    <img src={image1} alt='' />
                </div> */}
                    {/* <div className='image-wrapper'>
                    <img src={image2} alt='' />
                </div> */}
                    {/* <div className='image-wrapper'>
                    <img src={image3} alt='' />
                </div> */}
                    <div className='image-wrapper'>
                        <img src={image4} alt='' />
                    </div>
                    <div className='image-wrapper'>
                        <img src={image5} alt='' />
                    </div>
                    <div className='image-wrapper'>
                        <img src={image6} alt='' />
                    </div>
                    <div className='image-wrapper'>
                        <img src={image7} alt='' />
                    </div>
                    <div className='image-wrapper'>
                        <img src={image8} alt='' />
                    </div>
                    {/* <div className='image-wrapper'>
                    <img src={image9} alt='' />
                </div> */}
                    {/* <div className='image-wrapper'>
                    <img src={image10} alt='' />
                </div> */}
                    {/* <div className='image-wrapper'>
                    <img src={image11} alt='' />
                </div> */}
                    <div className='image-wrapper'>
                        <img src={image12} alt='' />
                    </div>
                    <div className='image-wrapper'>
                        <img src={image13} alt='' />
                    </div>
                    {/* <div className='image-wrapper'>
                    <img src={image14} alt='' />
                </div> */}
                    <div className='image-wrapper'>
                        <img src={image15} alt='' />
                    </div>
                    <div className='image-wrapper'>
                        <img src={image16} alt='' />
                    </div>
                    <div className='image-wrapper'>
                        <img src={image17} alt='' />
                    </div>
                    <div className='image-wrapper'>
                        <img src={image18} alt='' />
                    </div>
                    <div className='image-wrapper'>
                        <img src={image19} alt='' />
                    </div>
                    <div className='image-wrapper'>
                        <img src={image20} alt='' />
                    </div>
                </Marquee>
            </div>

        </div>
    )
}

export default PartnerSlider