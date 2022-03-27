import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import CategoryAdd from './screens/CategoryAdd';
import ThankYou from './screens/ThankYou'
import AboutUs from './screens/AboutUs';

const App =() => {
  return (
    <Router>
      <Header />
      <main className=''>
        <Container fluid>
          <Route path='/' component={HomeScreen} exact/>
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/productlist' component={ProductListScreen} exact/>
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/search/:keyword' component={HomeScreen} exact/>
          <Route path='/page/:pageNumber' component={HomeScreen} exact/>
          <Route path='/category/:categoryData' component={HomeScreen} exact/>
          <Route path='/search/:keyword/:page/:pageNumber' component={HomeScreen} />
          <Route path='/admin/productlist/:pageNumber' component={ProductListScreen} exact/>
          <Route path='/add-category' component={CategoryAdd}/>
          <Route path='/thankyou' component={ThankYou} />
          <Route path='/about-us' component={AboutUs} />
        </Container>
      </main>
      <Footer />
      <a
        href="https://wa.me/message/MERDGJLEUS3AN1"
        class="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i class="fa-brands fa-whatsapp whatsapp-icon"></i>
      </a>
    </Router>
  );
}

export default App;
