import { createSelector } from 'reselect';

import { RootState } from '../root-reducer';
import { CombatantType, Creature, Npc, Player } from '../../models/sheet/resources';

interface PlayerCombatant extends Player {
  combatantType: CombatantType;
}

interface NpcCombatant extends Npc {
  combatantType: CombatantType;
}

interface CreatureCombatant extends Creature {
  combatantType: CombatantType;
}

const selectCampaign = (state: RootState) => state.campaign;

export const selectCurrentCampaign = createSelector([selectCampaign], campaign => campaign.current);

export const selectCampaignError = createSelector([selectCampaign], campaign => campaign.error);
export const selectLoading = createSelector([selectCampaign], campaign => campaign.loading);
export const selectPermissions = createSelector([selectCampaign], campaign => campaign.reload);
export const selectReload = createSelector([selectCampaign], campaign => campaign.reload);

export const selectCompletedSessions = createSelector([selectCurrentCampaign], current => (current ? current.sessions.filter(session => session.completed) : []));
export const selectFutureSessions = createSelector([selectCurrentCampaign], current => (current ? current.sessions.filter(session => !session.completed && !session.active) : []));
export const selectActiveSessions = createSelector([selectCurrentCampaign], current => (current ? current.sessions.filter(session => session.active) : []));

export const selectWeapons = createSelector([selectCurrentCampaign], current => (current ? current.weapons.filter(weapon => !weapon.archived) : []));
export const selectWearables = createSelector([selectCurrentCampaign], current => (current ? current.wearables.filter(wearable => !wearable.archived) : []));
export const selectConsumables = createSelector([selectCurrentCampaign], current => (current ? current.consumables.filter(consumable => !consumable.archived) : []));
export const selectUsables = createSelector([selectCurrentCampaign], current => (current ? current.usables.filter(usable => !usable.archived) : []));
export const selectCreatures = createSelector([selectCurrentCampaign], current => (current ? current.creatures.filter(creature => !creature.archived) : []));
export const selectNpcs = createSelector([selectCurrentCampaign], current => (current ? current.npcs.filter(npc => !npc.archived) : []));
export const selectEnvironments = createSelector([selectCurrentCampaign], current => (current ? current.environments.filter(environment => !environment.archived) : []));

export const selectCombats = createSelector([selectCurrentCampaign], current => (current ? current.combats : []));

export const selectPotentialCombatants = createSelector([selectCurrentCampaign], (current): (PlayerCombatant | CreatureCombatant | NpcCombatant)[] =>
  current
    ? [
        ...current.players.map(player => ({ ...player, combatantType: CombatantType.players })),
        ...current.npcs.map(npc => ({ ...npc, combatantType: CombatantType.npcs })),
        ...current.creatures.map(creature => ({ ...creature, combatantType: CombatantType.creatures })),
      ].filter(combatant => !combatant.archived)
    : []
);

export const selectArchivedWeapons = createSelector([selectCurrentCampaign], current => (current ? current.weapons.filter(weapon => weapon.archived) : []));
export const selectArchivedWearables = createSelector([selectCurrentCampaign], current => (current ? current.wearables.filter(wearable => wearable.archived) : []));
export const selectArchivedConsumables = createSelector([selectCurrentCampaign], current => (current ? current.consumables.filter(consumable => consumable.archived) : []));
export const selectArchivedUsables = createSelector([selectCurrentCampaign], current => (current ? current.usables.filter(usable => usable.archived) : []));
export const selectArchivedCreatures = createSelector([selectCurrentCampaign], current => (current ? current.creatures.filter(creature => creature.archived) : []));
export const selectArchivedNpcs = createSelector([selectCurrentCampaign], current => (current ? current.npcs.filter(npc => npc.archived) : []));
export const selectArchivedEnvironments = createSelector([selectCurrentCampaign], current => (current ? current.environments.filter(environment => environment.archived) : []));

export const selectPendingTransactions = createSelector([selectCurrentCampaign], current =>
  current
    ? { sent: current.transactions.sent.filter(transac => transac.status === 'Pending'), received: current.transactions.received.filter(transac => transac.status === 'Pending') }
    : { sent: [], received: [] }
);

export const selectResolvedTransactions = createSelector([selectCurrentCampaign], current =>
  current
    ? { sent: current.transactions.sent.filter(transac => transac.status !== 'Pending'), received: current.transactions.received.filter(transac => transac.status !== 'Pending') }
    : { sent: [], received: [] }
);
