import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Bundle = ({ bundle }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/bundles/${bundle._id}`}>
        <Card.Img src={bundle.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/bundles/${bundle._id}`}>
          <Card.Title as="div">
            <strong>{bundle.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating value={bundle.rating} text={`${bundle.numReviews} reviews`} />
        </Card.Text>

        <Card.Text as="h3">${bundle.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Bundle;
