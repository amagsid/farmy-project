import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';

const FarmStory = () => {
  const farmsData = useSelector((state) => state.farmList);

  const { farm } = farmsData;

  const getTwoRandomStories = farm.sort(() => Math.random() - Math.random()).slice(0, 2);

  return (
    <>
      {getTwoRandomStories.map((item) => (
        <Card key={item._id} className="rounded" style={{ minHeight: '5rem' }}>
          <Card.Body
            as="div"
            style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'large' }}
          >
            <span> {item.story}</span>
            <span>{item.name}</span>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default FarmStory;
