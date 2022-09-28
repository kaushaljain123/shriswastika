import React from 'react'
import { Form, NavDropdown  } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
const SubCategory = ({ item, history }) => {
  const changeData = () => {
    if(item.slug) {
      document.location.href = `/category/${item.slug}`
    } else {
      document.location.href = '/'
    }
  }

  return (
        <Form onClick={changeData}>
            <NavDropdown.Item>
                {item.name}
            </NavDropdown.Item>
         </Form>
  )
}
 
export default SubCategory