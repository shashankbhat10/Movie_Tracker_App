import * as actionTypes from '../actions/types';

const initialState = {
  name: '',
  watched: { movie: [], tv: [] },
  reviews: { movie: [], tv: [] },
  ratings: { movie: [], tv: [] },
  watchlist: { movie: [], tv: [] },
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  let list = {};
  let contentType = '';

  switch (type) {
    case actionTypes.CONTENT_ADDED_TO_WATCH:
      const newWatched = { ...state.watched };
      if (payload.type === 'movie') newWatched['movie'].push(payload.id);
      else if (payload.type === 'tv') newWatched['tv'].push(payload.id);
      return { ...state, watched: newWatched };
    case actionTypes.PROFILE_LOADED:
      return {
        ...state,
        name: payload.name,
        watched: {
          ...state.watched,
          movie: [
            ...payload.watched
              .filter((item) => item.type === 'movie')
              .map((item) => item.id),
          ],
          tv: [
            ...payload.watched
              .filter((item) => item.type === 'tv')
              .map((item) => item.id),
          ],
        },
        reviews: {
          ...state.reviews,
          movie: [
            ...payload.reviews
              .filter((item) => item.type === 'movie')
              .map((item) => item.id),
          ],
          tv: [
            ...payload.reviews
              .filter((item) => item.type === 'tv')
              .map((item) => item.id),
          ],
        },
        ratings: {
          ...state.ratings,
          movie: [
            ...payload.ratings
              .filter((item) => item.type === 'movie')
              .map((item) => item.id),
          ],
          tv: [
            ...payload.ratings
              .filter((item) => item.type === 'tv')
              .map((item) => item.id),
          ],
        },
        watchlist: {
          ...state.watchlist,
          id: payload.watchlist._id,
          movie: [
            ...payload.watchlist.content
              .filter((item) => item.type === 'movie')
              .map((item) => item.id),
          ],
          tv: [
            ...payload.watchlist.content
              .filter((item) => item.type === 'tv')
              .map((item) => item.id),
          ],
        },
      };
    case actionTypes.CONTENT_REMOVED_FROM_WATCH:
      list = { ...state.watched };
      if (payload.type === 'movie') contentType = 'movie';
      else contentType = 'tv';
      list[contentType].splice(list[contentType].indexOf(payload.id), 1);
      return { ...state, watched: list };
    case actionTypes.CONTENT_ADDED_TO_LIST:
      const newList = { ...state.watchlist };
      if (payload.type === 'movie') newList['movie'].push(payload.id);
      else if (payload.type === 'tv') newList['tv'].push(payload.id);
      return { ...state, watchlist: newList };
    case actionTypes.CONTENT_REMOVED_FROM_LIST:
      list = { ...state.watchlist };
      if (payload.type === 'movie') contentType = 'movie';
      else contentType = 'tv';
      list[contentType].splice(list[contentType].indexOf(payload.id), 1);
      return { ...state, watchlist: list };
    default:
      return { ...state };
  }
}
