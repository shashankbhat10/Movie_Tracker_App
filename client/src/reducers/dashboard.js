import * as actionTypes from '../actions/types';

const initialState = {
  section: 'watched',
  listContent: [],
  customListContent: [],
  stats: { movie: [], tv: [] },
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.LIST_DATA_RECEIVED:
      return { ...state, listContent: payload.list.content };
    case actionTypes.CONTENT_STATS_RECEIVED:
      return {
        ...state,
        stats: { movie: payload.movie, tv: payload.tv },
        loading: false,
      };
    case actionTypes.CUSTOM_LIST_DATE_RECEIVED:
      console.log('payload', payload);
      console.log(typeof payload);
      return {
        ...state,
        customListContent: [...payload.listData],
      };
    default:
      return { ...state };
  }
}
