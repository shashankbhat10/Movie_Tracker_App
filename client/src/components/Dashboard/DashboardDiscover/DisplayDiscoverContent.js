import React, { useRef, useCallback } from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faList } from '@fortawesome/free-solid-svg-icons';
import noImage from '../../../images/image-not-found.png';
import DashboardContentRow from './DashboardContentRow';

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
              className="mb-3 mx-auto px-3"
              style={{ width: '95%' }}
              key={`${singleContent.type}_${singleContent.name}_${singleContent.id}`}
              ref={renderedGenres === index + 1 ? lastDisplayed : null}
            >
              <h5>
                {singleContent.name +
                  ' ' +
                  (singleContent.type === 'movie' ? 'Movies' : 'TV Shows')}
              </h5>
              <DashboardContentRow content={singleContent} />
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
