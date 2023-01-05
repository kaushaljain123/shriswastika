import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import SubCategory from "./SubCategory";
import Elctro from '../images/icons/electro.png'
import computer from '../images/icons/computer.png'
import hair from '../images/icons/hairdryer.png'
import health from '../images/icons/health.png'
import lights from '../images/icons/lights.png'
import office from '../images/icons/office.png'
import openbox from '../images/icons/open-box.png'
import Security from '../images/icons/security.png'

const Categorys = ({ cate }) => {
  const subCategory = cate.children;
  return (
    <Nav className="subcategory">
      <div className="sub-category-img">
        {cate.name == 'Electronics' && (
            <img className="sub-icon" src={Elctro} />
        )}
        {cate.name == 'Computer' && (
            <img className="sub-icon" src={computer} />
        )}
        {cate.name == 'Health' && (
          <img className="sub-icon" src={health} />
        )}
        {cate.name == 'Security Products' && (
          <img className="sub-icon" src={Security} />
        )}
        {cate.name == 'OFFICE AUTOMATIONS' && (
          <img className="sub-icon" src={office} />
        )}
        {cate.name == 'OPEN BOX / REFURBISHED' && (
          <img className="sub-icon" src={openbox} />
        )}
        {cate.name == 'PERSONAL CARE' && (
          <img className="sub-icon" src={hair} />
        )}
        {cate.name == 'LIGHTING DEALS' && (
          <img className="sub-icon" src={lights} />
        )}
      </div>
      <NavDropdown className="category-text" title={cate.name} id={cate.name}>
        {subCategory.map((item) => (
          <SubCategory item={item} />
        ))}
      </NavDropdown>
    </Nav>
  );
};

export default Categorys;
