import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReactGA from 'react-ga';
import env from 'react-dotenv';

const Footer = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize(env.GUA_ID);
    let pagePath = location.search ? location.pathname + location.search : location.pathname;
    ReactGA.pageview(`${pagePath}`);
  }, [location]);

  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; Farmy</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
