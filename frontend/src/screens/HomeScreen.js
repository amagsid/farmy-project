import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
// import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import Filter from "../components/Filter"
import { listBundles, listLatestBundles } from '../actions/bundleActions';
import Bundle from '../components/Bundle';


const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();

  const bundleLatest = useSelector((state) => state.bundleLatest);
  const { loading, error, bundles } = bundleLatest;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listLatestBundles());
  }, [dispatch]);

  // Commented code below for next week's ticket!

  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  // const dispatch = useDispatch();

  // const bundleList = useSelector((state) => state.bundleList);
  // const { loading, error, bundles, page, pages } = bundleList;

  // useEffect(() => {
  //   dispatch(listBundles(keyword, pageNumber));
  // }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {/* <Filter keyword={keyword} pageNumber={pageNumber} /> */}
      {/* {!keyword ? <h1>Latest Bundles</h1> : <h1>Search Results for "{keyword}"</h1>} */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {!bundles.length && <Message variant="primary">Nothing found</Message>}
          {userInfo && (
            <>
              <Message variant="success">Welcome {userInfo.name}!</Message>
              <h1>Latest Bundles</h1>
              <Row>
                {bundles.map((bundle) => (
                  <Col key={bundle._id}>
                    <Bundle bundle={bundle} />
                  </Col>
                ))}
              </Row>
            </>
          )}
          <h2>Home Page For New User</h2>

          {/* <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} /> */}
        </>
      )}
    </>
  );
};

export default HomeScreen;
