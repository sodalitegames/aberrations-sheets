// import * as appActions from '../app/app.actions';
// import * as userActions from '../user/user.actions';
import * as resourceActions from '../resource/resource.actions';
// import * as sheetActions from '../sheet/sheet.actions';

import { ResourceAction, ResourceActionTypes } from '../resource/resource.types';

import { FetchedResourceType, CreatureType } from '../../models/resource';

describe('resource actions', () => {
  // USE A MOCK REDUX STORE FOR THIS
  it('should create an action to fetch a resource', () => {
    const expectedAction: ResourceAction = {
      type: ResourceActionTypes.FETCH_RESOURCE_START,
      payload: {
        resourceType: FetchedResourceType.CreatureTypes,
      },
    };

    expect(resourceActions.fetchResourceStart(FetchedResourceType.CreatureTypes)).toEqual(expectedAction);
  });

  // USE A MOCK API FOR THIS
  it('handles fetching data from aberrations api', () => {});

  it('should create an action to successfully add a fetched resource', () => {
    const mockCreatures: CreatureType[] = [
      {
        id: '1',
        name: 'Fake Name 1',
        summary: 'Fake summary 1.',
        description: 'Fake description 1.',
      },
      {
        id: '2',
        name: 'Fake Name 2',
        summary: 'Fake summary 2.',
        description: 'Fake description 2.',
      },
    ];

    const expectedAction: ResourceAction = {
      type: ResourceActionTypes.FETCH_RESOURCE_SUCCESS,
      payload: {
        resourceType: FetchedResourceType.CreatureTypes,
        data: mockCreatures,
      },
    };

    expect(resourceActions.fetchResourceSuccess(FetchedResourceType.CreatureTypes, mockCreatures)).toEqual(expectedAction);
  });
});
