import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { getAllCategory } from '../actions/categoryAction';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import _ from 'lodash'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState([])
  const [videoLink, setVideoLink] = useState('');
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const [subCat, setSubCat] = useState([])

  const dispatch = useDispatch()

  const productDetail = useSelector((state) => state.productDetail)
  const { loading, error, product } = productDetail

  const productUpdate = useSelector((state) => state.productUpdate)

  const getCategorys = useSelector(state => state.getCategorys)
  const { categorys } = getCategorys

  let subCategorys = []
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    dispatch(getAllCategory())
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setVideoLink(product.videoLink)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, history, productId, product, successUpdate])


  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    setImage([])

    _.forEach(e.target.files, file => {
      formData.append('image', file)
    })
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)

      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }


  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        videoLink,
        brand,
        category,
        subCategory,
        description,
        countInStock,
      })
    )
  }

  const getSubCategory = (e) => {
    console.log(e)
    console.log(categorys)
    setCategory()
    categorys.map(c => {
      if(e == c._id) {
        setCategory(c.name)
      }
      c.children.map(sc => {
        if(e == sc.parentId) {
          subCategorys.push(sc)
          setSubCat(subCategorys)
        }
      })
    })
  }

  const getSubCategoryValue = (e) => {
    subCat.map(g => {
      if(e == g._id) {
        setSubCategory(g.name)
      }
    })
  }

  console.log(subCat)

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
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

            <Form.Group controlId='videoLink'>
              <Form.Label>video Link</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter video Link'
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* <Form.Group controlId='category'>

              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group> */}

            <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
                <Form.Control as='select' value={categorys._id}
                onChange={(e) => getSubCategory(e.target.value)}>
                    <option>Select Category</option>
                    {categorys.map(x => (
                      <option key={x._id} value={x._id}>{x.name}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='subcategory'>
            <Form.Label>Select Sub Category</Form.Label>
                <Form.Control as='select' value={subCategory._id}  disabled={subCat.length == 0}
                onChange={(e) => getSubCategoryValue(e.target.value)}
                >
                    <option>Select Sub Category</option>
                    {subCat.map(y => (
                      <option key={y._id} value={y._id}>{y.name}</option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                row='5'
                col='5'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen