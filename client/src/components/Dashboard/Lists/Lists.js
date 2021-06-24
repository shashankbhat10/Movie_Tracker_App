import React, { Fragment, useState, useRef, useEffect } from 'react';
import {
  Container,
  Dropdown,
  DropdownButton,
  Form,
  OverlayTrigger,
  Popover,
  Button,
  Card,
  Row,
  Col,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { createList } from '../../../actions/profile';
import { getListData } from '../../../actions/dashboard';
import noImage from '../../../images/download.png';
import { Link } from 'react-router-dom';
import Rating from '../../Utility/Rating';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

const Lists = ({
  createList,
  watchlist,
  customLists,
  getListData,
  listContent,
}) => {
  const [selectedList, updateSelectedList] = useState(null);
  const [content, updateContent] = useState([]);
  const [lists, updateLists] = useState([]);
  const target = useRef(null);
  const [newListName, updateNewListName] = useState('');
  const [activeId, updateActiveId] = useState('');

  const updateListName = (event, result) => {
    const { value } = result || event.target;
    updateNewListName(value);
  };

  const changeList = (id) => {
    const list = lists.filter((item) => item.listId === id)[0];
    getListData(list.listId);
    updateSelectedList(list);
  };

  useEffect(() => {
    let list = [
      { listId: watchlist.listId, type: watchlist.type, name: 'Watchlist' },
    ];
    console.log(list);
    if (customLists.length !== 0) {
      Array.prototype.push.apply(list, customLists);
    }
    updateLists(list);
    updateSelectedList(list[0]);
    getListData(list[0].listId);
  }, []);

  useEffect(() => {
    updateContent(listContent);
  }, [listContent]);

  useEffect(() => {
    let list = [
      { listId: watchlist.listId, type: watchlist.type, name: 'Watchlist' },
    ];
    if (customLists.length !== 0) {
      Array.prototype.push.apply(list, customLists);
    }
    updateLists(list);
  }, [customLists]);

  return (
    <Fragment>
      <Container className="px-0" fluid>
        <div
          className="d-flex flex-row flex-wrap mb-2 align-items-center py-1 px-3 mx-0"
          style={{
            position: 'sticky',
            top: '7vh',
            zIndex: '50',
            borderBottom: '2px solid #30363d',
            background: 'black',
          }}
        >
          <h3 className="px-2 my-0" style={{ color: '#c3d1d9' }}>
            My Lists
          </h3>
          {lists && selectedList && (
            <DropdownButton
              variant="secondary"
              title={selectedList.name}
              onSelect={changeList}
              className="ml-4"
            >
              {lists.map((item, index) => {
                return (
                  <div key={`dropdown_list_${index}`}>
                    <Dropdown.Item value={item.name} eventKey={item.listId}>
                      {item.name}
                    </Dropdown.Item>
                    {item.type === 'watchlist' && (
                      <Dropdown.Divider className="my-1" />
                    )}
                  </div>
                );
              })}
            </DropdownButton>
          )}

          <div className="pb-1 ml-auto" style={{ color: '#c3d1d9' }}>
            <OverlayTrigger
              // trigger="click"
              // target={target.current}
              placement="bottom"
              // onExit={() => {
              //   close(item.id);
              // }}
              // onEnter={() => {
              //   open(item.id);
              // }}
              flip
              overlay={
                <Popover id={`popover-positioned`}>
                  <Popover.Content className="d-flex flex-row py-1 px-2 align-items-center justify-content-between">
                    <Form.Control
                      placeholder="List Name"
                      size="sm"
                      className="mr-3"
                      value={newListName}
                      onChange={updateListName}
                    />
                    <Button
                      size="sm"
                      className="ml-auto"
                      onClick={() => createList(newListName)}
                    >
                      Create
                    </Button>
                  </Popover.Content>
                </Popover>
              }
              rootClose
            >
              {/* {({ target }) => ( */}
              <div className={`align-items-center`}>
                {/* <FontAwesomeIcon
                  ref={target}
                  icon={faList}
                  className="content-options"
                  onClick={() => {
                    console.log('IN');
                    setShow(!show);
                  }}
                /> */}
                {console.log('Inside overlay')}
                <span>
                  <FontAwesomeIcon icon={faPlus} color="#c3d1d9" ref={target} />{' '}
                  Create New List
                </span>
              </div>
              {/* )} */}
            </OverlayTrigger>
            {/* <FontAwesomeIcon icon={faPlus} color="#c3d1d9" /> Create New List */}
          </div>
        </div>
        {selectedList && (
          <div className="d-md-flex flex-md-row flex-md-wrap px-2">
            {console.log('list content', content)}
            {content.length !== 0 &&
              content.map((item, index) => {
                console.log('list -> ', item);
                return (
                  <Card
                    className="px-2 pb-3 mx-0 col-md-3 bg-transparent"
                    key={`list_content_${item.contentId}_${index}`}
                  >
                    <div
                      style={{ position: 'relative', overflow: 'hidden' }}
                      onMouseEnter={() => updateActiveId(item.id)}
                      onMouseLeave={() => updateActiveId('')}
                    >
                      <Card.Img
                        src={
                          item.backdrop === null
                            ? noImage
                            : `https://image.tmdb.org/t/p/w780${item.backdrop}`
                        }
                        style={{ border: '2px solid #30363d' }}
                        className="d-none d-lg-block"
                      />

                      <Card.Img
                        src={
                          item.poster === null
                            ? noImage
                            : `https://image.tmdb.org/t/p/w780${item.poster}`
                        }
                        style={{ border: '2px solid #30363d' }}
                        className="d-block d-lg-none"
                      />
                      <div
                        className="dashboard-options py-1 px-1 d-flex flex-row justify-content-between"
                        style={{
                          float: 'right',
                          transform:
                            activeId === item.id
                              ? 'translateY(0%)'
                              : 'translateY(100%)',
                          background: 'rgba(0,0,0,0.5)',
                          width: 'auto',
                        }}
                      >
                        <span className="px-2">
                          <Rating item={item} itemType={item.type} />
                        </span>
                        <span className="px-2">
                          <FontAwesomeIcon icon={faTrash} color="red" />
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/${item.type}/${item.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Card.Title
                        className="my-1 pl-1"
                        style={{ fontSize: '1em', color: '#c3d1d9' }}
                      >
                        {item.type === 'tv'
                          ? item.title === undefined
                            ? item.name
                            : item.title
                          : item.title}
                      </Card.Title>
                    </Link>
                  </Card>
                );
              })}
            {content.length === 0 && (
              <Container>
                <Row>
                  <Col style={{ color: '#c3d1d9' }}>
                    {/* No {selectedGategory === 'movie' ? 'Movies' : 'TV Shows'}{' '} */}
                    No Content added to {selectedList.name} List
                  </Col>
                </Row>
              </Container>
            )}
          </div>
        )}
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  watchlist: state.profile.watchlist,
  customLists: state.profile.customLists,
  listContent: state.dashboard.listContent,
});

export default connect(mapStateToProps, { createList, getListData })(Lists);
