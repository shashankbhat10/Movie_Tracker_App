import React, { Fragment, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import GenericStats from './GenericStats';
import Spinner from '../../Utility/Spinner';
import GenreGraph from './GenreGraph';
import PeopleStats from './PeopleStats';

const Stats = ({
  watched,
  ratings,
  genres,
  stats,
  watchlist,
  customListContent,
  loading,
}) => {
  const [watchedCount, updateWatchedCount] = useState({ movie: 0, tv: 0 });
  const [ratingsCount, updateRatingsCount] = useState({ movie: 0, tv: 0 });

  useEffect(() => {
    const watchCount = { movie: watched.movie.length, tv: watched.tv.length };
    const rateCount = { movie: ratings.movie.length, tv: ratings.tv.length };

    updateWatchedCount(watchCount);
    updateRatingsCount(rateCount);

    // const movieGenre = genres.movie.total;
    // const movieGraphData = [];
    // const movies = watched.movie.map((item) => item.id);

    // const data = stats.movie
    //   .filter((item) => movies.includes(item.contentId))
    //   .reduce((genreItems, item) => {
    //     const genres = item.genres;
    //     genres.forEach((g) => {
    //       const currentGenre = g.name;
    //       let genreArr = genreItems[currentGenre] || [];
    //       const requiredData = {
    //         contentId: item.contentId,
    //         type: item.type,
    //         title: item.title,
    //       };
    //       genreArr.push(requiredData);
    //       genreItems[currentGenre] = genreArr;
    //     });
    //     return genreItems;
    //   }, {});

    // // console.log(data);

    // // console.log(
    // //   genres.movie.total
    // //     .map((item) => item.name)
    // //     .sort((a, b) => b > a)
    // //     .map((item) => (data[item] !== undefined ? data[item].length : 0))
    // // );

    // // console.log(
    // //   'genres',
    // //   genres.movie.total
    // //     .map((item) => item.name)
    // //     .sort((a, b) => !a.localeCompare(b))
    // // );

    // const graphdata = getWatchedGraphContent(stats, genres, movies);
    // console.log('graphData', graphdata.data);

    // // const wl = watchlist.movie.map((item) => {
    // //   return { id: item.id, title: item.title };
    // // });
    // // Array.prototype.push.apply(wl, customListContent);
    // // getListGraphData(stats, genres, customListContent);
    // const listData = getGraphData(
    //   stats,
    //   genres,
    //   movies,
    //   watchlist,
    //   customListContent
    // );
    // console.log('listData', listData);

    // const graphData = {
    //   labels: movieGenre.map((item) => item.name),
    //   datasets: listData,
    // };

    // updateDate(graphData);
  }, []);

  return (
    <Fragment>
      {loading && <Spinner />}
      {!loading && (
        <div>
          <div
            className="d-flex flex-row flex-wrap align-items-center py-2 px-0"
            style={{
              position: 'sticky',
              top: '7vh',
              zIndex: '50',
              borderBottom: '2px solid #30363d',
              background: 'black',
            }}
          >
            <h3 className="px-3 mb-0" style={{ color: '#c3d1d9' }}>
              Stats
            </h3>
          </div>
          <div className="stats-container pt-2">
            <GenericStats
              watchedCount={watchedCount}
              ratingsCount={ratingsCount}
            />
            <GenreGraph
              stats={stats}
              genres={genres}
              watched={watched}
              watchlist={watchlist}
              customListContent={customListContent}
            />
            <PeopleStats
              watched={watched}
              stats={stats}
              watchlist={watchlist}
              customLists={customListContent}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  watched: state.profile.watched,
  ratings: state.profile.ratings,
  genres: state.homepage.genres,
  stats: state.dashboard.stats,
  watchlist: state.profile.watchlist,
  customListContent: state.dashboard.customListContent,
  loading: state.dashboard.loading,
});

export default connect(mapStateToProps)(Stats);
