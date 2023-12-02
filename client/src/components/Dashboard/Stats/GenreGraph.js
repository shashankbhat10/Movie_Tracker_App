import React, { useEffect, useState } from "react";
import { Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import {
  getGraphData,
  // getListGraphData,
  // getWatchedGraphContent,
} from "../../../actions/utils/dashboardFunctions";
import { Bar } from "react-chartjs-2";

const GenreGraph = ({ stats, genres, watched, watchlist, customListContent }) => {
  // const [labels, updateLabels] = useState(null);
  // const [movieData, updateMovieDate] = useState(null);
  // const [tvData, updateTVDate] = useState(null);
  const [graphData, updateGraphData] = useState(null);
  // const barChartRef = useRef(null);

  useEffect(() => {
    const watchedMovies = watched.movie.map((item) => item.id);
    const watchedTV = watched.tv.map((item) => item.id);

    let movieGraphDataset = getGraphData(stats, genres, watchedMovies, watchlist, customListContent, "movie");

    let tvGraphDataset = getGraphData(stats, genres, watchedTV, watchlist, customListContent, "tv");

    const movieGraphData = {
      labels: genres.movie.total.map((item) => item.name),
      datasets: movieGraphDataset,
    };

    const tvGraphData = {
      labels: genres.tv.total.map((item) => item.name),
      datasets: tvGraphDataset,
    };

    // updateMovieDate(movieGraphData);
    // updateTVDate(tvGraphData);
    const data = {
      movie: movieGraphData,
      tv: tvGraphData,
    };
    updateGraphData(data);
    // eslint-disable-next-line
  }, []);

  const options = {
    scales: {
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
        },
      ],
    },
  };

  return (
    <div>
      {/* <Container className="py-4">
        <h4 style={{ color: '#c3d1d9' }}>
          Movie Interactions by Genres
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip style={{ color: '#c3d1d9' }}>
                Individual movies may have more than one genres
              </Tooltip>
            }
          >
            <FontAwesomeIcon
              icon={faInfoCircle}
              size="xs"
              className="ml-2 mb-2 pb-1"
            />
          </OverlayTrigger>
        </h4>
        {movieData !== null && (
          <div style={{ width: '90%' }} className="mx-auto py-2 px-2 mt-2">
            <Bar
              // ref={barChartRef}
              data={movieData}
              options={options}
              //   onElementsClick={(elem) => {
              //     // console.log(barChartRef.getElementAtEvent);
              //     console.log(elem);
              //     // console.log(elem[0]._view.label);
              //   }}
              getElementAtEvent={(evt) => {
                // console.log(evt[0]._chart.data);
                console.log(evt);
              }}
            />
          </div>
        )}
      </Container> */}
      {graphData !== null &&
        ["movie", "tv"].map((item) => (
          <Container className='py-4' key={`graph_${item}`}>
            <h4 style={{ color: "#c3d1d9" }}>
              {item === "movie" ? "Movie" : "TV Show"} Interactions by Genres
              <OverlayTrigger
                placement='bottom'
                overlay={
                  <Tooltip style={{ color: "#c3d1d9" }}>
                    Individual {item === "movie" ? "movies" : "shows"} may have more than one genres
                  </Tooltip>
                }>
                <FontAwesomeIcon icon={faInfoCircle} size='xs' className='ml-2 mb-2 pb-1' />
              </OverlayTrigger>
            </h4>
            <div style={{ width: "90%" }} className='mx-auto py-2 px-2 mt-2'>
              <Bar
                // ref={barChartRef}
                data={graphData[item]}
                options={options}
                getElementAtEvent={(evt) => {
                  console.log(evt);
                }}
              />
            </div>
          </Container>
        ))}
    </div>
  );
};

export default GenreGraph;
