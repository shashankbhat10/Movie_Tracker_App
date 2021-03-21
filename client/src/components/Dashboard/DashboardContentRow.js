import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faList } from '@fortawesome/free-solid-svg-icons';
import {
  addContentToList,
  addContentToWatched,
  removeContentFromWatched,
  removeContentFromList,
} from '../../actions/profile';
import noImage from '../../images/image-not-found.png';
import ListPopover from '../Utility/ListPopover';

const DashboardContentRow = ({
  content,
  category,
  watched,
  addContentToWatched,
  removeContentFromWatched,
  addContentToList,
  removeContentFromList,
}) => {
  const [type, setType] = useState('movie');
  const [contentList, setContentList] = useState([]);
  const [watchedContent, setWatchedContent] = useState([]);
  const [activeId, updateActiveId] = useState('');
  const [popoverId, updatePopoverId] = useState('');
  const refEl = useRef(null);

  useEffect(() => {
    console.log('in other');
    setType(content.type);
    setContentList(content.list);
    if (content.type === 'movie') {
      setWatchedContent(watched.movie);
    } else {
      setWatchedContent(watched.tv);
    }
  }, []);

  useEffect(() => {
    console.log('IN watched');
    console.log('watched', watched);
    if (content.type === 'movie') {
      setWatchedContent(watched.movie);
    } else {
      setWatchedContent(watched.tv);
    }
  }, [watched]);

  const handleWatchedClick = (type, item) => {
    item.type = type;
    if (watchedContent.includes(item.id)) {
      console.log('in remove');
      removeContentFromWatched(item);
    } else {
      addContentToWatched(item);
    }
  };

  const addHoverClass = (id) => {
    updateActiveId(id);
  };

  const removeHoverClass = () => {
    updateActiveId('');
    console.log('remove hover');
  };

  const popoverOpen = (id) => {
    updatePopoverId(id);
  };

  const popoverClose = (id) => {
    updatePopoverId('');
  };

  const addToWatchlist = (listId, item, action) => {
    // console.log(item);
    console.log(action);
    if (action === 'add') {
      addContentToList(listId, type, item);
    } else {
      removeContentFromList(listId, type, item);
    }
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
            <div
              className="dashboard-content"
              onMouseOver={() => {
                addHoverClass(item.id);
              }}
              onMouseLeave={() => {
                removeHoverClass(item.id);
              }}
              id={`${item.id}_${type === 'movie' ? item.title : item.name}_${
                category === 'genre'
                  ? content.name.toLowerCase()
                  : content.category
              }`}
            >
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
              <div
                className="d-flex flex-row dashboard-options px-4 py-2 justify-content-between align-items-center"
                ref={refEl}
                style={{
                  transform:
                    activeId === item.id || popoverId === item.id
                      ? 'translateY(0%)'
                      : 'translateY(100%)',
                }}
              >
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
                      onClick={() => handleWatchedClick(type, item)}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </div>
                  </OverlayTrigger>
                </div>
                <div className="dashboard-icons">
                  <ListPopover
                    item={item}
                    itemType={type}
                    open={popoverOpen}
                    close={popoverClose}
                    addToWatchlist={addToWatchlist}
                  />
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
                {item.title}
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

export default connect(mapStateToProps, {
  addContentToWatched,
  removeContentFromWatched,
  addContentToList,
  removeContentFromList,
})(DashboardContentRow);
