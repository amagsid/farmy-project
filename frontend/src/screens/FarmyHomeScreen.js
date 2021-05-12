// new home screen Khaled & Fadi
import React from 'react'
import Header from '../components/FarmyHeader'
import Footer from '../components/Footer'
import FarmyBundle from '../components/FarmyBundle'
import { Row,Col, Container } from 'react-bootstrap'
const FarmyHomeScreen = () => {
    return (
        <>
            <Header />
            <h1>Helloo</h1>
            <Container>
  <Row> 
      <Col> <FarmyBundle /> </Col>
      <Col> <FarmyBundle /> </Col>
      <Col> <FarmyBundle /> </Col>
 </Row>
</Container>
            
            <Footer />
        </>
    )
}

export default FarmyHomeScreen
