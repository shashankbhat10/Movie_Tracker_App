import React, { Fragment, useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { logoutUser } from '../../actions/auth';

const Navbar = ({ history, logoutUser, isAuthenticated }) => {
  const [searchText, updateSearchText] = useState('');

  const submitSearch = (e) => {
    e.preventDefault();
    history.push({ pathname: '/search', search: `?query=${searchText}` });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      history.push({ pathname: '/' });
    }
  }, [isAuthenticated]);

  return (
    <Fragment>
      {console.log('isAuthenticated', isAuthenticated)}
      {isAuthenticated && (
        <nav
          className="navbar navbar-expand-sm navbar-dark w-100"
          // navbar-dark bg-dark
          style={{
            backgroundColor: '#16161d',
            position: 'sticky',
            top: '0',
            left: '0',
            height: '7vh',
            zIndex: '100',
          }}
        >
          <Link className="navbar-brand mr-auto" to="/homepage">
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
              <form
                className="form-inline my-2 my-sm-0 d-none d-sm-block"
                onSubmit={(e) => submitSearch(e)}
              >
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchText}
                  onChange={(e) => updateSearchText(e.target.value)}
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
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => history.push({ pathname: '/dashboard' })}
                  >
                    Dashboard
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <div className="dropdown-divider"></div>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => logoutUser()}
                  >
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default compose(
  withRouter,
  connect(mapStateToProps, { logoutUser })
)(Navbar);
