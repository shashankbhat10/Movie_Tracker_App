import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import noImage from '../../images/download.png';
import { connect } from 'react-redux';

const DisplayContentResults = ({ type, content, loadMoreResults }) => {
  // const [list, updateList] = useState(null);
  console.log(type);
  // const [type, updateType] = useState('');

  // useEffect(() => {
  //   console.log('11', currentFilter);
  //   console.log('22', content);
  //   updateType(currentFilter);
  //   // if (currentFilter !== '') {
  //   // const newList = { ...content[currentFilter] };
  //   // updateList(content[currentFilter]);
  //   // }
  // }, [currentFilter]);

  // useEffect(() => {
  //   console.log('1', currentFilter);
  //   console.log('2', content);
  //   updateType(currentFilter);
  //   // if (currentFilter !== '') {
  //   //   const newList = { ...content[currentFilter] };
  //   //   updateList(content[currentFilter]);
  //   // }
  // }, []);
  // console.log('type', type);

  const observer = useRef();
  const lastSearchedResult = useCallback(
    (result) => {
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          // content.currentPage < content.totalPages
          content.currentPage < content.totalPages
        ) {
          const nextPage = content.currentPage + 1;
          loadMoreResults(nextPage);
        }
      });
      if (result) {
        observer.current.observe(result);
      }
    },
    [content]
  );

  return (
    <div>
      {console.log('list', content)}
      {content && content.data.length !== 0 && (
        <ul style={{ listStyle: 'none' }}>
          {content.data.map((item, index) => {
            return (
              <li
                key={`search_${type}_${item.id}`}
                ref={
                  content.data.length === index + 1 ? lastSearchedResult : null
                }
              >
                <Card
                  className="d-flex flex-row mb-3"
                  style={{ maxHeight: '300px', border: '0px' }}
                >
                  <Link
                    to={`/${type}/${item.id}`}
                    className="col-md-3 col-lg-2 px-0"
                    style={{ textDecoration: 'none' }}
                  >
                    <Card.Img
                      className="img-responsive"
                      style={{ height: item.poster_path === null && '100%' }}
                      src={
                        item.poster_path === null
                          ? noImage
                          : `https://image.tmdb.org/t/p/w342${item.poster_path}`
                      }
                    />
                  </Link>
                  <Card.Body className="col-md-10 pt-2 pb-3 pb-lg-0">
                    <div className="d-flex flex-row">
                      <Link
                        to={`/${type}/${item.id}`}
                        style={{ textDecoration: 'none' }}
                        className={
                          item.vote_average !== 0 ? 'col-9 px-0' : 'col-12 px-0'
                        }
                      >
                        <Card.Title className="mb-2">
                          {type === 'movie' ? item.title : item.name}
                        </Card.Title>
                      </Link>
                      {item.vote_average !== 0 && (
                        <span className="pl-3 col-3 text-center">
                          {item.vote_average}
                          <FontAwesomeIcon
                            icon={faStar}
                            className="pl-1"
                            color="gold"
                          />
                        </span>
                      )}
                    </div>
                    <Card.Subtitle className="text-muted mb-4">
                      {type === 'movie'
                        ? item.release_date
                        : item.first_air_date}
                    </Card.Subtitle>
                    <Card.Text className="d-none d-lg-block">
                      {item.overview.substring(0, 200)}
                      {item.overview.length > 200 && ' ...'}
                    </Card.Text>
                    <Card.Text className="d-block d-lg-none">
                      {item.overview.substring(0, 150)}
                      {item.overview.length > 150 && ' ...'}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

// DisplayTVResults.propTypes = {};
// const mapStateToProps = (state) => ({
//   content: state.search,
//   currentFilter: state.search.currentFilter,
// });

// export default connect(mapStateToProps, {})(DisplayContentResults);
export default DisplayContentResults;
