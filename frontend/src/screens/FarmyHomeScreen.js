// new home screen Khaled & Fadi
import React from 'react'
import Header from '../components/FarmyHeader'
import Footer from '../components/Footer'
import FarmyBundle from '../components/FarmyBundle'
import { Row, Container } from 'react-bootstrap'
const FarmyHomeScreen = () => {
    return (
        <>
        <Header />
        <h1>our bundles</h1>
            <Container>
            <Row> 
            <FarmyBundle />
            </Row>
            </Container>
        <Footer />
        </>
    )
}

export default FarmyHomeScreen
