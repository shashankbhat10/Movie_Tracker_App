import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTVDetails } from '../../actions/tv';
import { clearDashboard } from '../../actions/dashboard';
import TVHeader from './TVHeader';
import TVCast from './TVCast';
import TVWatchProviders from './TVWatchProviders';
import TVReviews from './TVReviews';
import TVMedia from './TVMedia/TVMedia';
import TVSimilar from './TVSimilar';
import TVAdditionalDetails from './TVAdditionalDetails';

const TV = ({
  match,
  getTVDetails,
  details,
  credits,
  providers,
  reviews,
  media,
  similar,
  additionalDetails,
  links,
  loading,
}) => {
  useEffect(() => {
    clearDashboard();
    getTVDetails(match.params.id);
  }, [match.params.id]);

  return (
    <Fragment>
      {!loading && (
        <div>
          <div>
            <TVHeader details={details} />
          </div>
          <div>
            <TVAdditionalDetails details={additionalDetails} links={links} />
          </div>
          <hr style={{ width: '90%' }} />
          <div>
            <TVCast cast={credits.cast} id={match.params.id} />
          </div>
          <hr style={{ width: '90%' }} />
          <div>TV Seasons</div>
          <hr style={{ width: '90%' }} />
          <div>
            <TVWatchProviders providers={providers} />
          </div>
          <hr style={{ width: '90%' }} />
          <div>
            <TVReviews reviews={reviews} />
          </div>
          <hr style={{ width: '90%' }} />
          <div>
            <TVMedia media={media} />
          </div>
          <hr style={{ width: '90%' }} />
          <div>
            <TVSimilar shows={similar} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  details: state.tv.details,
  credits: state.tv.credits,
  providers: state.tv.providers,
  loading: state.tv.loading,
  reviews: state.tv.reviews,
  media: state.tv.media,
  similar: state.tv.similar,
  additionalDetails: state.tv.additionalDetails,
  links: state.tv.links,
});
export default connect(mapStateToProps, { getTVDetails, clearDashboard })(TV);
