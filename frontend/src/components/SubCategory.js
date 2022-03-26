import React from 'react'
import { NavDropdown  } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
const SubCategory = ({ item }) => {

  return (
        // <LinkContainer to={`/search/${item.slug}`}>
            <NavDropdown.Item>
                {item.name}
            </NavDropdown.Item>
        // </LinkContainer>
  )
}
 
export default SubCategory