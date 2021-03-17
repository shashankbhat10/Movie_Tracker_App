import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import DashboardDiscover from './DashboardDiscover/DashboardDiscover';
import DashboardMovie from './DashboardMovie/DashboardMovie';
import DashboardTV from './DashboardTV/DashboardTV';
import { getGenres, getDashboardTopContent } from '../../actions/dashboard';
import { Redirect } from 'react-router-dom';
import DisplayDashboardContent from './DisplayDashboardContent';
import { selectRandomGenres } from '../../actions/dashboard';

const Dashboard = ({
  isAuthenticated,
  getGenres,
  getDashboardTopContent,
  movies,
  tv,
  genreContent,
  loading,
  movieGenre,
  tvGenre,
  genreLoading,
  discoverLoading,
  selectRandomGenres,
}) => {
  const [topContent, setTopContent] = useState([]);
  if (!isAuthenticated) {
    <Redirect to="/" />;
  }

  const loadMoreGenres = () => {
    console.log('in genre');
    selectRandomGenres(movieGenre.remaining, tvGenre.remaining);
  };

  useEffect(() => {
    getDashboardTopContent();
  }, []);

  return (
    <Fragment>
      <div style={{ backgroundColor: 'grey' }}>
        {!loading && (
          <DisplayDashboardContent
            loadMoreGenres={loadMoreGenres}
            remainingGenres={
              movieGenre.remaining.length + tvGenre.remaining.length
            }
            renderedGenres={
              movieGenre.rendered.length + tvGenre.rendered.length
            }
          />
        )}
        <hr />
        {/* <DashboardDiscover /> */}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  movies: state.dashboard.movies,
  tv: state.dashboard.tv,
  genreContent: state.dashboard.discover,
  loading: state.dashboard.loading,
  discoverLoading: state.dashboard.discoverLoading,
  movieGenre: state.dashboard.genres.movie,
  tvGenre: state.dashboard.genres.tv,
  genreLoading: state.dashboard.genresLoading,
});

export default connect(mapStateToProps, {
  getGenres,
  getDashboardTopContent,
  selectRandomGenres,
})(Dashboard);
