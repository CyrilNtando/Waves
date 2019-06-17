import axios from 'axios';
import { SITE_SERVER } from '../../components/utils/misc';
import { GET_SITE_DATA, UPDATE_SITE_DATA } from './actionTypes';

export function getSiteData() {
  return dispatch => {
    return axios.get(`${SITE_SERVER}/site_data`).then(response => {
      dispatch({
        type: GET_SITE_DATA,
        payload: response.data
      });
    });
  };
}

export function updateSiteData(siteData) {
  return dispatch => {
    return axios.post(`${SITE_SERVER}/site_data`, siteData).then(response => {
      dispatch({
        type: UPDATE_SITE_DATA,
        payload: response.data
      });
    });
  };
}
