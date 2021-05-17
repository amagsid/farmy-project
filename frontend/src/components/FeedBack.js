import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
const FeedBack = ({ text, name }) => {
    return (
        <>
        <Card className='rounded' style={{ minHeight: '10rem' }}>
            <Rating value={5} color="black"/>
            <Card.Body as='div'>
                {text}
            </Card.Body>
            <Card.Subtitle as='div' style={{textAlign:'center'}}>{name}</Card.Subtitle>
        </Card>
        </>
    )
}

export default FeedBack
