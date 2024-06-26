import React, { Fragment, useEffect, useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from "../../actions/auth";
import { Navbar, Nav, NavDropdown, Form, Button, Row, Col } from "react-bootstrap";

const NavbarComp = ({ history, logoutUser, isAuthenticated }) => {
  const [searchText, updateSearchText] = useState("");

  const submitSearch = (e) => {
    e.preventDefault();
    history.push({
      pathname: "/search",
      search: `?query=${searchText}`,
    });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      history.push({ pathname: "/" });
    }
  }, [isAuthenticated, history]);

  return (
    <Fragment>
      {isAuthenticated && (
        // <nav
        //   className='navbar navbar-expand-sm navbar-dark w-100'
        //   // navbar-dark bg-dark
        //   style={{
        //     backgroundColor: "#16161d",
        //     position: "sticky",
        //     top: "0",
        //     left: "0",
        //     height: "7vh",
        //     zIndex: "100",
        //   }}>
        //   <Link className='navbar-brand mr-auto' to='/homepage'>
        //     Movie Tracker
        //   </Link>
        //   <button
        //     className='navbar-toggler'
        //     type='button'
        //     data-toggle='collapse'
        //     data-target='#navbarSupportedContent'
        //     aria-controls='navbarSupportedContent'
        //     aria-expanded='false'
        //     aria-label='Toggle navigation'>
        //     <span className='navbar-toggler-icon'> </span>
        //   </button>
        //   <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        //     <ul className='navbar-nav ml-auto'>
        //       <form className='form-inline my-2 my-sm-0 d-none d-sm-block' onSubmit={(e) => submitSearch(e)}>
        //         <input
        //           className='form-control mr-sm-2'
        //           type='search'
        //           placeholder='Search'
        //           aria-label='Search'
        //           value={searchText}
        //           onChange={(e) => updateSearchText(e.target.value)}
        //         />
        //         <button className='btn btn-outline-success my-2 my-sm-0' type='submit'>
        //           <FontAwesomeIcon icon={faSearch} /> {"  "}
        //           Search
        //         </button>
        //       </form>
        //       <div className='vertical'> </div>
        //       <li className='nav-item dropdown'>
        //         {/* eslint-disable-next-line */}
        //         <a
        //           className='nav-link dropdown-toggle ml-auto'
        //           href='#'
        //           id='navbarDropdown'
        //           role='button'
        //           data-toggle='dropdown'
        //           aria-haspopup='true'
        //           aria-expanded='false'>
        //           Profile
        //           <FontAwesomeIcon icon={faUser} style={{ marginLeft: "0.5em" }} />
        //         </a>
        //         <div
        //           className='dropdown-menu dropdown-menu-right dropdown-dark'
        //           data-toggle='dropdown'
        //           aria-labelledby='navbarDropdown'>
        //           <Link className='dropdown-item' to='/dashboard'>
        //             Dashboard
        //           </Link>
        //           {/* <a
        //             className='dropdown-item'
        //             href='#'
        //             onClick={() => {
        //               console.log("CLICK");
        //               history.push({ pathname: "/dashboard" });
        //             }}>
        //             Dashboard
        //           </a> */}
        //           <a
        //             className='dropdown-item'
        //             href='#'
        //             onClick={(e) => {
        //               console.log("CLicked Here");
        //             }}>
        //             Another action
        //           </a>
        //           <div className='dropdown-divider'> </div>
        //           {/* eslint-disable-next-line */}
        //           <a className='dropdown-item' href='#' onClick={() => logoutUser()}>
        //             Logout
        //           </a>
        //         </div>
        //       </li>
        //     </ul>
        //   </div>
        // </nav>
        <Navbar bg='dark' expand='sm' className='w-100 show' sticky='top'>
          <Navbar.Brand as={Link} to='/homepage' className='text-white'>
            Content Tracker
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Form inline className='w-100 mt-2 mt-sm-0 mr-sm-3 ml-auto' onSubmit={(e) => submitSearch(e)}>
              <Row className='ml-auto w-100 mr-4'>
                <Col xs={9} sm={{ span: 4, offset: 7 }} className='pl-2'>
                  <Form.Control
                    type='text'
                    placeholder='Search'
                    value={searchText}
                    onChange={(e) => updateSearchText(e.target.value)}
                    className='w-100 w-sm-75 mr-2 mr-sm-0 float-right ml-auto'
                  />
                </Col>
                <Col xs={3} sm={1} className='ml-auto px-0'>
                  <Button type='submit' variant='outline-success' className='ml-auto'>
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
            <Nav style={{ marginLeft: "auto", width: "fit-content" }} className='d-none d-sm-block'>
              {/* <Nav.Link href='#home'>Home</Nav.Link> */}
              {/* <Nav.Link href='#link'>Link</Nav.Link> */}
              <NavDropdown
                as='div'
                title={
                  <div className='flex flex-row text-white mr-2'>
                    {/* <span>Profile</span> */}
                    <FontAwesomeIcon icon={faUser} size='lg' />
                  </div>
                }
                id='basic-nav-dropdown'
                style={{ color: "white" }}
                className='text-white'
                alignRight='false'>
                <NavDropdown.Item as={Link} to='/dashboard'>
                  Dashboard
                </NavDropdown.Item>
                {/* <NavDropdown.Item href='#action/3.2'>Another action</NavDropdown.Item>
                <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item> */}
                <NavDropdown.Divider />
                <NavDropdown.Item href='#action/3.4'>
                  <FontAwesomeIcon icon={faSignOutAlt} size='lg' color='red' />
                  <span className='ml-2'>Logout</span>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {/* <Link className="" to="/dashboard">Dashboard</Link> */}
            <Nav.Item
              as={Link}
              data-toggle='collapse'
              className='d-block d-sm-none mt-2 mt-sm-0'
              style={{ paddingLeft: 0, color: "white" }}
              to='/dashboard'>
              Dashboard
            </Nav.Item>
            <NavDropdown.Divider />
            <Nav.Item
              data-toggle='collapse'
              className='d-block d-sm-none flex mb-2'
              style={{ paddingBottom: 1, color: "white" }}>
              <FontAwesomeIcon icon={faSignOutAlt} size='lg' color='red' />
              <span className='ml-2'>Logout</span>
            </Nav.Item>
          </Navbar.Collapse>
        </Navbar>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default compose(withRouter, connect(mapStateToProps, { logoutUser }))(NavbarComp);
