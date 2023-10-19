import React, { useEffect, useState } from "react";
import { Container, Card, Modal } from "react-bootstrap";
import { getInteractedDirectorData, getInteractedPeopleData } from "../../../actions/utils/dashboardFunctions";
import { Link } from "react-router-dom";
import noImage from "../../../images/download.png";

const PeopleStats = ({ watched, stats, watchlist, customLists }) => {
  const [data, updateData] = useState(null);
  const [showModal, updateShowModal] = useState(false);
  const [modalData, updateModalData] = useState(null);
  const [selectedActor, updateActor] = useState(null);
  const [directorData, updateDirectorData] = useState(null);

  useEffect(() => {
    const peopleData = getInteractedPeopleData(stats, watched, watchlist, customLists);
    updateData(peopleData);

    const directorData = getInteractedDirectorData(stats, watched, watchlist, customLists);
    console.log("director Data", directorData);
    updateDirectorData(directorData);
  }, []);

  const handleModalClick = (person) => {
    let interactions = person.interactions;
    let finalModalData = interactions.reduce((tempData, item) => {
      const group = tempData[item.category] || [];
      group.push({ id: item.id, type: item.type, title: item.title });
      tempData[item.category] = group;
      return tempData;
    }, {});
    updateActor(person.name);
    updateModalData(finalModalData);
    updateShowModal(true);
  };

  return (
    <Container style={{ color: "#c3d1d9" }}>
      <h4>Most Interacted Actors</h4>
      <div>
        <div className='pt-1 d-flex flex-row flex-nowrap' style={{ overflowX: "auto" }}>
          {data !== null &&
            data.map((actor, index) => {
              return (
                <Card
                  key={`tv_cast_${actor.id}`}
                  className='mx-1 col-3 px-0'
                  style={{
                    display: "block",
                    minWidth: "130px",
                    maxWidth: "140px",
                    border: "#30363d 2px solid",
                    backgroundColor: "#16161d",
                  }}>
                  <Link className='profile-image' to={`/person/${actor.id}`}>
                    <Card.Img
                      style={{
                        width: "100%",
                        height: actor.profile_path === null ? "207px" : "auto",
                      }}
                      src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : noImage}
                      className='px-0'
                    />
                  </Link>
                  <Card.Body className='px-1 py-1 d-flex flex-column'>
                    <Link to={`/person/${actor.id}`} style={{ textDecoration: "none", color: "#c3d1d9" }}>
                      <span>
                        <strong>{actor.name}</strong>
                      </span>
                    </Link>
                    <span style={{ fontSize: "90%" }} onClick={() => handleModalClick(actor)}>
                      <u style={{ cursor: "pointer", marginBottom: "1px" }}>
                        ({actor.interactions.length} interactions)
                      </u>
                    </span>
                  </Card.Body>
                </Card>
              );
            })}
        </div>
        <div className='pt-4'>
          <h4>Most Interacted Directors</h4>
          <div className='pt-1 d-flex flex-row flex-nowrap' style={{ overflowX: "auto" }}>
            {directorData !== null &&
              directorData.map((actor, index) => {
                return (
                  <Card
                    key={`tv_cast_${actor.id}`}
                    className='mx-1 col-3 px-0'
                    style={{
                      display: "block",
                      minWidth: "130px",
                      maxWidth: "140px",
                      border: "#30363d 2px solid",
                      backgroundColor: "#16161d",
                    }}>
                    <Link className='profile-image' to={`/person/${actor.id}`}>
                      <Card.Img
                        style={{
                          width: "100%",
                          height: actor.profile_path ? "auto" : "207px",
                        }}
                        src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : noImage}
                        className='px-0'
                      />
                    </Link>
                    <Card.Body className='px-1 py-1 d-flex flex-column'>
                      <Link to={`/person/${actor.id}`} style={{ textDecoration: "none", color: "#c3d1d9" }}>
                        <span>
                          <strong>{actor.name}</strong>
                        </span>
                      </Link>
                      <span style={{ fontSize: "90%" }} onClick={() => handleModalClick(actor)}>
                        <u style={{ cursor: "pointer" }}>({actor.interactions.length} interactions)</u>
                      </span>
                    </Card.Body>
                  </Card>
                );
              })}
          </div>
        </div>
      </div>
      {showModal && modalData && (
        <Modal show={showModal} onHide={() => updateShowModal(false)}>
          <Modal.Header>
            <strong>Interactions - {selectedActor}</strong>
          </Modal.Header>
          <Modal.Body>
            {console.log(modalData)}
            {Object.keys(modalData).map((key, index) => {
              return (
                <div>
                  <h5>{key === "watched" ? "Watched" : key === "watchlist" ? "Watchlist" : key}</h5>
                  <ul className='pl-2'>
                    {modalData[key].map((content, index) => {
                      return (
                        <li style={{ listStyle: "none" }}>
                          <Link to={`/${content.type}/${content.id}`} style={{ textDecoration: "none" }}>
                            {content.title}
                          </Link>
                          <span className='pl-3'>({content.type})</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default PeopleStats;
