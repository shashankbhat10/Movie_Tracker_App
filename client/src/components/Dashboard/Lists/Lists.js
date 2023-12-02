import React, { Fragment, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { createList } from "../../../actions/profile";
import { getListData } from "../../../actions/dashboard";
import DeleteListModal from "./DeleteListModal";
import ListContents from "./ListContents";
import ListControls from "./ListControls";

const Lists = ({ createList, watchlist, customLists, getListData, listContent, listDeleted }) => {
  const [selectedList, updateSelectedList] = useState(null);
  const [content, updateContent] = useState([]);
  const [lists, updateLists] = useState([]);
  // const target = useRef(null);
  const [newListName, updateNewListName] = useState("");
  const [activeId, updateActiveId] = useState("");
  const [selectedCategory, updateSelectedCategory] = useState("movie");
  const [showDeleteModal, updateDeleteModal] = useState(false);
  const [deleteMode, updateDeleteMode] = useState(null);

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
    let list = [{ listId: watchlist.listId, type: watchlist.type, name: "Watchlist" }];
    if (customLists.length !== 0) {
      Array.prototype.push.apply(list, customLists);
    }
    updateLists(list);
    updateSelectedList(list[0]);
    getListData(list[0].listId);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    updateContent(listContent.filter((item) => item.type === selectedCategory));
  }, [listContent, selectedCategory]);

  useEffect(() => {
    let list = [{ listId: watchlist.listId, type: watchlist.type, name: "Watchlist" }];
    if (customLists.length !== 0) {
      Array.prototype.push.apply(list, customLists);
    }
    updateLists(list);
  }, [customLists, watchlist]);

  // useEffect(() => {
  //   if (listDeleted === false) {
  //     getListData(list.filter((item) => item.type === "watchlist").listId);
  //     updateSelectedList();
  //   }
  // }, [listDeleted]);

  const changeCategory = (category) => {
    updateSelectedCategory(category);
    console.log("Change Category", listContent);
    updateContent(listContent.filter((item) => item.type === category));
  };

  return (
    <Fragment>
      {selectedList != null && (
        <div>
          <Container className='px-0' fluid>
            <ListControls
              lists={lists}
              selectedList={selectedList}
              changeList={changeList}
              updateListName={updateListName}
              createList={createList}
              updateDeleteModal={updateDeleteModal}
              changeCategory={changeCategory}
              newListName={newListName}
              selectedCategory={selectedCategory}
              listContent={listContent}
              updateDeleteMode={updateDeleteMode}
            />
            {/* {selectedList && ( */}
            <ListContents
              content={content}
              selectedList={selectedList}
              activeId={activeId}
              updateActiveId={updateActiveId}
              category={selectedCategory}
            />
            {/* )} */}
          </Container>

          <DeleteListModal
            show={showDeleteModal}
            closeModal={updateDeleteModal}
            listName={selectedList}
            mode={deleteMode}
            listId={selectedList.listId}
            category={selectedCategory}
            content={listContent}
          />
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  watchlist: state.profile.watchlist,
  customLists: state.profile.customLists,
  listContent: state.dashboard.listContent,
  listDeleted: state.dashboard.listDeleted,
});

export default connect(mapStateToProps, {
  createList,
  getListData,
})(Lists);
