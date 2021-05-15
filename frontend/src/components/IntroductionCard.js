import React from 'react'
import { Card } from 'react-bootstrap'
 
const IntroductionCard = ({image, heading, description}) => {
    return (
        <Card className='rounded'>
    <Card.Img src={image} variant='top' />
      <Card.Body>
          <Card.Title as='div'>
            <strong>{heading}</strong>
          </Card.Title>
          <Card.Text>{description}</Card.Text>
      </Card.Body>
        </Card>
    )
}

export default IntroductionCard
