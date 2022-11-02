import { SheetType } from '../../../interfaces/sheet';

export interface Transaction {
  _id: string;
  sheetId: string;
  sheetType: SheetType;
  receivingSheetId: string;
  receivingSheetType: SheetType;
  senderName: string;
  recipientName: string;
  message: string;
  status: 'Pending' | 'Accepted' | 'Declined' | 'Revoked' | 'Error';
  sellPrice: number;
  document: any;
  documentType: 'weapons' | 'wearables' | 'consumables' | 'usables' | 'wallet';
}
