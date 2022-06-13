import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { updateBanner } from '../actions/productActions'
import { Image } from 'react-bootstrap'
import _ from 'lodash'

const Banner = ({ history }) => {

    const [image, setImage] = useState('')
    const [imageTwo, setImageTwo] = useState('')
    const [imageThree, setImageThree] = useState('')
    const [imageFour, setImageFour] = useState('')
    const [imageFive, setImageFive] = useState('')
    const [uploading, setUploading] = useState(false)
    const [bannerData, setBannerData] = useState({})

    const dispatch = useDispatch()

    const bannerList = useSelector((state) => state.bannerList)
    const { loading, error, banner } = bannerList

    const bannerUpdate = useSelector((state) => state.bannerUpdate)

    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = bannerUpdate

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
        }
    })

    console.log(bannerData)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            updateBanner({
                banner1: image,
                banner2: imageTwo,
                banner3: imageThree,
                banner4: imageFour,
                banner5: imageFive
            })
        )
        history.push('/admin/productlist')
    }

    const uploadFileHandler = async (e) => {
        const formData = new FormData()

        _.forEach(e.target.files, file => {
            formData.append('banner1', file)
        })
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            const { data } = await axios.post('/api/bannerUpload', formData, config)

            console.log(data)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    // Image Two
    const uploadFileHandlerTwo = async (e) => {
        const formData = new FormData()
        setImageTwo('')
        _.forEach(e.target.files, file => {
            formData.append('banner2', file)
        })
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            const { data } = await axios.post('/api/bannerUpload/banner2', formData, config)
            console.log(data)
            setImageTwo(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    // Image Three
    const uploadFileHandlerThree = async (e) => {
        const formData = new FormData()
        setImageThree('')
        _.forEach(e.target.files, file => {
            formData.append('banner3', file)
        })
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            const { data } = await axios.post('/api/bannerUpload/banner3', formData, config)

            console.log(data)
            setImageThree(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    // Image Four
    const uploadFileHandlerFour = async (e) => {
        const formData = new FormData()
        setImageFour('')
        _.forEach(e.target.files, file => {
            formData.append('banner4', file)
        })
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            const { data } = await axios.post('/api/bannerUpload/banner4', formData, config)

            console.log(data)
            setImageFour(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    // Image Five
    const uploadFileHandlerFive = async (e) => {
        const formData = new FormData()
        setImageFive('')
        _.forEach(e.target.files, file => {
            formData.append('banner5', file)
        })
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            const { data } = await axios.post('/api/bannerUpload/banner5', formData, config)

            console.log(data)
            setImageFive(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    return (
        <div className="container">
            <Form onSubmit={submitHandler}>
                <Row>
                    <Col>
                        <h2 className='text-center mt-5 mb-4'>Banner Images Section</h2>

                        <Form.Group controlId='image'>
                            <Form.Label>Image one <span className='text-danger'>*</span></Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image url'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                            <Form.File
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandler}
                                multiple
                            ></Form.File>
                            {uploading && <Loader />}
                        </Form.Group>


                        <Form.Group controlId='image'>
                            <Form.Label>Image Two <span className=''>(Optional)</span></Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image url'
                                value={imageTwo}
                                onChange={(e) => setImageTwo(e.target.value)}
                            ></Form.Control>
                            <Form.File
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandlerTwo}
                                multiple
                            ></Form.File>
                            {uploading && <Loader />}
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image Three <span className=''>(Optional)</span></Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image url'
                                value={imageThree}
                                onChange={(e) => setImageThree(e.target.value)}
                            ></Form.Control>
                            <Form.File
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandlerThree}
                                multiple
                            ></Form.File>
                            {uploading && <Loader />}
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image Four <span className=''>(Optional)</span></Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image url'
                                value={imageFour}
                                onChange={(e) => setImageFour(e.target.value)}
                            ></Form.Control>
                            <Form.File
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandlerFour}
                                multiple
                            ></Form.File>
                            {uploading && <Loader />}
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image Five <span className=''>(Optional)</span></Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image url'
                                value={imageFive}
                                onChange={(e) => setImageFive(e.target.value)}
                            ></Form.Control>
                            <Form.File
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandlerFive}
                                multiple
                            ></Form.File>
                            {uploading && <Loader />}
                        </Form.Group>
                    </Col>
                </Row>

                <div className='d-flex justify-content-center mb-5'>
                    <Button type='submit' variant='primary' className='btn btn-primary btn-block text-center'>
                        Upload
                    </Button>
                </div>

            </Form>
        </div>

    )
}

export default Banner