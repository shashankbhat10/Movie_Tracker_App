import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link className="navbar-brand mr-auto" to="/dashboard">
          Movie Tracker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <form className="form-inline my-2 my-sm-0 d-none d-sm-block">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                <FontAwesomeIcon icon={faSearch} />
                {'  '} Search
              </button>
            </form>
            <div className="vertical"></div>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle ml-auto"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Profile{'  '}
                <FontAwesomeIcon
                  icon={faUser}
                  style={{ marginLeft: '0.5em' }}
                />
              </a>
              <div
                className="dropdown-menu dropdown-menu-right dropdown-dark"
                data-toggle="dropdown"
                aria-labelledby="navbarDropdown"
              >
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
