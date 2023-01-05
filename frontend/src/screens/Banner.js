import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { updateBanner } from "../actions/productActions";
import _ from "lodash";
import DashboardLink from '../components/DashboardLink'

const Banner = ({ history }) => {
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
  const [update, setUpdate] = useState(false);
  const [bannerData, setBannerData] = useState({});

  const dispatch = useDispatch();

  const bannerList = useSelector((state) => state.bannerList);
  const { loading, error, banner } = bannerList;

  const bannerUpdate = useSelector((state) => state.bannerUpdate);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = bannerUpdate;

  const getBanner = () => {
    axios
      .get("/api/bannerUpload/getBanner")
      .then(function (response) {
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
    if (!update) {
      bindValue();
    }
    if (_.isEmpty(bannerData)) {
      getBanner();
    }
  });

  const bindValue = () => {
    if (bannerData.banner1 != "") {
      setImage(bannerData.banner1);
    }
    if (bannerData.banner2 != "") {
      setImageTwo(bannerData.banner2);
    }
    if (bannerData.banner3 != "") {
      setImageThree(bannerData.banner3);
    }
    if (bannerData.banner4 != "") {
      setImageFour(bannerData.banner4);
    }
    if (bannerData.banner5 != "") {
      setImageFive(bannerData.banner5);
    }
    if (bannerData.banner6 != "") {
      setImageSix(bannerData.banner6);
    }
    if (bannerData.banner7 != "") {
      setImageSeven(bannerData.banner7);
    }
    if (bannerData.banner8 != "") {
      setImageEight(bannerData.banner8);
    }
    if (bannerData.banner9 != "") {
      setImageNine(bannerData.banner9);
    }
    if (bannerData.banner10 != "") {
      setImageTen(bannerData.banner10);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateBanner({
        banner1: image,
        banner2: imageTwo,
        banner3: imageThree,
        banner4: imageFour,
        banner5: imageFive,
        banner6: imageSix,
        banner7: imageSeven,
        banner8: imageEight,
        banner9: imageNine,
        banner10: imageTen,
      })
    );
    history.push("/admin/productlist");
  };

  const uploadFileHandler = async (e) => {
    setUpdate(true);
    const formData = new FormData();

    _.forEach(e.target.files, (file) => {
      formData.append("banner1", file);
    });
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/bannerUpload", formData, config);

      console.log(data);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  // Image Two
  const uploadFileHandlerTwo = async (e) => {
    setUpdate(true);
    const formData = new FormData();
    alert(6);
    setImageTwo("");
    _.forEach(e.target.files, (file) => {
      formData.append("banner2", file);
    });
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/bannerUpload/banner2",
        formData,
        config
      );
      console.log(data);
      setImageTwo();
      setImageTwo(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  // Image Three
  const uploadFileHandlerThree = async (e) => {
    setUpdate(true);
    const formData = new FormData();
    setImageThree("");
    _.forEach(e.target.files, (file) => {
      formData.append("banner3", file);
    });
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/bannerUpload/banner3",
        formData,
        config
      );

      console.log(data);
      setImageThree(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  // Image Four
  const uploadFileHandlerFour = async (e) => {
    setUpdate(true);
    const formData = new FormData();
    setImageFour("");
    _.forEach(e.target.files, (file) => {
      formData.append("banner4", file);
    });
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/bannerUpload/banner4",
        formData,
        config
      );

      console.log(data);
      setImageFour(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  // Image Five
  const uploadFileHandlerFive = async (e) => {
    setUpdate(true);
    const formData = new FormData();
    setImageFive("");
    _.forEach(e.target.files, (file) => {
      formData.append("banner5", file);
    });
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/bannerUpload/banner5",
        formData,
        config
      );

      console.log(data);
      setImageFive(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  // Image Six
  const uploadFileHandlerSix = async (e) => {
    setUpdate(true);
    const formData = new FormData();
    setImageSix("");
    _.forEach(e.target.files, (file) => {
      formData.append("banner6", file);
    });
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/bannerUpload/banner6",
        formData,
        config
      );

      console.log(data);
      setImageSix(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  // Image Seven
  const uploadFileHandlerSeven = async (e) => {
    setUpdate(true);
    const formData = new FormData();
    setImageSeven("");
    _.forEach(e.target.files, (file) => {
      formData.append("banner7", file);
    });
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/bannerUpload/banner7",
        formData,
        config
      );

      console.log(data);
      setImageSeven(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  // Image Eight
  const uploadFileHandlerEight = async (e) => {
    setUpdate(true);
    const formData = new FormData();
    setImageEight("");
    _.forEach(e.target.files, (file) => {
      formData.append("banner8", file);
    });
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/bannerUpload/banner8",
        formData,
        config
      );

      console.log(data);
      setImageEight(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  // Image Nine
  const uploadFileHandlerNine = async (e) => {
    setUpdate(true);
    const formData = new FormData();
    setImageNine("");
    _.forEach(e.target.files, (file) => {
      formData.append("banner9", file);
    });
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/bannerUpload/banner9",
        formData,
        config
      );

      console.log(data);
      setImageNine(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  // Image Ten
  const uploadFileHandlerTen = async (e) => {
    setUpdate(true);
    const formData = new FormData();
    setImageTen("");
    _.forEach(e.target.files, (file) => {
      formData.append("banner10", file);
    });
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/bannerUpload/banner10",
        formData,
        config
      );

      console.log(data);
      setImageTen(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <div className="container">
      <DashboardLink />
      <Form onSubmit={submitHandler}>
        <Row>
          <Col>
            <h2 className="text-center mt-5 mb-4">Banner Images Section</h2>
            <h3>
              Note : Image Resolution Width : 1873 PX and Height: 400 PX for
              better Resolution
            </h3>
            {bannerData.banner1 && (
              <Image src={bannerData.banner1} className="bannerImaageAdmin" />
            )}

            <Form.Group controlId="image">
              <Form.Label>
                Image one <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
                multiple
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            {bannerData.banner2 && (
              <Image src={bannerData.banner2} className="bannerImaageAdmin" />
            )}

            <Form.Group controlId="image">
              <Form.Label>
                Image Two <span className="">(Optional)</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={imageTwo}
                onChange={(e) => setImageTwo(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandlerTwo}
                multiple
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            {bannerData.banner3 && (
              <Image src={bannerData.banner3} className="bannerImaageAdmin" />
            )}
            <Form.Group controlId="image">
              <Form.Label>
                Image Three <span className="">(Optional)</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={imageThree}
                onChange={(e) => setImageThree(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandlerThree}
                multiple
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            {bannerData.banner4 && (
              <Image src={bannerData.banner4} className="bannerImaageAdmin" />
            )}
            <Form.Group controlId="image">
              <Form.Label>
                Image Four <span className="">(Optional)</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={imageFour}
                onChange={(e) => setImageFour(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandlerFour}
                multiple
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            {bannerData.banner5 && (
              <Image src={bannerData.banner5} className="bannerImaageAdmin" />
            )}
            <Form.Group controlId="image">
              <Form.Label>
                Image Five <span className="">(Optional)</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={imageFive}
                onChange={(e) => setImageFive(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandlerFive}
                multiple
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            {bannerData.banner6 && (
              <Image src={bannerData.banner6} className="bannerImaageAdmin" />
            )}
            <Form.Group controlId="image">
              <Form.Label>
                Image Six <span className="">(Optional)</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={imageSix}
                onChange={(e) => setImageSix(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandlerSix}
                multiple
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            {bannerData.banner7 && (
              <Image src={bannerData.banner7} className="bannerImaageAdmin" />
            )}
            <Form.Group controlId="image">
              <Form.Label>
                Image Seven <span className="">(Optional)</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={imageSeven}
                onChange={(e) => setImageSeven(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandlerSeven}
                multiple
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            {bannerData.banner8 && (
              <Image src={bannerData.banner8} className="bannerImaageAdmin" />
            )}
            <Form.Group controlId="image">
              <Form.Label>
                Image Eight <span className="">(Optional)</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={imageEight}
                onChange={(e) => setImageEight(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandlerEight}
                multiple
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            {bannerData.banner9 && (
              <Image src={bannerData.banner9} className="bannerImaageAdmin" />
            )}
            <Form.Group controlId="image">
              <Form.Label>
                Image Nine <span className="">(Optional)</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={imageNine}
                onChange={(e) => setImageNine(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandlerNine}
                multiple
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            {bannerData.banner10 && (
              <Image src={bannerData.banner10} className="bannerImaageAdmin" />
            )}
            <Form.Group controlId="image">
              <Form.Label>
                Image Ten <span className="">(Optional)</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={imageTen}
                onChange={(e) => setImageTen(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandlerTen}
                multiple
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-center mb-5">
          <Button
            type="submit"
            variant="primary"
            className="btn btn-primary btn-block form-btn text-center"
          >
            Upload
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Banner;
