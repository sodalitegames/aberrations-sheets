export const getHealthMessage = (current, max) => {
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

export const getWalletMessage = wallet => {
  return wallet <= 0 ? 'You literally have no money' : 'Cash on your person';
};

export const getTransactionHeading = ({ senderName, recipientName, sellPrice, documentType, document, status }, sent) => {
  if (status === 'Error') return `Something went wrong with this transaction`;

  if (sent) {
    if (documentType === 'wallet') {
      if (status === 'Accepted') return `${recipientName} accepted your offer to pay them ${document.amount} monies`;
      if (status === 'Declined') return `${recipientName} declined your offer to pay them ${document.amount} monies`;
      if (status === 'Revoked') return `You revoked your offer to pay ${recipientName} ${document.amount} monies`;
      if (status === 'Pending') return `You offered to pay ${recipientName} ${document.amount} monies`;

      return;
    }

    if (sellPrice) {
      if (status === 'Accepted') return `${recipientName} accepted your offer to buy your ${document.nickname || document.name} for ${sellPrice} monies`;
      if (status === 'Declined') return `${recipientName} declined your offer to buy your ${document.nickname || document.name} for ${sellPrice} monies`;
      if (status === 'Revoked') return `You revoked your offer to sell ${recipientName} your ${document.nickname || document.name} for ${sellPrice} monies`;
      if (status === 'Pending') return `You offered to sell ${recipientName} your ${document.nickname || document.name} for ${sellPrice} monies`;

      return;
    }

    if (status === 'Accepted') return `${recipientName} accepted your offer to give them ${document.nickname || document.name}`;
    if (status === 'Declined') return `${recipientName} declined your offer to give them ${document.nickname || document.name}`;
    if (status === 'Revoked') return `You revoked your offer to give ${recipientName} your ${document.nickname || document.name}`;
    if (status === 'Pending') return `You offered to give ${recipientName} your ${document.nickname || document.name}`;

    return;
  }

  if (documentType === 'wallet') {
    if (status === 'Accepted') return `You accepted ${senderName}'s offer to pay you ${document.amount} monies`;
    if (status === 'Declined') return `You declined ${senderName}'s offer to pay you ${document.amount} monies`;
    if (status === 'Revoked') return `${senderName} revoked their offer to pay you ${document.amount} monies`;
    if (status === 'Pending') return `${senderName} has offered to pay you ${document.amount} monies`;
    return;
  }

  if (sellPrice) {
    if (status === 'Accepted') return `You accepted ${senderName}'s offer to sell you their ${document.nickname || document.name} for ${sellPrice} monies`;
    if (status === 'Declined') return `You declined ${senderName}'s offer to sell you their ${document.nickname || document.name} for ${sellPrice} monies`;
    if (status === 'Revoked') return `${senderName} revoked their offer to sell you their ${document.nickname || document.name} for ${sellPrice} monies`;
    if (status === 'Pending') return `${senderName} has offered to sell you their ${document.nickname || document.name} for ${sellPrice} monies`;

    return;
  }

  if (status === 'Accepted') return `You accepted ${senderName}'s offer to give you their ${document.nickname || document.name}`;
  if (status === 'Declined') return `You declined ${senderName}'s offer to give you their ${document.nickname || document.name}`;
  if (status === 'Revoked') return `${senderName} revoked their offer to give you their ${document.nickname || document.name}`;
  if (status === 'Pending') return `${senderName} has offered to give you their ${document.nickname || document.name}`;

  return;
};

export const getRolledDiceNotificationMessage = (rollData, stat) => {
  // If not rolling for a stat
  if (!stat) {
    if (rollData.critical.success) {
      return `You rolled ${rollData.results.rolls.length} ${rollData.results.rolls.length > 1 ? 'dice' : 'die'} and got a critical success (${rollData.successes} successes)`;
    }

    return `You rolled ${rollData.results.rolls.length} ${rollData.results.rolls.length > 1 ? 'dice' : 'die'} and got ${rollData.successes} / ${rollData.results.rolls.length} successess.`;
  }

  // If rolling for a stat
  if (rollData.critical.success) {
    return `You rolled for ${stat} (${rollData.results.rolls.length} ${rollData.results.rolls.length > 1 ? 'dice' : 'die'}) and got a critical success (${rollData.successes} successes)`;
  }

  return `You rolled for ${stat} (${rollData.results.rolls.length} ${rollData.results.rolls.length > 1 ? 'dice' : 'die'}) and got ${rollData.successes} / ${rollData.results.rolls.length} successess.`;
};
