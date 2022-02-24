enum ModalTypes {
  // Character Forms
  takeDamage = 'TAKE_DAMAGE',
  healDamage = 'HEAL_DAMAGE',
  receiveMoney = 'RECEIVE_MONEY',
  payMoney = 'PAY_MONEY',
  editSpentUpgradePoints = 'EDIT_SPENT_UPGRADE_POINTS',
  editMortality = 'EDIT_MORTALITY',
  editStat = 'EDIT_STAT',
  editCondition = 'EDIT_CONDITION',
  takeARest = 'TAKE_A_REST',
  errorEquippingBelonging = 'ERROR_EQUIPPING_BELONGING',

  // Campaign Forms
  sendInvite = 'SEND_INVITE',
  assignBelonging = 'ASSIGN_BELONGING',

  // Shared Forms
  deleteSheet = 'DELETE_SHEET',
  deleteResource = 'DELETE_RESOURCE',
  showBelonging = 'SHOW_BELONGING',
  updateInviteStatus = 'UPDATE_INVITE_STATUS',
  manageTransaction = 'MANAGE_TRANSACTION',
  removeCharacterFromCampaign = 'REMOVE_CHARACTER_FROM_CAMPAIGN',
}

export default ModalTypes;
