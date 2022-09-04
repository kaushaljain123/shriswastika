import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { getAllCategory } from "../actions/categoryAction";
import Categorys from "../components/Categorys";

const Category = () => {
  const dispatch = useDispatch();

  const getCategorys = useSelector((state) => state.getCategorys);
  const { loading, error, categorys } = getCategorys;

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  return (
    <Row>
      {categorys.map((cate) => (
        <span key={cate._id}>
          <Categorys cate={cate} />
        </span>
      ))}
    </Row>
  );
};

export default Category;
