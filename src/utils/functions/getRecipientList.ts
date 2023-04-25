import { Sheet, SheetType, CharacterSheet, CampaignSheet } from '../../models/sheet';

export const getRecipientList = (sheetType: SheetType, sheet: Sheet) => {
  if (sheetType === 'characters') {
    const campaign = (sheet as CharacterSheet).campaign;

    if (!campaign) return [];

    const list = campaign.players.filter(player => player._id !== sheet._id).map(player => ({ name: player.characterName, id: player._id, sheetType: 'characters' }));

    list.push({ name: `${campaign.ccNickname || campaign.ccName} (CC)`, id: campaign._id, sheetType: 'campaigns' });

    return list;
  }

  if (sheetType === 'campaigns') {
    return (sheet as CampaignSheet).players.map(player => ({ name: player.characterName, id: player._id, sheetType: 'characters' }));
  }

  return [];
};
