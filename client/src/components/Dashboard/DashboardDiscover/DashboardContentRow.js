import React, { Fragment, useEffect, useState } from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faCheck } from '@fortawesome/free-solid-svg-icons';
import noImage from '../../../images/image-not-found.png';
import { connect } from 'react-redux';
import { addContentToWatched } from '../../../actions/profile';

const DashboardContentRow = ({ content, watched, addContentToWatched }) => {
  const [type, setType] = useState('movie');
  const [contentList, setContentList] = useState([]);
  const [watchedContent, setWatchedContent] = useState([]);

  useEffect(() => {
    setType(content.type);
    setContentList(content.list);
    if (content.type === 'movie') {
      setWatchedContent(watched.movie);
    } else {
      setWatchedContent(watched.tv);
    }
  }, []);

  useEffect(() => {
    if (content.type === 'movie') {
      setWatchedContent(watched.movie);
    } else {
      setWatchedContent(watched.tv);
    }
  }, [watched]);

  const addToWatched = (type, item) => {
    item.type = type;
    addContentToWatched(item);
  };

  return (
    <div className="d-flex flex-row flex-nowrap" style={{ overflowX: 'auto' }}>
      {contentList.map((item, index) => {
        return (
          <Card
            key={`dashboard_genre_${content.name}_${item.id}`}
            className="bg-transparent col-4 px-0"
            style={{
              minWidth: '250px',
              maxWidth: '350px',
              border: '0px',
            }}
          >
            <div className="dashboard-content">
              <Link
                to={type === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`}
                style={{ textDecoration: 'none' }}
              >
                <Card.Img
                  src={
                    item.backdrop_path === null
                      ? noImage
                      : `https://image.tmdb.org/t/p/w780${item.backdrop_path}`
                  }
                />
              </Link>
              <div className="d-flex flex-row dashboard-options px-4 py-2 justify-content-between align-items-center">
                <div>
                  <OverlayTrigger
                    key={`tooltip_dashboard_content_options_${item.id}_watchlist`}
                    placement="bottom"
                    overlay={
                      <Tooltip id={`content_${item.id}_${index}_watchlist`}>
                        {watchedContent.includes(item.id)
                          ? 'Movie Watched'
                          : 'Add to Watched'}
                      </Tooltip>
                    }
                  >
                    <div
                      className={`dashboard-icons ${
                        watchedContent.includes(item.id) && 'icon-border'
                      }`}
                      onClick={() => addToWatched(content.type, item)}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </div>
                  </OverlayTrigger>
                </div>
                <div className="dashboard-icons">
                  <OverlayTrigger
                    key={`tooltip_dashboard_content_options_${item.id}_watchlist`}
                    placement="bottom"
                    overlay={
                      <Tooltip id={`content_${item.id}_${index}_watchlist`}>
                        Add to Watchlist
                      </Tooltip>
                    }
                  >
                    <FontAwesomeIcon
                      icon={faList}
                      className="content-options"
                      onClick={() => {
                        console.log('IN');
                      }}
                    />
                  </OverlayTrigger>
                </div>
              </div>
            </div>
            <Link
              to={type === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`}
              style={{ textDecoration: 'none' }}
            >
              <Card.Title
                className="my-1 pl-1"
                style={{ fontSize: '1em', color: 'black' }}
              >
                {type === 'movie' ? item.title : item.name}
              </Card.Title>
            </Link>
          </Card>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  watched: state.profile.watched,
});

export default connect(mapStateToProps, { addContentToWatched })(
  DashboardContentRow
);
