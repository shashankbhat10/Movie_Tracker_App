import React, { useRef, useCallback, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import HomepageContentRow from './HomepageContentRow';

const DisplayHomepageContent = ({
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
    <div style={{ backgroundColor: '#090c12' }}>
      {!loading &&
        content.map((singleContent, index) => {
          return (
            <div
              className="mb-3 mx-auto px-3"
              style={{ width: '95%' }}
              key={`${singleContent.type}_${singleContent.category}_${index}`}
              ref={renderedGenres + 4 === index + 1 ? lastDisplayed : null}
            >
              <h5 style={{ color: '#c3d1d9' }} className="pl-2">
                {singleContent.category === 'genre'
                  ? singleContent.name
                  : singleContent.category[0].toUpperCase() +
                    singleContent.category.slice(1)}{' '}
                {singleContent.type === 'movie' ? 'Movies' : 'TV Shows'}
              </h5>
              <HomepageContentRow
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
  movies: state.homepage.movies,
  tv: state.homepage.tv,
  genreContent: state.homepage.discover,
  loading: state.homepage.discoverLoading,
  movieGenre: state.homepage.genres.movie,
  tvGenre: state.homepage.genres.tv,
  gLoading: state.homepage.genresLoading,
  content: state.homepage.dashboard,
});

export default connect(mapStateToProps, {})(DisplayHomepageContent);
