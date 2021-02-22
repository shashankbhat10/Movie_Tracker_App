import React, { useRef, useCallback } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import noImage from '../../../images/noImageHorizontal.jpg';

const DisplayDiscoverContent = ({
  loadMoreGenres,
  content,
  loading,
  remainingGenres,
  renderedGenres,
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
    <div>
      {!loading &&
        content.map((singleContent, index) => {
          return (
            <div
              className="my-2 mx-auto px-3"
              style={{ width: '95%' }}
              key={`${singleContent.type}_${singleContent.name}_${singleContent.id}`}
              ref={renderedGenres === index + 1 ? lastDisplayed : null}
            >
              <h5>
                {singleContent.name +
                  ' ' +
                  (singleContent.type === 'movie' ? 'Movies' : 'TV Shows')}
              </h5>
              <div
                className="d-flex flex-row flex-nowrap"
                style={{ overflowX: 'auto' }}
              >
                {singleContent.list.map((movie, index) => {
                  return (
                    <div
                      key={`dashboard_genre_${singleContent.name}_${movie.id}`}
                      style={{
                        width: '25%',
                        height: 'auto',
                        minWidth: '300px',
                      }}
                    >
                      <Card>
                        <Link
                          to={
                            singleContent.type === 'movie'
                              ? `/movie/${movie.id}`
                              : `/tv/${movie.id}`
                          }
                          style={{ textDecoration: 'none' }}
                        >
                          <Card.Img
                            src={
                              movie.backdrop_path === null
                                ? noImage
                                : `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
                            }
                          />
                          <Card.Title
                            className="my-1"
                            style={{ fontSize: '1em' }}
                          >
                            {singleContent.type === 'movie'
                              ? movie.title
                              : movie.name}
                          </Card.Title>
                        </Link>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  content: state.dashboard.discover,
  loading: state.dashboard.discoverLoading,
});

export default connect(mapStateToProps, {})(DisplayDiscoverContent);
