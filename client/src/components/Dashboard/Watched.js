import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import noImage from "../../images/image-not-found.png";
import Rating from "../Utility/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  addRating,
  removeRating,
  updateRating,
  addContentToWatched,
  removeContentFromWatched,
} from "../../actions/profile";

const Watched = ({ watched, addRating, removeRating, updateRating, addContentToWatched, removeContentFromWatched }) => {
  const [selectedCategory, updateSelectedCategory] = useState("movie");
  const [content, updateContent] = useState([]);
  const [activeId, updateActiveId] = useState("");
  const [popoverId, updatePopoverId] = useState("");

  useEffect(() => {
    console.log("watched", watched);
    updateContent(watched[selectedCategory]);
    // updateContent(watched[selectedCategory]);
    // console.log(content);
    // eslint-disable-next-line
  }, [watched]);

  useEffect(() => {
    console.log("watched", watched);
    updateContent(watched[selectedCategory]);
    console.log("content", content);
    // eslint-disable-next-line
  }, []);

  const changeCategory = (category) => {
    updateSelectedCategory(category);
    updateContent(watched[category]);
  };

  const popoverOpen = (id) => {
    updatePopoverId(id);
  };

  const popoverClose = (id) => {
    updatePopoverId("");
  };

  const handleRating = (item, action, rating = 0) => {
    switch (action) {
      case "add":
        if (!content.includes(item.id)) {
          item.type = selectedCategory;
          addContentToWatched(item);
        }
        addRating(item, selectedCategory, rating);
        break;
      case "update":
        updateRating(item.id, selectedCategory, rating);
        break;
      case "remove":
        console.log("remove");
        removeRating(item.id, selectedCategory);
        break;
      default:
        break;
    }
  };

  return (
    <Fragment>
      <Container
        className='px-0'
        // style={{ position: 'sticky', top: '7vh', overflowY: 'auto' }}
        fluid>
        <div
          className='d-flex flex-row flex-wrap mb-2 align-items-center pt-3 pb-2 px-0'
          style={{
            position: "sticky",
            top: "7vh",
            zIndex: "50",
            borderBottom: "2px solid #30363d",
            background: "black",
          }}>
          <h3 className='px-2 pb-1' style={{ color: "#c3d1d9" }}>
            Watched Content
          </h3>
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
                  key={`watched_${item}`}>
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
        </div>
        <div style={{ zIndex: "-20" }} className='d-md-flex flex-md-row flex-md-wrap px-2'>
          {content.length !== 0 &&
            content.map((item, index) => {
              console.log("content after update", content);
              return (
                <Card className='px-2 pb-3 mx-0 col-md-3 bg-transparent' key={`watched_content_${index}`}>
                  <div
                    style={{ position: "relative", overflow: "hidden" }}
                    onMouseEnter={() => updateActiveId(item.id)}
                    onMouseLeave={() => updateActiveId("")}>
                    <Card.Img
                      src={
                        item.backdrop_path === null ? noImage : `https://image.tmdb.org/t/p/w780${item.backdrop_path}`
                      }
                      style={{ border: "2px solid #30363d" }}
                      className='d-none d-lg-block'
                    />
                    <Card.Img
                      src={item.poster_path === null ? noImage : `https://image.tmdb.org/t/p/w780${item.poster_path}`}
                      style={{ border: "2px solid #30363d" }}
                      className='d-block d-lg-none'
                    />
                    <div
                      className='dashboard-options py-1 px-1 d-flex flex-row justify-content-between'
                      style={{
                        float: "right",
                        transform:
                          activeId === item.id || popoverId === item.id ? "translateY(0%)" : "translateY(100%)",
                        background: "rgba(0,0,0,0.5)",
                        width: "auto",
                      }}>
                      <span className='px-2'>
                        <Rating
                          item={item}
                          itemType={item.type}
                          open={popoverOpen}
                          close={popoverClose}
                          handleRating={handleRating}
                        />
                      </span>
                      <span className='px-2'>
                        <FontAwesomeIcon
                          icon={faTrash}
                          color='red'
                          onClick={() => {
                            console.log("remove", item);
                            removeContentFromWatched(item);
                          }}
                        />
                      </span>
                    </div>
                  </div>
                  <Link
                    to={selectedCategory === "movie" ? `/movie/${item.id}` : `/tv/${item.id}`}
                    style={{ textDecoration: "none" }}>
                    <Card.Title className='my-1 pl-1' style={{ fontSize: "1em", color: "#c3d1d9" }}>
                      {item.title}
                    </Card.Title>
                  </Link>
                </Card>
              );
            })}
          {content.length === 0 && (
            <Container>
              <Row>
                <Col style={{ color: "#c3d1d9" }}>
                  No {selectedCategory === "movie" ? "Movies" : "TV Shows"} added to watched
                </Col>
              </Row>
            </Container>
          )}
        </div>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  watched: state.profile.watched,
});

export default connect(mapStateToProps, {
  addRating,
  updateRating,
  removeRating,
  addContentToWatched,
  removeContentFromWatched,
})(Watched);
