import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const SearchFilter = ({ resultType, updateFilter, searchedResults }) => {
  const [type, updateType] = useState([]);

  useEffect(() => {
    let category = { ...searchedResults };
    delete category["loading"];
    delete category["loading_more"];
    delete category["currentFilter"];
    const keys = Object.keys(category);

    const types = [];
    keys.forEach((item) => {
      let type = {
        filter: item,
        title: item === "tv" ? "TV" : item.charAt(0).toUpperCase() + item.slice(1),
      };
      types.push(type);
    });

    updateType(types);
    console.log("types", types);
  }, []);

  return (
    // <div className="col-md-3 search-filter">
    <div className='col-md-3 px-0'>
      {type.length !== 0 && (
        <Container
          className='px-0'
          style={{
            position: "sticky",
            top: "8vh",
            backgroundColor: "#16161d",
            borderRadius: "5px",
            border: "#30363d 2px solid",
          }}>
          <Row>
            <h4 className='align-self-center py-3 px-1 mx-auto text-white'>
              <strong>Search Category</strong>
            </h4>
          </Row>

          {type.map((item, index) => {
            return (
              // <div>
              <Row
                // className="px-2"
                key={`filter_${index}`}
                style={{ cursor: "pointer", margin: "auto", marginBottom: index == type.length - 1 && "10px" }}
                onClick={() => {
                  console.log("Hellowww");
                  updateFilter(item.filter);
                }}>
                <Col className='col-md-8 text-white'>{item.title}</Col>
                <Col
                  className='col-md-3 text-center mr-1'
                  style={{
                    border: "1px solid black",
                    borderRadius: "5px",
                    backgroundColor: "white",
                  }}>
                  {searchedResults[item.filter].totalResults}
                </Col>
                {index != type.length - 1 && <hr className='my-2' style={{ width: "95%", backgroundColor: "white" }} />}
              </Row>
              // </div>
            );
          })}
        </Container>
      )}
    </div>
  );
};

export default SearchFilter;
