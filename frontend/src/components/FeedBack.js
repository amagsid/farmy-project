import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
const FeedBack = ({ text, name }) => {
    return (
        <>
        <Card className='rounded'>
            <Rating value={5} color="black"/>
            <Card.Body as='div'>
                {text}
            </Card.Body>
            <Card.Subtitle>{name}</Card.Subtitle>
        </Card>
        </>
    )
}

export default FeedBack
