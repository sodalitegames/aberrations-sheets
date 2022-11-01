import { createSelector } from 'reselect';

import { RootState } from '../root-reducer';

const calculateInitiative = (entity: any) => {
  const die = entity.agility.die > entity.persona.die ? entity.agility.die : entity.persona.die;
  const roll = Math.ceil(Math.random() * die);
  return roll;
};

const selectCampaign = (state: RootState) => state.campaign;

export const selectCurrentCampaign = createSelector([selectCampaign], campaign => campaign.current);

export const selectCampaignError = createSelector([selectCampaign], campaign => campaign.error);
export const selectLoading = createSelector([selectCampaign], campaign => campaign.loading);
export const selectPermissions = createSelector([selectCampaign], campaign => campaign.reload);
export const selectReload = createSelector([selectCampaign], campaign => campaign.reload);

export const selectCompletedSessions = createSelector([selectCurrentCampaign], current => current.sessions.filter((session: any) => session.completed));
export const selectFutureSessions = createSelector([selectCurrentCampaign], current => current.sessions.filter((session: any) => !session.completed && !session.active));
export const selectActiveSessions = createSelector([selectCurrentCampaign], current => current.sessions.filter((session: any) => session.active));

export const selectWeapons = createSelector([selectCurrentCampaign], current => (current ? current.weapons.filter((weapon: any) => !weapon.archived) : []));
export const selectWearables = createSelector([selectCurrentCampaign], current => (current ? current.wearables.filter((wearable: any) => !wearable.archived) : []));
export const selectConsumables = createSelector([selectCurrentCampaign], current => (current ? current.consumables.filter((consumable: any) => !consumable.archived) : []));
export const selectUsables = createSelector([selectCurrentCampaign], current => (current ? current.usables.filter((usable: any) => !usable.archived) : []));
export const selectCreatures = createSelector([selectCurrentCampaign], current => (current ? current.creatures.filter((creature: any) => !creature.archived) : []));
export const selectNpcs = createSelector([selectCurrentCampaign], current => (current ? current.npcs.filter((npc: any) => !npc.archived) : []));
export const selectEnvironments = createSelector([selectCurrentCampaign], current => (current ? current.environments.filter((environment: any) => !environment.archived) : []));

export const selectCombats = createSelector([selectCurrentCampaign], current => (current ? current.combats : []));

export const selectPotentialCombatants = createSelector([selectCurrentCampaign], current =>
  current
    ? [
        ...current.players.map((player: any) => ({ ...player, type: 'players', initiative: calculateInitiative(player) })),
        ...current.npcs.map((npc: any) => ({ ...npc, type: 'npcs', initiative: calculateInitiative(npc) })),
        ...current.creatures.map((creature: any) => ({ ...creature, type: 'creatures', initiative: calculateInitiative(creature) })),
      ].filter((combatant: any) => !combatant.archived)
    : // .sort((prev, curr) => (prev.initiative < curr.initiative ? 1 : -1))
      []
);

export const selectArchivedWeapons = createSelector([selectCurrentCampaign], current => (current ? current.weapons.filter((weapon: any) => weapon.archived) : []));
export const selectArchivedWearables = createSelector([selectCurrentCampaign], current => (current ? current.wearables.filter((wearable: any) => wearable.archived) : []));
export const selectArchivedConsumables = createSelector([selectCurrentCampaign], current => (current ? current.consumables.filter((consumable: any) => consumable.archived) : []));
export const selectArchivedUsables = createSelector([selectCurrentCampaign], current => (current ? current.usables.filter((usable: any) => usable.archived) : []));
export const selectArchivedCreatures = createSelector([selectCurrentCampaign], current => (current ? current.creatures.filter((creature: any) => creature.archived) : []));
export const selectArchivedNpcs = createSelector([selectCurrentCampaign], current => (current ? current.npcs.filter((npc: any) => npc.archived) : []));
export const selectArchivedEnvironments = createSelector([selectCurrentCampaign], current => (current ? current.environments.filter((environment: any) => environment.archived) : []));

export const selectPendingTransactions = createSelector([selectCurrentCampaign], current =>
  current
    ? { sent: current.transactions.sent.filter((transac: any) => transac.status === 'Pending'), received: current.transactions.received.filter((transac: any) => transac.status === 'Pending') }
    : { sent: [], received: [] }
);

export const selectResolvedTransactions = createSelector([selectCurrentCampaign], current =>
  current
    ? { sent: current.transactions.sent.filter((transac: any) => transac.status !== 'Pending'), received: current.transactions.received.filter((transac: any) => transac.status !== 'Pending') }
    : { sent: [], received: [] }
);
