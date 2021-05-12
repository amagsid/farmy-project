import React from 'react'
import { Card, Button } from 'react-bootstrap'

const FarmyBundle = () => {
    return (
        <Card className='my-3 p-3 rounded'>
      
        <Card.Img src='https://cdn.shopify.com/s/files/1/0033/0212/9773/collections/smoothies_category_650x650_22985bd2-894d-4b28-a442-c282d7726eba_1000x1000.jpg?v=1583315575' variant='top' />
    

      <Card.Body>
        
          <Card.Title as='div'>
            <strong>Here there will be text</strong>
          </Card.Title>
        

        <Card.Text as='div'>
        <p>Here will be an explenation for the bundle </p>
        </Card.Text>

        <Button>Subscribe</Button>
      </Card.Body>
    </Card>
    )
}

export default FarmyBundle
