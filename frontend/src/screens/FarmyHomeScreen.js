// new home screen Khaled & Fadi
import React, {useEffect}  from 'react'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FarmyBundle from '../components/FarmyBundle'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listBundles } from '../actions/bundlesActions'

const FarmyHomeScreen = () => {
    const dispatch = useDispatch();
    const bundlesList = useSelector((state)=>state.bundlesList)
    const { loading, error, bundles } = bundlesList

    useEffect(() => {
    dispatch(listBundles())
  }, [dispatch])
  
    return (
        <>
        <h1>Our Bundles</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        
          <Row>
            {bundles.map((bundle) => (
              <Col key={bundle._id} sm={12} md={6} lg={4} xl={3}>
                <FarmyBundle name={bundle.name} image={bundle.image}/>
              </Col>
            ))}
          </Row>
          
        
            )}   
      </>
    )}
export default FarmyHomeScreen
