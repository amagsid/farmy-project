import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listFarmDetails } from '../actions/farmActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Card } from 'react-bootstrap';

const FarmDetails = ({ farmId }) => {
  const dispatch = useDispatch();

  const farmDetails = useSelector((state) => state.farmDetails);

  const { loading, error, farm } = farmDetails;
  console.log(farm);

  useEffect(() => {
    dispatch(listFarmDetails(farmId));
  }, [dispatch, farmId]);
  return (
    <>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {farm && (
        <Card className="rounded" style={{ minHeight: '5rem' }}>
          <Card.Title as="div">{farm.name}</Card.Title>
          <Card.Body as="div">{farm.story}</Card.Body>
        </Card>
      )}
    </>
  );
};

export default FarmDetails;
