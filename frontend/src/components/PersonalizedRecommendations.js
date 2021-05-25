import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { listBundles } from '../actions/bundleActions';

const PersonalizedRecommendations = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const {preferences: {diet, cuisine}} = userInfo;
  const test = [diet, ...cuisine]

  const bundleList = useSelector((state) => state.bundleList);
  const { loading, error, bundles } = bundleList;

  const test2 = bundles.map(bundle => bundle.preferences.diet);
  const test3 = bundles.map(bundle => bundle.preferences.cuisine);
  console.log(test3)

  let filteredPeople = bundles.filter(function (currentElement) {
    // the current value is an object, so you can check on its properties
    return currentElement.preferences === diet;
  });
  console.log(filteredPeople)

  return (
    <>
      <Container className="mb-5">
        <h1>
          Recommendations for you according to your preferences. You can update your preferences
          here (later add link)
        </h1>
        <Row>there will be bundles</Row>
      </Container>
    </>
  );
};

export default PersonalizedRecommendations;
