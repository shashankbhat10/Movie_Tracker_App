// import React from 'react';
// import PropTypes from 'prop-types';
// import { Link, withRouter } from 'react-router-dom';
// import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

// const MovieCast = ({ match, cast }) => {
//   return (
//     <Fragment>
//       <div className="movie-cast mt-3 ml-5">
//         <span className="movie-cast-header pl-3">Main Cast</span>
//         <div className="movie-cast-body mr-auto my-1">
//           <div className="d-flex flex-row flex-nowrap my-2 ">
//             {cast
//               .slice(0, cast.length > 15 ? 15 : cast.length)
//               .map((c, index) => {
//                 return (
//                   <div
//                     className="cast-card mx-1 d-flex flex-column"
//                     key={index}
//                   >
//                     <img
//                       src={`https://image.tmdb.org/t/p/w185${c.profile_path}`}
//                       alt=""
//                       className="profile-image"
//                     />
//                     <span className="pt-2 px-2">
//                       <strong>{c.name}</strong>
//                     </span>
//                     <span className="px-2">{c.character}</span>
//                   </div>
//                 );
//               })}
//             <div className="cast-card mr-1 ml-1 d-flex">
//               <span className="my-auto mx-auto">
//                 <a href="#!" style={{ color: 'black' }}>
//                   View more <FontAwesomeIcon icon={faArrowRight} />
//                 </a>
//               </span>
//             </div>
//           </div>
//         </div>
//         <div className="movie-cast-footer pt-1 pb-2 pl-3">
//           <span>
//             <Link
//               to={`${match.params.id}/complete-cast`}
//               style={{ textDecoration: 'none' }}
//             >
//               View complete cast {'&'} crew
//             </Link>
//           </span>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// MovieCast.propTypes = {
//   cast: PropTypes.array.isRequired,
// };

// export default withRouter(MovieCast);

import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import noImage from '../../images/download.png';

const MovieCast = ({ id, cast }) => {
  return (
    <div className="px-4 mb-3">
      <h5 className="pl-3">Main Cast</h5>
      <div
        className="pt-1 d-flex flex-row flex-nowrap"
        style={{ overflowX: 'auto' }}
      >
        {cast
          .slice(0, cast.length > 15 ? 15 : cast.length)
          .map((actor, index) => {
            return (
              <Card
                key={`movie_cast_${actor.id}`}
                className="mx-1"
                style={{
                  display: 'block',
                  minWidth: '140px',
                }}
              >
                <Link className="profile-image" to={`/person/${actor.id}`}>
                  <Card.Img
                    style={{
                      width: '100%',
                      height: actor.profile_path === null ? '207px' : 'auto',
                    }}
                    src={
                      actor.profile_path === null
                        ? noImage
                        : `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    }
                  />
                </Link>
                <Card.Body className="px-1 py-1 d-flex flex-column">
                  <Link
                    to={`/person/${actor.id}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <span>
                      <strong>{actor.name}</strong>
                    </span>
                  </Link>
                  <span style={{ fontSize: '90%' }}>{actor.character}</span>
                </Card.Body>
              </Card>
            );
          })}
      </div>
      <h6 className="pt-3 pl-3">
        <Link
          to={`/movie/${id}/complete-credits`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          Full Cast and Crew
        </Link>
      </h6>
    </div>
  );
};

export default MovieCast;
