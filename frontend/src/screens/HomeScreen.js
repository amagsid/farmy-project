import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Bundle from '../components/Bundle';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { listLatestBundles } from '../actions/bundleActions';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const bundleLatest = useSelector((state) => state.bundleLatest);
  const { loading, error, bundles } = bundleLatest;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listLatestBundles());
  }, [dispatch]);

  // Commented code below for next week's ticket!

  // const keyword = match.params.keyword;

  // const pageNumber = match.params.pageNumber || 1;

  // const dispatch = useDispatch();

  // const bundleList = useSelector((state) => state.bundleList);
  // const { loading, error, bundles, page, pages } = bundleList;

  // useEffect(() => {
  //   dispatch(listBundles(keyword, pageNumber));
  // }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
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
