export const getHealthMessage = (current, max) => {
  return current < -max
    ? `You are Totally Dead`
    : current <= 0
    ? `You are Nearly Dead`
    : current === 1
    ? `You are as good as dead`
    : current < max / 5
    ? `You are mauled and will gain 1 injured each time you take damage`
    : current < max / 2
    ? `You are bloodied`
    : current >= (max / 4) * 3
    ? `You are in great condition`
    : current >= (max / 4) * 2
    ? `You are in good condition`
    : `You are in perfect condition`;
};

export const getWalletMessage = wallet => {
  return wallet <= 0 ? 'You literally have no money' : 'Cash on your person';
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
