import { Document } from '../_partials';

export interface Invite extends Document {
  _id: string;
  sheetId: string;
  charSheetId: string;
  campaignName: string;
  ccName: string;
  message: string;
  status: 'Pending' | 'Accepted' | 'Declined' | 'Revoked' | 'Error';
}
