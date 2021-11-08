import axios from "axios";
import { ExportToCsv } from "export-to-csv";

import { API_URL, BASE_URL, FIRST_PAGE_NUM } from "../util/constants";
import { 
    DOWNLOAD_CSV_ERROR, 
    DOWNLOAD_CSV_REQUEST, 
    DOWNLOAD_CSV_SUCCESS, 
    GET_RUSHING_STATS_ERROR, 
    GET_RUSHING_STATS_REQUEST, 
    GET_RUSHING_STATS_SUCCESS, 
    SET_DEFAULT,
    SET_FILTER_NAME,
    SET_SORT_FIELD,
    SET_SORT_ORDER
} from "./types";

export const setFilterName = (filterName) => async (dispatch, getState) => {
  dispatch({
    type: SET_FILTER_NAME,
    payload: filterName,
  })
  const { pageSize, sortField, sortOrder } = getState().rushingStats
  const inputStr = createInputURL(FIRST_PAGE_NUM, pageSize, filterName, sortField, sortOrder)
  await getRushingStatsApi(dispatch, inputStr)
}

export const setSortField = (sortField) => async (dispatch, getState) => {
  dispatch({
    type: SET_SORT_FIELD,
    payload: sortField,
  })
  const { pageSize, filterName, sortOrder } = getState().rushingStats
  const inputStr = createInputURL(FIRST_PAGE_NUM, pageSize, filterName, sortField, sortOrder)
  await getRushingStatsApi(dispatch, inputStr)
}

export const setSortOrder = (sortOrder) => async (dispatch, getState) => {
  dispatch({
    type: SET_SORT_ORDER,
    payload: sortOrder,
  })
  const { pageSize, filterName, sortField } = getState().rushingStats
  const inputStr = createInputURL(FIRST_PAGE_NUM, pageSize, filterName, sortField, sortOrder)
  await getRushingStatsApi(dispatch, inputStr)
}

export const setDefault = () => async (dispatch, getState) => {
  dispatch({
    type: SET_DEFAULT
  })
  const { pageNum, pageSize, filterName, sortField, sortOrder } = getState().rushingStats
  const inputStr = createInputURL(pageNum, pageSize, filterName, sortField, sortOrder)
  await getRushingStatsApi(dispatch, inputStr)
}

export const setPrevPage = () => async (dispatch, getState) => {
  dispatch({ type: GET_RUSHING_STATS_REQUEST })
  const { pageNum, pageSize, filterName, sortField, sortOrder } = getState().rushingStats
  const inputStr = createInputURL(pageNum - 1, pageSize, filterName, sortField, sortOrder)
  await getRushingStatsApi(dispatch, inputStr)
}

export const setNextPage = () => async (dispatch, getState) => {
  dispatch({ type: GET_RUSHING_STATS_REQUEST })
  const { pageNum, pageSize, filterName, sortField, sortOrder } = getState().rushingStats
  const inputStr = createInputURL(pageNum + 1, pageSize, filterName, sortField, sortOrder)
  await getRushingStatsApi(dispatch, inputStr)
}

// Initial load of the PlayerTable
export const loadTable = () => async (dispatch, getState) => {
  dispatch({ type: GET_RUSHING_STATS_REQUEST })
  const { pageNum, pageSize, filterName, sortField, sortOrder } = getState().rushingStats
  const inputStr = createInputURL(pageNum, pageSize, filterName, sortField, sortOrder)
  await getRushingStatsApi(dispatch, inputStr)
}

export const downloadCsv = () => async (dispatch, getState) => {
  dispatch({ type: DOWNLOAD_CSV_REQUEST })
  const { totalPlayers, filterName, sortField, sortOrder } = getState().rushingStats
  const inputStr = createInputURL(FIRST_PAGE_NUM, totalPlayers, filterName, sortField, sortOrder)
  try {
    const response = await axios.get(BASE_URL + API_URL + inputStr)
    downloadCsvHelper(response.data.player_list)
    dispatch({ type: DOWNLOAD_CSV_SUCCESS })
  } catch (err) {
    dispatch({
      type: DOWNLOAD_CSV_ERROR,
      err: err,
    })
  }
}

const downloadCsvHelper = (playerList) => {
  const options = {
    filename: 'RushingStats',
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: true,
  };
  const csvExporter = new ExportToCsv(options)
  csvExporter.generateCsv(playerList)
}

const createInputURL = (pageNum, pageSize, filterName, sortField, sortOrder) => {
  const pageNumStr = '?page_num=' + pageNum.toString()
  const pageSizeStr = '&page_size=' + pageSize.toString()
  const filterNameStr = (filterName === '') ? '' : ('&filter_name=' + filterName)
  const sortFieldStr = '&sort_field=' + sortField
  const sortOrderStr = '&sort_order=' + ((sortOrder == 'asc') ? 'false' : 'true')
  return pageNumStr + pageSizeStr + filterNameStr + sortFieldStr + sortOrderStr
}

async function getRushingStatsApi(dispatch, inputStr) {
  try {
    const response = await axios.get(BASE_URL + API_URL + inputStr)
    dispatch({
      type: GET_RUSHING_STATS_SUCCESS,
      payload: response.data,
    })
  } catch (err) {
    console.log(err)
    dispatch({ type: GET_RUSHING_STATS_ERROR })
  }
}