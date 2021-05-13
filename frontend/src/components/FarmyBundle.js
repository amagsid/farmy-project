import React from 'react'
import { Card, Button } from 'react-bootstrap'

const FarmyBundle = ({name , image , description }) => {
    return (
        <Card className='my-3 p-3 rounded'>
      
        <Card.Img src={image} variant='top' />
    

      <Card.Body>
        
          <Card.Title as='div'>
            <strong>{name}</strong>
          </Card.Title>
        

        <Card.Text as='div'>
        <p>{description}</p>
        </Card.Text>

        <Button>Subscribe</Button>
      </Card.Body>
    </Card>
    )
}

export default FarmyBundle
