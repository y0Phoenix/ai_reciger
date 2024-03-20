/* eslint-disable react-refresh/only-export-components */
import { Button, Col, Container, Row } from "react-bootstrap";
import { ConnectedProps, connect } from "react-redux";
import { showLoginModal, showRegisterModal } from "../actions/modal";
import React from "react";

const connector = connect(null, { showLoginModal, showRegisterModal });

type Props = ConnectedProps<typeof connector>;

const LandingPage: React.FC<Props> = ({showLoginModal, showRegisterModal}) => {
    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <h1>Welcome to Reciger</h1>
            <p>Web based recipe management with AI recipe assistance built in</p>
            <Button variant="secondary" className="me-2" onClick={() => showRegisterModal()}>
              Register
              <i className="fa-solid fa-user-plus ms-2"></i>
            </Button>
            <Button variant="primary" onClick={() => showLoginModal()}>
              Login
              <i className="fa-solid fa-right-to-bracket ms-2"></i>
            </Button>
          </Col>
        </Row>
      </Container>
    );
};

export default connector(LandingPage);