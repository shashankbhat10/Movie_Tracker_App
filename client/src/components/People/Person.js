import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { getPersonDetails } from '../../actions/person';
import PersonInfo from './PersonInfo';
import PersonDetails from './PersonDetails';

const Person = ({ match, getPersonDetails, details, credits, loading }) => {
  useEffect(() => {
    getPersonDetails(match.params.id);
  }, [match.params.id]);

  return (
    <Fragment>
      {!loading && (
        <div className="d-md-flex flex-row mt-2 px-2">
          <div className="person-details col-md-4 col-lg-3 mx-0">
            <PersonInfo details={details} />
          </div>
          <div className="col-md-8 col-lg-9">
            <PersonDetails details={details} credits={credits} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  details: state.person.details,
  credits: state.person.credits,
  loading: state.person.loading,
});

export default connect(mapStateToProps, { getPersonDetails })(Person);
