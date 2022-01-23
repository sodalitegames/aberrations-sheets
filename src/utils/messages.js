export const getHealthMessage = (current, max) => {
  return current <= 0
    ? `You're as dead as a doornail`
    : current === 1
    ? `You're as good as dead`
    : current < max / 5
    ? `You're in mauled condition`
    : current < max / 2
    ? `You're in bloodied condition`
    : current >= (max / 4) * 3
    ? `You're in great condition`
    : current >= (max / 4) * 2
    ? `You're in good condition`
    : `You're in perfect condition`;
};

export const getWalletMessage = wallet => {
  return 'Cash on your person';
};

export const getTransactionHeading = ({ senderName, recipientName, sellPrice, documentType, document }, sent) => {
  if (sent) {
    if (documentType === 'wallet') {
      return `You offered to pay ${recipientName} ${document.wallet} monies`;
    }

    if (sellPrice) {
      return `You asked ${recipientName} to buy your ${document.name} for ${sellPrice} monies`;
    }

    return `You offered your ${document.name} to ${recipientName}`;
  }

  if (documentType === 'wallet') {
    return `${senderName} wants to pay you ${document.wallet} monies`;
  }

  if (sellPrice) {
    return `${senderName} wants to sell you their ${document.name} for ${sellPrice} monies`;
  }

  return `${senderName} wants to give you their ${document.name}`;
};
