import { SheetType } from '../index';
import { Consumable, Usable, Weapon, Wearable } from './index';

export type Wallet = {
  amount: number;
};

export type TransactionDocument = Weapon | Wearable | Consumable | Usable | Wallet;

export enum TransactionDocumentType {
  weapons = 'weapons',
  wearables = 'wearables',
  consumables = 'consumables',
  usables = 'usables',
  wallet = 'wallet',
}

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
  document: TransactionDocument;
  documentType: TransactionDocumentType;
}
