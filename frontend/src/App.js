import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import FarmyHomeScreen from './screens/FarmyHomeScreen';
import HomeScreen from './screens/HomeScreen';
import BundleScreen from './screens/BundleScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceSubscriptionScreen from './screens/PlaceSubscriptionScreen';
import SubscriptionScreen from './screens/SubscriptionScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import BundleListScreen from './screens/BundleListScreen';
import BundleEditScreen from './screens/BundleEditScreen';
import SubscriptionListScreen from './screens/SubscriptionListScreen';
import RegisterBundleScreen from './screens/RegisterBundleScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/subscription/:id" component={SubscriptionScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placesubscription" component={PlaceSubscriptionScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register/bundleplan/" component={RegisterBundleScreen} />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/bundle/:id" component={BundleScreen} />
          <Route path="/cart/:id" component={CartScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          {/* <Route path="/admin/productlist" component={ProductListScreen} exact />
          <Route path="/admin/productlist/:pageNumber" component={ProductListScreen} exact />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
          <Route path="/admin/orderlist" component={OrderListScreen} /> */}
          {/* <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route path="/search/:keyword/page/:pageNumber" component={HomeScreen} exact /> */}
          <Route path="/" component={FarmyHomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
