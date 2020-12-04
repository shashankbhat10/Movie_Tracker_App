import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TrailerModal from './TrailerModal/TrailerModal';

const MovieAdditionalDetails = ({ trailer: { id, key, site, name } }) => {
  const [loadTrailer, setLoadTrailer] = useState(false);
  return (
    <div>
      <TrailerModal trailerKey={key} name={name} />
    </div>
  );
};

MovieAdditionalDetails.propTypes = {};

export default MovieAdditionalDetails;
