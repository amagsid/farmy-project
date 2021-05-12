import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup, FormControl, Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

const Filter = ({ keyword, pageNumber }) => {
  const dispatch = useDispatch();

  const initialRating = 0;
  const initialSort = '';
  const initialMinPrice = '';
  const initialMaxPrice = '';
  const initialCategory = '';

  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [rating, setRating] = useState(initialRating);
  const [category, setCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState(initialSort);
  const [formSubmit, setFormSubmit] = useState(false);

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, minPrice, maxPrice, rating, category, sortBy));
    // eslint-disable-next-line
  }, [dispatch, keyword, pageNumber, formSubmit]);

  // categories will be changed, once we have data
  const categoriesArray = ['All', 'Electronics', 'Vegetables', 'Fruits'];
  const ratingsArray = ['Any rating', 1, 2, 3, 4, 5];

  const submitHandler = (e) => {
    e.preventDefault();
    setFormSubmit((currentState) => !currentState);
  };

  const clearFilterHandler = () => {
    setMinPrice(initialMinPrice);
    setMaxPrice(initialMaxPrice);
    setRating(initialRating);
    setCategory(initialCategory);
    setSortBy(initialSort);
  };

  return (
    <>
      <Form onSubmit={submitHandler} className="justify-content-md-center">
        {/*select menus */}
        <Row>
          <Col sm={12} md={6} lg={6} xl={3}>
            <Form.Group controlId="category">
              <Form.Control
                as="select"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                {categoriesArray.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col sm={12} md={6} lg={6} xl={3}>
            <Form.Group controlId="rating">
              <Form.Control
                as="select"
                onChange={(e) => setRating(Number(e.target.value))}
                value={rating}
              >
                {ratingsArray.map((ratingOption) => (
                  <option key={ratingOption} value={ratingOption}>
                    {ratingOption}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          {/* price inputs */}
          <Col sm={12} md={6} lg={6} xl={3}>
            <InputGroup>
              <InputGroup.Append>
                <InputGroup.Text id="min-price">Min price</InputGroup.Text>
              </InputGroup.Append>
              <FormControl
                placeholder="Min price"
                type="number"
                min="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col sm={12} md={6} lg={6} xl={3}>
            <InputGroup>
              <InputGroup.Append>
                <InputGroup.Text id="max-price">Max price</InputGroup.Text>
              </InputGroup.Append>
              <FormControl
                placeholder="Max price"
                type="number"
                min="0"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>
        {/* checkboxes for sorting */}
        <Row className="mx-auto my-2">
          <Col xs={6} sm={6} md={6} lg={6} xl={3}>
            <Form.Group controlId="high-price-order">
              <Form.Check
                onChange={() => setSortBy('highestPrice')}
                // boxes will be checked only when statement is true, needed for filter clearing
                checked={sortBy === 'highestPrice'}
                type="radio"
                name="sort"
                label="Highest Price"
              />
            </Form.Group>
          </Col>
          <Col xs={6} sm={6} md={6} lg={6} xl={3}>
            <Form.Group controlId="low-price-order">
              <Form.Check
                onChange={() => setSortBy('lowestPrice')}
                checked={sortBy === 'lowestPrice'}
                type="radio"
                name="sort"
                label="Lowest Price"
              />
            </Form.Group>
          </Col>
          <Col xs={6} sm={6} md={6} lg={6} xl={3}>
            <Form.Group controlId="order-by-rating">
              <Form.Check
                onChange={() => setSortBy('rating')}
                checked={sortBy === 'rating'}
                type="radio"
                name="sort"
                label="Highest Rating"
              />
            </Form.Group>
          </Col>
          <Col xs={6} sm={6} md={6} lg={6} xl={3}>
            <Form.Group controlId="order-by-newest">
              <Form.Check
                onChange={() => setSortBy('newest')}
                checked={sortBy === 'newest'}
                type="radio"
                name="sort"
                label="Newest"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          {/* for pushing buttons to the right side */}
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col>
            <Button type="submit" className="p-2 btn btn-outline-success">
              Filter Bundles
            </Button>
          </Col>
          <Col>
            <Button
              onClick={clearFilterHandler}
              type="submit"
              className="p-2 btn btn-outline-success"
            >
              Clear Filter
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Filter;
