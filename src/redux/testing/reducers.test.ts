// import appReducer from '../app/app.reducer';
// import userReducer from '../user/user.reducer';
import resourceReducer from '../resource/resource.reducer';
// import characterReducer from '../character/character.reducer';
// import campaignReducer from '../campaign/campaign.reducer';

import { ResourceActionTypes } from '../resource/resource.types';
import { ResourceType } from '../../models/enums';
import { ConsumableCategory } from '../../models/interfaces/data';

describe('resource reducer', () => {
  const initialStateMock = {
    species: null,
    weapons: null,
    augmentationGroups: null,
    consumableCategories: null,
    creatureTypes: null,
    npcTypes: null,
    error: null,
  };

  // it('should return the initial state', () => {
  //   expect(resourceReducer(undefined, {})).toEqual(initialStateMock);
  // });

  it('should handle FETCH_RESOURCE_SUCCESS', () => {
    const mockCategories: ConsumableCategory[] = [
      {
        id: '1',
        name: 'Fake Name 1',
        description: 'Fake description 1.',
      },
      {
        id: '2',
        name: 'Fake Name 2',
        description: 'Fake description 2.',
      },
    ];

    expect(resourceReducer(undefined, { type: ResourceActionTypes.FETCH_RESOURCE_SUCCESS, payload: { resourceType: ResourceType.ConsumableCategories, data: mockCategories } })).toEqual({
      ...initialStateMock,
      consumableCategories: mockCategories,
    });
  });

  it('should handle FETCH_RESOURCE_FAILURE', () => {});
});
