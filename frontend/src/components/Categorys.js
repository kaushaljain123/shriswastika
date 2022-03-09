import React from 'react'
import { Nav, NavDropdown  } from 'react-bootstrap';
import SubCategory from './SubCategory';


const Categorys = ({ cate }) => {
    const subCategory = cate.children

  return (
      <Nav>
        <NavDropdown title={cate.name} id={cate.name}>
                {subCategory.map(item => (
                        <SubCategory item={item} />
                ))}
        </NavDropdown>
      </Nav>
  )
}

export default Categorys