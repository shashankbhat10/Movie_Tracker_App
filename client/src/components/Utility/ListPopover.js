import React, { Fragment, useEffect, useRef, useState } from 'react';
import {
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
import { addContentToList } from '../../actions/profile';

const ListPopover = ({
  item,
  itemType,
  open,
  close,
  addToWatchlist,
  watchlist,
  customLists,
  addContentToList,
}) => {
  const [watchlistContent, updateWatchlist] = useState([]);
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [selectedList, updateSelectedList] = useState(null);

  useEffect(() => {
    if (itemType === 'movie') {
      updateWatchlist(watchlist.movie);
    } else {
      updateWatchlist(watchlist.tv);
    }
    // close(item.id);
  }, [watchlist]);

  useEffect(() => {
    if (customLists.length > 0) {
      updateSelectedList(customLists[0]);
    }
  }, [customLists]);

  const changeCustomList = (item) => {
    updateSelectedList(item);
  };

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
            <Popover.Title className="d-flex flex-row align-items-center justify-content-between pr-3">
              <span>Add to Lists</span>
              <span>
                <FontAwesomeIcon icon={faPlus} />
              </span>
            </Popover.Title>
            <Popover.Content className="d-flex flex-row py-1 align-items-center">
              <span style={{ fontSize: '1.2em' }}>Watchlist</span>
              <Button
                variant={
                  watchlistContent.includes(item.id) ? 'danger' : 'success'
                }
                size="sm"
                className="ml-auto"
                onClick={() => {
                  addToWatchlist(
                    watchlist.listId,
                    item,
                    watchlistContent.includes(item.id) ? 'remove' : 'add'
                  );
                  close(item.id);
                }}
              >
                <FontAwesomeIcon
                  icon={watchlistContent.includes(item.id) ? faTimes : faCheck}
                />
              </Button>
            </Popover.Content>
            <hr className="my-1" />
            <Popover.Content className="d-flex flex-row py-1 pb-2">
              {customLists.length !== 0 && selectedList && (
                <DropdownButton
                  // style={{ width: '85%' }}
                  size="sm"
                  className="mr-3 px-0 w-auto"
                  id="dropdown-basic-button"
                  title={selectedList.name}
                >
                  {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item> */}
                  {customLists.map((list, index) => {
                    return (
                      <Dropdown.Item
                        value={list.name}
                        key={`list_dropdown_${list.listId}`}
                        onClick={() => changeCustomList(list)}
                      >
                        {list.name}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
              )}
              {customLists.length === 0 && <span>No Custom Lists</span>}
              <Button
                size="sm"
                className="ml-auto"
                disabled={customLists.length === 0}
                onClick={() => {
                  addContentToList(
                    selectedList.listId,
                    selectedList.type,
                    itemType,
                    item
                  );
                  close(item.id);
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
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
  customLists: state.profile.customLists,
});

export default connect(mapStateToProps, { addContentToList })(ListPopover);
