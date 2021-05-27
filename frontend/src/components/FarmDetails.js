import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listFarmDetails } from '../actions/farmActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Card, Image } from 'react-bootstrap';

const FarmDetails = ({ farmId }) => {
  const dispatch = useDispatch();

  const farmDetails = useSelector((state) => state.farmDetails);

  const { loading, error, farm } = farmDetails;

  useEffect(() => {
    dispatch(listFarmDetails(farmId));
  }, [dispatch, farmId]);
  return (
    <>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {farm && (
        <Card className="rounded m-4" style={{ minHeight: '5rem', fontSize: 'large' }}>
          <Card as="div">
            <h5>{farm.name}</h5>
          </Card>
          <div className="farm-details">
            <p>{farm.story}</p>
            <img alt="farm" src={farm.image} />
          </div>
        </Card>
      )}
    </>
  );
};

export default FarmDetails;
