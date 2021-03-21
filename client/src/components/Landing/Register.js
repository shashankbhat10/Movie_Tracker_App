import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
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
import {
  faAddressBook,
  faLock,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { registerUser, clearErrors } from '../../actions/auth';

const Register = ({
  changeLoginForm,
  registerUser,
  loading,
  errors,
  clearErrors,
}) => {
  const [registerForm, updateRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const submitForm = (e) => {
    e.preventDefault();
    registerUser(registerForm);
  };

  const changeForm = () => {
    clearErrors();
    updateRegisterForm({ name: '', email: '', password: '' });
    changeLoginForm(true);
  };

  const onFormValueChange = (event, result) => {
    const { name, value } = result || event.target;

    if (value === '') {
      let formData = { ...registerForm };
      delete formData[name];

      updateRegisterForm({ ...formData });
    } else {
      updateRegisterForm({ ...registerForm, [name]: value });
    }
  };

  return (
    <Fragment>
      <Container className="mt-4" style={{ width: '45%' }}>
        <Row className="mb-2 px-2">
          <Col xs={12}>
            <h5 className="text-center">Register an Account</h5>
          </Col>
        </Row>
        {errors && errors.length !== 0 && (
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
            submitForm(e);
          }}
        >
          {loading && <Spinner />}
          <Form.Group as={Col}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faUser} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="name"
                value={registerForm.name}
                placeholder="Name"
                type="name"
                onChange={onFormValueChange}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faAddressBook} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="email"
                value={registerForm.email}
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
                value={registerForm.password}
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
              Register
            </Button>
          </Form.Group>
        </Form>
        <Row>
          <Col className="align-items-center text-center">
            <span>Already a user ?</span>{' '}
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => changeForm(false)}
            >
              <strong className="pl-2">Login</strong>
            </span>{' '}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default connect(null, { registerUser, clearErrors })(Register);
