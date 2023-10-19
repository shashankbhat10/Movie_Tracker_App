import React, { Fragment } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { clearContents, deleteList } from "../../../actions/profile";

const DeleteListModal = ({
  show,
  closeModal,
  listName,
  mode,
  clearContents,
  listId,
  category,
  content,
  deleteList,
}) => {
  return (
    <Modal show={show} backdrop='static'>
      {mode === "list" ? (
        <Fragment>
          <Modal.Header closeButton>
            <Modal.Title>Delete List - {listName.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this list? All data linked to the list will be lost.</Modal.Body>
          <Modal.Footer>
            <Button
              variant='secondary'
              onClick={() => {
                closeModal(false);
              }}>
              Cancel
            </Button>
            <Button
              variant='danger'
              onClick={() => {
                deleteList(listId);
                console.log("Will delete!");
                closeModal(false);
              }}>
              Confirm
            </Button>
          </Modal.Footer>
        </Fragment>
      ) : (
        <Fragment>
          <Modal.Header closeButton>
            <Modal.Title>Clear Contents - {listName.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to clear list contents? <br />
            Chosen option will remove all corresponding contents of the list.
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='secondary'
              onClick={() => {
                closeModal(false);
              }}>
              Cancel
            </Button>
            {["movie", "tv", "all"].map((type) => (
              <Button
                key={`clear_${type}`}
                variant='danger'
                onClick={() => {
                  console.log("Will delete!");
                  clearContents(listId, type);
                  closeModal(false);
                }}
                disabled={
                  (content.length === 0 && type === "all") ||
                  (type !== "all" && content.filter((item) => item.type === type).length === 0)
                }>
                {console.log("category", category)}
                {console.log("type", type)}
                Clear {type === "movie" ? "Movies" : type === "tv" ? "TV Shows" : "All"}
              </Button>
            ))}
            {/* <Button
              variant='danger'
              onClick={() => {
                console.log("Will delete!");
                closeModal(false);
              }}>
              Clear Movies
            </Button>
            <Button
              variant='danger'
              onClick={() => {
                console.log("Will delete!");
                closeModal(false);
              }}>
              Clear TV
            </Button>
            <Button
              variant='danger'
              onClick={() => {
                console.log("Will delete!");
                closeModal(false);
              }}>
              Clear All
            </Button> */}
          </Modal.Footer>
        </Fragment>
      )}
    </Modal>
  );
};

export default connect(null, { clearContents, deleteList })(DeleteListModal);
