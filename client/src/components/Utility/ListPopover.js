import React, { Fragment, useEffect, useRef, useState } from 'react';
import {
  Overlay,
  Popover,
  OverlayTrigger,
  Dropdown,
  DropdownButton,
  Button,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faList,
  faPlus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

const ListPopover = ({
  item,
  itemType,
  open,
  close,
  addToWatchlist,
  watchlist,
}) => {
  const [watchlistContent, updateWatchlist] = useState([]);
  const [show, setShow] = useState(false);
  const target = useRef(null);

  useEffect(() => {
    if (itemType === 'movie') {
      updateWatchlist(watchlist.movie);
    } else {
      updateWatchlist(watchlist.tv);
    }
  }, [watchlist]);

  return (
    <Fragment>
      <OverlayTrigger
        trigger="click"
        target={target.current}
        key={`overylay_${item.id}_${itemType}`}
        placement="bottom"
        onExit={() => {
          console.log('popover close');
          close(item.id);
        }}
        onEnter={() => {
          console.log('popover open');
          open(item.id);
        }}
        flip
        overlay={
          <Popover id={`popover-positioned-${item.id}-${itemType}`}>
            <Popover.Title>Add to Lists</Popover.Title>
            <Popover.Content className="d-flex flex-row py-1 align-items-center">
              <span style={{ fontSize: '1.2em' }}>Watchlist</span>
              <Button
                variant={
                  watchlistContent.includes(item.id) ? 'danger' : 'success'
                }
                size="sm"
                className="ml-auto"
                onClick={() =>
                  addToWatchlist(
                    watchlist.id,
                    item,
                    watchlistContent.includes(item.id) ? 'remove' : 'add'
                  )
                }
              >
                <FontAwesomeIcon
                  icon={watchlistContent.includes(item.id) ? faTimes : faCheck}
                />
              </Button>
            </Popover.Content>
            <hr className="my-1" />
            <Popover.Content className="d-flex flex-row py-1">
              <DropdownButton
                // style={{ width: '85%' }}
                size="sm"
                className="mx-0 px-0 w-auto"
                id="dropdown-basic-button"
                title="Dropdown button"
              >
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>
              <Button size="sm" className="ml-auto">
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Popover.Content>
            <Popover.Content>
              <strong>Holy guacamole!</strong> Check this info.
            </Popover.Content>
          </Popover>
        }
        rootClose
      >
        <div
          className={`align-items-center ${
            watchlistContent.includes(item.id) && 'list-icon'
          }`}
        >
          <FontAwesomeIcon
            ref={target}
            icon={faList}
            className="content-options"
            onClick={() => {
              console.log('IN');
              setShow(!show);
            }}
          />
        </div>
      </OverlayTrigger>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  watchlist: state.profile.watchlist,
});

export default connect(mapStateToProps)(ListPopover);
