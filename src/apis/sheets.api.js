import Axios from 'axios';

const apiUrl = process.env.REACT_APP_SHEETS_API;

const sheetsApi = Axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const getSheetsForPlayer = sheet => sheetsApi.get(`/players/${sheet}`);
export const createSheetForPlayer = (sheet, body) => sheetsApi.post(`/players/${sheet}`, body);

export const getSheet = (sheet, sheetId) => sheetsApi.get(`/${sheet}/${sheetId}`);
export const updateSheet = (sheet, sheetId, body) => sheetsApi.patch(`/${sheet}/${sheetId}`, body);
export const deleteSheet = (sheet, sheetId) => sheetsApi.delete(`/${sheet}/${sheetId}`);

export const getResources = (sheet, sheetId, resource) => sheetsApi.get(`/${sheet}/${sheetId}/${resource}`);
export const createResource = (sheet, sheetId, resource, body) => sheetsApi.post(`/${sheet}/${sheetId}/${resource}`, { sheetId: sheetId, ...body });
export const updateResource = (sheet, sheetId, resource, resourceId, body) => sheetsApi.patch(`/${sheet}/${sheetId}/${resource}/${resourceId}`, body);
export const deleteResource = (sheet, sheetId, resource, resourceId) => sheetsApi.delete(`/${sheet}/${sheetId}/${resource}/${resourceId}`);

export const leaveCampaign = (sheet, sheetId) => sheetsApi.post(`/${sheet}/${sheetId}/leave-campaign`);
export const removePlayer = (sheet, sheetId, body) => sheetsApi.post(`/${sheet}/${sheetId}/remove-player`, body);

export default sheetsApi;
