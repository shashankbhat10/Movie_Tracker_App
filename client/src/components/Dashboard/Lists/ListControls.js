import React from "react";
import { Form, Dropdown, DropdownButton, OverlayTrigger, Popover, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";

const ListControls = ({
  lists,
  selectedList,
  changeList,
  updateListName,
  createList,
  updateDeleteModal,
  changeCategory,
  newListName,
  selectedCategory,
  target,
  listContent,
  updateDeleteMode,
}) => {
  return (
    <div style={{ position: "sticky", zIndex: "50", top: "7vh" }}>
      <div
        className='d-flex flex-row flex-wrap align-items-center py-1 px-3 mx-0 mb-0'
        style={{
          borderBottom: "2px solid #30363d",
          background: "black",
        }}>
        <h3 className='px-2 my-0' style={{ color: "#c3d1d9" }}>
          My Lists
        </h3>
        {lists && selectedList && (
          <DropdownButton
            variant='secondary'
            title={selectedList.name}
            onSelect={changeList}
            className='ml-4'
            style={{ maxHeight: "5rem" }}>
            {lists.map((item, index) => {
              return (
                <div key={`dropdown_list_${index}`}>
                  <Dropdown.Item value={item.name} eventKey={item.listId}>
                    {item.name}
                  </Dropdown.Item>
                  {/* {item.type === "watchlist" && (
                    <Dropdown.Divider className='my-1' />
                  )} */}
                </div>
              );
            })}
          </DropdownButton>
        )}
        <div className='d-flex flex-row pb-1 ml-auto' style={{ color: "#c3d1d9" }}>
          <div>
            <OverlayTrigger
              trigger='click'
              // target={target.current}
              placement='bottom'
              // onExit={() => {
              //   close(item.id);
              // }}
              // onEnter={() => {
              //   open(item.id);
              // }}
              flip
              overlay={
                <Popover id={`popover-positioned`}>
                  <Popover.Content className='d-flex flex-row py-1 px-2 align-items-center justify-content-between'>
                    <Form.Control
                      placeholder='List Name'
                      size='sm'
                      className='mr-3'
                      value={newListName}
                      onChange={updateListName}
                    />
                    <Button size='sm' className='ml-auto' onClick={() => createList(newListName)}>
                      Create
                    </Button>
                  </Popover.Content>
                </Popover>
              }
              rootClose>
              {/* {({ target }) => ( */}
              <div className='d-flex flex-row align-items-center'>
                {/* <FontAwesomeIcon
          ref={target}
          icon={faList}
          className="content-options"
          onClick={() => {
            console.log('IN');
            setShow(!show);
          }}
        /> */}
                {console.log("Inside overlay")}
                <h5 className='mb-0 pr-3'>
                  <FontAwesomeIcon icon={faPlus} color='#c3d1d9' ref={target} className='pr-2' size='lg' />
                  Create New List
                </h5>
              </div>
              {/* )} */}
            </OverlayTrigger>
          </div>
          <div
            className='ml-auto'
            onClick={() => {
              updateDeleteMode("list");
              updateDeleteModal(true);
            }}
            style={selectedList.type === "watchlist" ? { pointerEvents: "none", opacity: "0.4" } : {}}>
            <h5 className='mb-0' style={{ cursor: "pointer", color: "#c3d1d9" }}>
              <FontAwesomeIcon icon={faTrash} color='red' size='lg' className='pr-2' />
              Delete list
            </h5>
          </div>
        </div>
      </div>
      <div
        className='d-flex flex-row flex-wrap mb-2 align-items-center px-3 mx-0 pt-2'
        style={{
          borderBottom: "2px solid #30363d",
          background: "black",
        }}>
        {/* > */}
        <div className='pl-4 d-flex flex-row'>
          {["movie", "tv"].map((item, index) => {
            return (
              <h5
                className='px-2 pb-1'
                style={{
                  width: "auto",
                  borderBottom: item === selectedCategory && "3px solid green",
                  // transition: 'border 0.3s ease-in-out',
                }}
                key={`list${item}`}>
                <span
                  className='px-1'
                  style={{ cursor: "pointer", color: "#c3d1d9" }}
                  onClick={() => changeCategory(item)}>
                  {item === "movie" ? "Movies" : "TV Shows"}
                </span>
              </h5>
            );
          })}
        </div>
        <div
          className='ml-auto'
          onClick={() => {
            updateDeleteMode("content");
            updateDeleteModal(true);
          }}
          style={listContent.length === 0 ? { pointerEvents: "none", opacity: "0.4" } : {}}>
          <h5 style={{ cursor: "pointer", color: "#c3d1d9" }}>
            <FontAwesomeIcon icon={faTimes} color='red' size='lg' className='mr-2' />
            Clear contents
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ListControls;
