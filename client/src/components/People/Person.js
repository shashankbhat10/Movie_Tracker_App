import React, { useEffect } from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import { getPersonDetails } from "../../actions/person";
import PersonInfo from "./PersonInfo";
import PersonDetails from "./PersonDetails";
import Spinner from "../Utility/Spinner";

const Person = ({ match, getPersonDetails, details, credits, loading }) => {
  useEffect(() => {
    getPersonDetails(match.params.id);
    // eslint-disable-next-line
  }, [match.params.id]);

  return (
    <Fragment>
      {loading ? (
        <div className='poster-spinner'>
          <Spinner />
        </div>
      ) : (
        <div className='d-md-flex flex-row pt-2 px-2' style={{ backgroundColor: "#090c12" }}>
          <div className='person-details col-12 col-md-4 col-lg-3 mx-0 px-0 mb-3 mb-md-0'>
            <PersonInfo details={details} />
          </div>
          <div className='col-12 col-md-8 col-lg-9'>
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
