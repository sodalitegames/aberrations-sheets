import Axios from 'axios';

import { SheetResourceType, SheetType } from '../models/sheet';

const apiUrl = process.env.REACT_APP_SHEETS_API;

const sheetsApi = Axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const getSheetsForPlayer = (sheet: SheetType) => sheetsApi.get(`/players/${sheet}`);
export const createSheetForPlayer = (sheet: SheetType, body: any) => sheetsApi.post(`/players/${sheet}`, body);

export const getSheet = (sheet: SheetType, sheetId: string) => sheetsApi.get(`/${sheet}/${sheetId}`);
export const updateSheet = (sheet: SheetType, sheetId: string, body: any) => sheetsApi.patch(`/${sheet}/${sheetId}`, body);
export const deleteSheet = (sheet: SheetType, sheetId: string) => sheetsApi.delete(`/${sheet}/${sheetId}`);

export const getResources = (sheet: SheetType, sheetId: string, resource: SheetResourceType) => sheetsApi.get(`/${sheet}/${sheetId}/${resource}`);
export const createResource = (sheet: SheetType, sheetId: string, resource: SheetResourceType, body: any) => sheetsApi.post(`/${sheet}/${sheetId}/${resource}`, { sheetId: sheetId, ...body });
export const updateResource = (sheet: SheetType, sheetId: string, resource: SheetResourceType, resourceId: string, body: any) =>
  sheetsApi.patch(`/${sheet}/${sheetId}/${resource}/${resourceId}`, body);
export const deleteResource = (sheet: SheetType, sheetId: string, resource: SheetResourceType, resourceId: string) => sheetsApi.delete(`/${sheet}/${sheetId}/${resource}/${resourceId}`);

export const leaveCampaign = (sheet: SheetType, sheetId: string) => sheetsApi.post(`/${sheet}/${sheetId}/leave-campaign`);
export const removePlayer = (sheet: SheetType, sheetId: string, body: any) => sheetsApi.post(`/${sheet}/${sheetId}/remove-player`, body);

export default sheetsApi;
