import React, { Fragment, useEffect, useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { connect } from 'react-redux';
import noImage from '../../images/image-not-found.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Rating from '../Utility/Rating';
import { removeRating, updateRating } from '../../actions/profile';
import { Link } from 'react-router-dom';

const Ratings = ({ ratings, stats, updateRating, removeRating }) => {
  const [data, updateData] = useState([]);
  const [selectedCategory, updateCategory] = useState('movie');

  useEffect(() => {
    let content = [];
    console.log(ratings);

    const modified_rating = ratings[selectedCategory].map((item) => {
      return {
        id: item.id,
        title: item.title,
        tmdb_rating: stats[selectedCategory].filter(
          (content) => item.id === content.contentId
        )[0].tmdb_rating,
        my_rating: item.rating,
        backdrop: item.backdrop,
      };
    });
    Array.prototype.push.apply(content, modified_rating);

    console.log(content);
    updateData(content);
  }, [ratings, selectedCategory]);

  const imageFormatter = (row, cell) => {
    console.log(cell);
    return (
      <Link
        to={`/${selectedCategory}/${cell.id}`}
        style={{ textDecoration: 'none' }}
      >
        <Image
          src={
            cell === null
              ? noImage
              : `https://image.tmdb.org/t/p/w780${cell.backdrop}`
          }
          style={{ width: '100%', height: 'auto', maxHeight: 'inherit' }}
        />
      </Link>
    );
  };

  const editRatingFormatter = (row, cell) => {
    console.log('edit', row);
    console.log(cell);
    return (
      <span style={{ cursor: 'pointer' }}>
        <Rating
          item={cell}
          itemType={selectedCategory}
          handleRating={updateContentRating}
          type="edit"
        />
      </span>
    );
  };

  const deleteRatingFormatter = (row, cell) => {
    console.log('edit', row);
    console.log('edit', cell);
    return (
      <span style={{ cursor: 'pointer' }}>
        <FontAwesomeIcon
          icon={faTrash}
          color="red"
          onClick={() => deleteContentRating(cell)}
        />
      </span>
    );
  };

  const columns = [
    {
      dataField: 'id',
      hidden: true,
    },
    {
      dataField: 'backdrop',
      formatter: imageFormatter,
      style: { padding: '2px 0px' },
      headerStyle: (col, colIndex) => {
        return { width: '10%', textAlign: 'center' };
      },
      // style: (col, colIndex) => {
      //   return {
      //     marginTop: 'auto',
      //     marginBottom: 'auto',
      //     padding: '0 0',
      //     display: 'flex',
      //     alignItem: 'center',
      //   };
      // },
    },
    {
      dataField: 'title',
      text: 'Title',
      headerStyle: (col, colIndex) => {
        return { width: '65%', color: '#c3d1d9', paddingLeft: '2%' };
      },
      formatter: (row, cell) => {
        return (
          <Link
            to={`/${selectedCategory}/${cell.id}`}
            style={{ textDecoration: 'none', color: '#c3d1d9' }}
          >
            {cell.title}
          </Link>
        );
      },
    },
    {
      dataField: 'tmdb_rating',
      text: 'TMDB Rating',
      headerStyle: (col, colIndex) => {
        return { width: '15%', color: '#c3d1d9', textAlign: 'center' };
      },
      align: 'center',
    },
    {
      dataField: 'my_rating',
      text: 'My Rating',
      headerStyle: (col, colIndex) => {
        return { width: '15%', color: '#c3d1d9', textAlign: 'center' };
      },
      align: 'center',
    },
    {
      dataField: 'edit_rating',
      headerStyle: (col, colIndex) => {
        return { width: '5%' };
      },
      formatter: editRatingFormatter,
    },
    {
      dataField: 'delete_rating',
      headerStyle: (col, colIndex) => {
        return { width: '5%' };
      },
      formatter: deleteRatingFormatter,
    },
  ];

  const updateContentRating = (item, action, rating = 0) => {
    updateRating(item.id, selectedCategory, rating);
  };

  const deleteContentRating = (item) => {
    removeRating(item.id, selectedCategory);
  };

  return (
    <Fragment>
      <Container className="px-0" fluid>
        <div
          className="d-flex flex-row flex-wrap align-items-center pt-3 pb-2 px-0"
          style={{
            position: 'sticky',
            top: '7vh',
            zIndex: '50',
            borderBottom: '2px solid #30363d',
            background: 'black',
          }}
        >
          <h3 className="px-2 pb-1" style={{ color: '#c3d1d9' }}>
            Ratings
          </h3>
          <div className="pl-4 d-flex flex-row">
            {['movie', 'tv'].map((item, index) => {
              return (
                <h5
                  className="px-2 pb-1"
                  style={{
                    width: 'auto',
                    borderBottom:
                      item === selectedCategory && '3px solid green',
                  }}
                  key={`watched_${item}`}
                >
                  <span
                    className="px-1"
                    style={{ cursor: 'pointer', color: '#c3d1d9' }}
                    onClick={() => updateCategory(item)}
                  >
                    {item === 'movie' ? 'Movies' : 'TV Shows'}
                  </span>
                </h5>
              );
            })}
          </div>
        </div>
        <div
          style={{ zIndex: '-20' }}
          className="d-md-flex flex-md-row flex-md-wrap px-2"
        >
          {data.length !== 0 && (
            <BootstrapTable
              keyField="title"
              columns={columns}
              data={data}
              bootstrap4
              striped
              rowStyle={{ color: '#c3d1d9' }}
              bordered={false}
            />
          )}
          {data.length === 0 && (
            <Container>
              <Row>
                <Col style={{ color: '#c3d1d9' }}>
                  No {selectedCategory === 'movie' ? 'Movies' : 'TV Shows'}{' '}
                  rated yet
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
  ratings: state.profile.ratings,
  stats: state.dashboard.stats,
});

export default connect(mapStateToProps, { updateRating, removeRating })(
  Ratings
);
