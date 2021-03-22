import React, { useRef, Fragment, useState, useEffect } from 'react';
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faStar } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

const Rating = ({ item, itemType, open, close, ratings, handleRating }) => {
  const target = useRef(null);
  const [show, setShow] = useState(false);
  const [hoverIndex, updateHoverIndex] = useState(-1);
  const [contentRating, updateRating] = useState(0);
  const [isRated, updateRatingFlag] = useState(false);

  useEffect(() => {
    if (ratings[itemType].map((item) => item.id).includes(item.id)) {
      updateRatingFlag(true);
      updateRating(ratings[itemType].filter((i) => i.id === item.id)[0].rating);
    }
    // if (!ratings[itemType].map((item) => item.id).includes(item.id)) {
    else {
      updateRatingFlag(false);
      updateRating(0);
    }
  }, [ratings]);

  return (
    <Fragment>
      <OverlayTrigger
        trigger="click"
        target={target.current}
        key={`overylay_${item.id}_${itemType}`}
        placement="bottom"
        onExit={() => {
          close(item.id);
        }}
        onEnter={() => {
          open(item.id);
        }}
        flip
        overlay={
          <Popover id={`popover-positioned-${item.id}-${itemType}`}>
            <Popover.Title className="d-flex flex-row align-items-center justify-content-between py-1">
              <span>Add Rating</span>
              <Button size="sm" className="px-2 py-0" variant="danger">
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={() => {
                    handleRating(item, 'remove');
                  }}
                />
              </Button>
            </Popover.Title>
            <Popover.Content className="d-flex flex-row py-1 align-items-center">
              <div className="d-flex flex-row py-1">
                {[...Array(10).keys()].map((index) => {
                  return (
                    <span
                      className="px-1"
                      onMouseEnter={() => updateHoverIndex(index)}
                      onMouseLeave={() => updateHoverIndex(-1)}
                    >
                      <FontAwesomeIcon
                        icon={faStar}
                        style={{
                          cursor: 'pointer',
                          color: isRated
                            ? hoverIndex > -1
                              ? hoverIndex < contentRating - 1
                                ? index <= hoverIndex
                                  ? 'red'
                                  : index <= contentRating - 1 && 'goldenrod'
                                : hoverIndex > contentRating - 1
                                ? index > contentRating - 1 &&
                                  index <= hoverIndex
                                  ? 'green'
                                  : index <= contentRating - 1 && 'goldenrod'
                                : index <= hoverIndex && 'goldenrod'
                              : index <= contentRating - 1 && 'goldenrod'
                            : index <= hoverIndex && 'goldenrod',
                          transition: 'color 0.3s ease-in-out',
                        }}
                        onClick={() =>
                          handleRating(
                            item,
                            isRated ? 'update' : 'add',
                            index + 1
                          )
                        }
                      />
                    </span>
                  );
                })}
              </div>
            </Popover.Content>
          </Popover>
        }
        rootClose
      >
        <div className="align-items-center">
          <FontAwesomeIcon
            ref={target}
            icon={faStar}
            style={{
              color: isRated && 'goldenrod',
            }}
            className="content-options"
            onClick={() => {
              setShow(!show);
            }}
          />
        </div>
      </OverlayTrigger>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  ratings: state.profile.ratings,
});

export default connect(mapStateToProps)(Rating);
