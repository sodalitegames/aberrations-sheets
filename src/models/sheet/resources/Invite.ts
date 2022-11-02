export interface Invite {
  _id: string;
  sheetId: string;
  charSheetId: string;
  campaignName: string;
  ccName: string;
  message: string;
  status: 'Pending' | 'Accepted' | 'Declined' | 'Revoked' | 'Error';
}
