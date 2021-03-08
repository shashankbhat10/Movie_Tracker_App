import React, { useState } from 'react';
import { connect } from 'react-redux';
import { clearErrors, loginUser } from '../../actions/auth';
import { Fragment } from 'react';
import {
  Container,
  Col,
  Row,
  Form,
  InputGroup,
  FormControl,
  Button,
  Spinner,
  Alert,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faLock } from '@fortawesome/free-solid-svg-icons';

const Login = ({
  changeLoginForm,
  loginUser,
  loading,
  errors,
  clearErrors,
}) => {
  const [loginForm, updateLoginForm] = useState({
    email: '',
    password: '',
  });

  const submitLogin = (e) => {
    e.preventDefault();
    loginUser(loginForm);
  };

  const changeForm = () => {
    clearErrors();
    updateLoginForm({ email: '', password: '' });
    changeLoginForm(false);
  };

  const onFormValueChange = (event, result) => {
    const { name, value } = result || event.target;

    if (value === '') {
      let formData = { ...loginForm };
      delete formData[name];

      updateLoginForm({ ...formData });
    } else {
      updateLoginForm({ ...loginForm, [name]: value });
    }
  };

  return (
    <Fragment>
      <Container className="mt-4" style={{ width: '45%' }}>
        <Row className="mb-2 px-2">
          <Col xs={12}>
            <h5 className="text-center">Login to Account</h5>
          </Col>
        </Row>
        {errors.length !== 0 && (
          <Row>
            {errors.map((error, index) => {
              return (
                <Col xs={12} className="px-4">
                  <Alert
                    key={`error_${index}`}
                    variant="danger"
                    className="py-1"
                  >
                    {error}
                  </Alert>
                </Col>
              );
            })}
          </Row>
        )}
        <Form
          onSubmit={(e) => {
            submitLogin(e);
          }}
        >
          {loading && <Spinner />}
          <Form.Group as={Col}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faAddressBook} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="email"
                value={loginForm.email}
                placeholder="Email"
                type="email"
                onChange={onFormValueChange}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faLock} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="password"
                value={loginForm.password}
                placeholder="Password"
                type="password"
                onChange={onFormValueChange}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col}>
            <Button className="btn-block mt-4 align-items-center" type="submit">
              {loading && (
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="mr-2"
                />
              )}
              Login
            </Button>
          </Form.Group>
        </Form>
        <Row>
          <Col className="align-items-center text-center">
            <span>New User ?</span>{' '}
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => changeForm(false)}
            >
              <strong className="pl-2">Register</strong>
            </span>{' '}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default connect(null, { loginUser, clearErrors })(Login);
