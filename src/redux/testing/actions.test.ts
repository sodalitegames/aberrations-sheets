// import * as appActions from '../app/app.actions';
// import * as userActions from '../user/user.actions';
import * as resourceActions from '../resource/resource.actions';
// import * as sheetActions from '../sheet/sheet.actions';

import { ResourceAction, ResourceActionTypes } from '../resource/resource.types';

import { ResourceType } from '../../models/enums';
import { CreatureType } from '../../models/interfaces/data';

describe('resource actions', () => {
  // USE A MOCK REDUX STORE FOR THIS
  it('should create an action to fetch a resource', () => {
    const expectedAction: ResourceAction = {
      type: ResourceActionTypes.FETCH_RESOURCE_START,
      payload: {
        resourceType: ResourceType.CreatureTypes,
      },
    };

    expect(resourceActions.fetchResourceStart(ResourceType.CreatureTypes)).toEqual(expectedAction);
  });

  // USE A MOCK API FOR THIS
  it('handles fetching data from aberrations api', () => {});

  it('should create an action to successfully add a fetched resource', () => {
    const mockCreatures: CreatureType[] = [
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

    const expectedAction: ResourceAction = {
      type: ResourceActionTypes.FETCH_RESOURCE_SUCCESS,
      payload: {
        resourceType: ResourceType.CreatureTypes,
        data: mockCreatures,
      },
    };

    expect(resourceActions.fetchResourceSuccess(ResourceType.CreatureTypes, mockCreatures)).toEqual(expectedAction);
  });
});
