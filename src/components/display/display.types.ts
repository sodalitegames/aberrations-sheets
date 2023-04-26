import { ListItemAction } from '../data/ListItem';

export interface DisplayProps {
  noButtonPanel?: boolean;
  condensed?: boolean | 'view';
  listItem?: boolean;
}

export interface DisplayBelongingProps {
  actions?: ListItemAction[];
  playerId?: string;
}
