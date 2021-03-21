import React, { useRef, useCallback, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DashboardContentRow from './DashboardContentRow';

const DisplayDiscoverContent = ({
  loadMoreGenres,
  loading,
  remainingGenres,
  renderedGenres,
  content,
}) => {
  const observer = useRef();
  const lastDisplayed = useCallback(
    (result) => {
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && remainingGenres !== 0) {
          loadMoreGenres();
        }
      });
      if (result) {
        observer.current.observe(result);
      }
    },
    [content]
  );

  return (
    <div style={{ backgroundColor: 'grey' }}>
      {!loading &&
        content.map((singleContent, index) => {
          return (
            <div
              className="mb-3 mx-auto px-3"
              style={{ width: '95%' }}
              key={`${singleContent.type}_${singleContent.category}_${index}`}
              ref={renderedGenres + 4 === index + 1 ? lastDisplayed : null}
            >
              <h5>
                {singleContent.category === 'genre'
                  ? singleContent.name
                  : singleContent.category[0].toUpperCase() +
                    singleContent.category.slice(1)}{' '}
                {singleContent.type === 'movie' ? 'Movies' : 'TV Shows'}
              </h5>
              <DashboardContentRow
                content={singleContent}
                category={singleContent.category}
              />
            </div>
          );
        })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  movies: state.dashboard.movies,
  tv: state.dashboard.tv,
  genreContent: state.dashboard.discover,
  loading: state.dashboard.discoverLoading,
  movieGenre: state.dashboard.genres.movie,
  tvGenre: state.dashboard.genres.tv,
  gLoading: state.dashboard.genresLoading,
  content: state.dashboard.dashboard,
});

export default connect(mapStateToProps, {})(DisplayDiscoverContent);
