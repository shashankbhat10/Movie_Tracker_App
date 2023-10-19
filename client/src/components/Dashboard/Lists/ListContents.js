import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import Rating from "../../Utility/Rating";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import noImage from "../../../images/download.png";

const ListContents = ({
  content,
  selectedList,
  activeId,
  updateActiveId,
  category,
}) => {
  return (
    <div className='d-md-flex flex-md-row flex-md-wrap px-2'>
      {content.length !== 0 &&
        content.map((item, index) => {
          return (
            <Card
              className='px-2 pb-3 mx-0 col-md-3 bg-transparent'
              key={`list_content_${item.contentId}_${index}`}>
              <div
                style={{ position: "relative", overflow: "hidden" }}
                onMouseEnter={() => updateActiveId(item.id)}
                onMouseLeave={() => updateActiveId("")}>
                <Card.Img
                  src={
                    item.backdrop === null
                      ? noImage
                      : `https://image.tmdb.org/t/p/w780${item.backdrop}`
                  }
                  style={{
                    border: "2px solid #30363d",
                  }}
                  className='d-none d-lg-block'
                />
                <Card.Img
                  src={
                    item.poster === null
                      ? noImage
                      : `https://image.tmdb.org/t/p/w780${item.poster}`
                  }
                  style={{
                    border: "2px solid #30363d",
                  }}
                  className='d-block d-lg-none'
                />
                <div
                  className='dashboard-options py-1 px-1 d-flex flex-row justify-content-between'
                  style={{
                    float: "right",
                    transform:
                      activeId === item.id
                        ? "translateY(0%)"
                        : "translateY(100%)",
                    background: "rgba(0,0,0,0.5)",
                    width: "auto",
                  }}>
                  <span className='px-2'>
                    <Rating item={item} itemType={item.type} />
                  </span>
                  <span className='px-2'>
                    <FontAwesomeIcon icon={faTrash} color='red' />
                  </span>
                </div>
              </div>
              <Link
                to={`/${item.type}/${item.id}`}
                style={{
                  textDecoration: "none",
                }}>
                <Card.Title
                  className='my-1 pl-1'
                  style={{ fontSize: "1em", color: "#c3d1d9" }}>
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
              {/* No {selectedGategory === 'movie' ? 'Movies' : 'TV Shows'}{' '} */}
              No {category === "movie" ? "Movies" : "TV Shows"} added to{" "}
              {selectedList.name} List
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default ListContents;
