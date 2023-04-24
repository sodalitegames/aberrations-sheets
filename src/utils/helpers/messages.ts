import { RollResults } from '@aberrations-rpg/functions/lib/roll/roll';
import { Transaction, TransactionDocument, Wallet, Weapon } from '../../models/sheet/resources';
import { Belonging, StatType } from '../../models/sheet';

export const getHealthMessage = (current: number, max: number): string => {
  return current < -max
    ? `You are Totally Dead`
    : current <= 0
    ? `You are Nearly Dead`
    : current === 1
    ? `You are as good as dead`
    : current < max / 5
    ? `You are mauled`
    : current < max / 2
    ? `You are bloodied`
    : current >= (max / 4) * 3
    ? `You are in great condition`
    : current >= (max / 4) * 2
    ? `You are in good condition`
    : `You are in perfect condition`;
};

export const getWalletMessage = (wallet: number): string => {
  return wallet <= 0 ? 'You literally have no money' : 'Cash on your person';
};

const getName = (document: TransactionDocument): string => {
  return `${(document as Weapon).nickname || (document as Belonging).name}`;
};

const getAmount = (document: TransactionDocument): number => {
  return (document as Wallet).amount;
};

export const getTransactionHeading = ({ senderName, recipientName, sellPrice, documentType, document, status }: Transaction, sent: boolean): string => {
  if (status === 'Error') return `Something went wrong with this transaction`;

  if (sent) {
    if (documentType === 'wallet') {
      if (status === 'Accepted') return `${recipientName} accepted your offer to pay them ${getAmount(document)} monies`;
      if (status === 'Declined') return `${recipientName} declined your offer to pay them ${getAmount(document)} monies`;
      if (status === 'Revoked') return `You revoked your offer to pay ${recipientName} ${getAmount(document)} monies`;
      if (status === 'Pending') return `You offered to pay ${recipientName} ${getAmount(document)} monies`;
    }

    if (sellPrice) {
      if (status === 'Accepted') return `${recipientName} accepted your offer to buy your ${getName(document)} for ${sellPrice} monies`;
      if (status === 'Declined') return `${recipientName} declined your offer to buy your ${getName(document)} for ${sellPrice} monies`;
      if (status === 'Revoked') return `You revoked your offer to sell ${recipientName} your ${getName(document)} for ${sellPrice} monies`;
      if (status === 'Pending') return `You offered to sell ${recipientName} your ${getName(document)} for ${sellPrice} monies`;
    }

    if (status === 'Accepted') return `${recipientName} accepted your offer to give them ${getName(document)}`;
    if (status === 'Declined') return `${recipientName} declined your offer to give them ${getName(document)}`;
    if (status === 'Revoked') return `You revoked your offer to give ${recipientName} your ${getName(document)}`;
    if (status === 'Pending') return `You offered to give ${recipientName} your ${getName(document)}`;
  }

  if (documentType === 'wallet') {
    if (status === 'Accepted') return `You accepted ${senderName}'s offer to pay you ${getAmount(document)} monies`;
    if (status === 'Declined') return `You declined ${senderName}'s offer to pay you ${getAmount(document)} monies`;
    if (status === 'Revoked') return `${senderName} revoked their offer to pay you ${getAmount(document)} monies`;
    if (status === 'Pending') return `${senderName} has offered to pay you ${getAmount(document)} monies`;
  }

  if (sellPrice) {
    if (status === 'Accepted') return `You accepted ${senderName}'s offer to sell you their ${getName(document)} for ${sellPrice} monies`;
    if (status === 'Declined') return `You declined ${senderName}'s offer to sell you their ${getName(document)} for ${sellPrice} monies`;
    if (status === 'Revoked') return `${senderName} revoked their offer to sell you their ${getName(document)} for ${sellPrice} monies`;
    if (status === 'Pending') return `${senderName} has offered to sell you their ${getName(document)} for ${sellPrice} monies`;
  }

  if (status === 'Accepted') return `You accepted ${senderName}'s offer to give you their ${getName(document)}`;
  if (status === 'Declined') return `You declined ${senderName}'s offer to give you their ${getName(document)}`;
  if (status === 'Revoked') return `${senderName} revoked their offer to give you their ${getName(document)}`;
  if (status === 'Pending') return `${senderName} has offered to give you their ${getName(document)}`;

  return 'error_generating_transaction_heading';
};

export const getRolledDiceNotificationMessage = (rollData: RollResults, stat?: StatType): string => {
  // If not rolling for a stat
  if (!stat) {
    if (rollData.critical.success) {
      return `You rolled a D${rollData.die} and got a critical success (${rollData.total}).`;
    }

    if (rollData.critical.failure) {
      return `You rolled a D${rollData.die} and got a critical failure (${rollData.total}).`;
    }

    return `You rolled a D${rollData.die} and got ${rollData.total}.`;
  }

  // If rolling for a stat
  if (rollData.critical.success) {
    return `You rolled for ${stat} (D${rollData.die}) and got a critical success (${rollData.total}).`;
  }

  if (rollData.critical.failure) {
    return `You rolled for ${stat} (D${rollData.die}) and got a critical failure (${rollData.total}).`;
  }

  return `You rolled for ${stat} (D${rollData.die}) and got ${rollData.total}.`;
};
