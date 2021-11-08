import { 
  DOWNLOAD_CSV_ERROR,
  DOWNLOAD_CSV_REQUEST,
  DOWNLOAD_CSV_SUCCESS,
  GET_RUSHING_STATS_ERROR, 
  GET_RUSHING_STATS_SUCCESS, 
  SET_DEFAULT, 
  SET_FILTER_NAME, 
  SET_SORT_FIELD, 
  SET_SORT_ORDER 
} from './types'

const INITIAL_STATE = {
    playerList: [],
    totalPlayers: 0,
    pageNum: 1,
    pageSize: 10,
    endPageNum: 1,
    filterName: '',
    sortField: 'name',
    sortOrder: 'asc',
    loading: false,
    error: false,
}

function rushingStatsReducer(state = INITIAL_STATE, action) {
  console.log(action)
  switch (action.type) {
    case SET_FILTER_NAME:
      return {
        ...state,
        filterName: action.payload,
        loading: true,
      }
    case SET_SORT_FIELD:
      return {
        ...state,
        sortField: action.payload,
        loading: true,
      }
    case SET_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.payload,
        loading: true,
      }
    case SET_DEFAULT:
      return {
        ...state,
        pageNum: 1,
        pageSize: 10,
        filterName: '',
        sortField: 'name',
        sortOrder: 'asc',
        loading: true,
        error: false,
      }
    case GET_RUSHING_STATS_SUCCESS:
      return {
        ...state,
        playerList: action.payload.player_list,
        totalPlayers: action.payload.total_players,
        endPageNum: action.payload.end_page_num,
        pageNum: action.payload.page_num,
        loading: false,
        error: false,
      }      
    case GET_RUSHING_STATS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      }
    case DOWNLOAD_CSV_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case DOWNLOAD_CSV_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      }
    case DOWNLOAD_CSV_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      }
    default:
      return state
  }
}

export default rushingStatsReducer