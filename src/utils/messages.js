export const getHealthMessage = (current, max) => {
  return current <= 0
    ? `You're as dead as a doornail`
    : current === 1
    ? `You're as good as dead`
    : current < max / 4
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
