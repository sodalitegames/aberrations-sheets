import CharacterActionTypes from './character.types';

// Fetch Character
export const fetchCurrentCharacterStart = charId => ({
  type: CharacterActionTypes.FETCH_CURRENT_CHARACTER_START,
  payload: { charId },
});

export const fetchCurrentCharacterSuccess = currentCharacter => ({
  type: CharacterActionTypes.FETCH_CURRENT_CHARACTER_SUCCESS,
  payload: currentCharacter,
});

export const fetchCurrentCharacterFailure = error => ({
  type: CharacterActionTypes.FETCH_CURRENT_CHARACTER_FAILURE,
  payload: error,
});

// Update Character
export const updateCharacterStart = (charId, body) => ({
  type: CharacterActionTypes.UPDATE_CHARACTER_START,
  payload: { charId, body },
});

export const updateCharacterSuccess = updatedCharacter => ({
  type: CharacterActionTypes.UPDATE_CHARACTER_SUCCESS,
  payload: updatedCharacter,
});

export const updateCharacterFailure = error => ({
  type: CharacterActionTypes.UPDATE_CHARACTER_FAILURE,
  payload: error,
});

// Delete Character
export const deleteCharacterStart = charId => ({
  type: CharacterActionTypes.DELETE_CHARACTER_START,
  payload: { charId },
});

export const deleteCharacterSuccess = message => ({
  type: CharacterActionTypes.DELETE_CHARACTER_SUCCESS,
  payload: message,
});

export const deleteCharacterFailure = error => ({
  type: CharacterActionTypes.DELETE_CHARACTER_FAILURE,
  payload: error,
});

// Get Character Resources
export const fetchCharacterResourcesStart = (charId, resourceType) => ({
  type: CharacterActionTypes.FETCH_CHARACTER_RESOURCES_START,
  payload: { charId, resourceType },
});

export const fetchCharacterResourcesSuccess = fetchedResource => ({
  type: CharacterActionTypes.FETCH_CHARACTER_RESOURCES_SUCCESS,
  payload: fetchedResource,
});

export const fetchCharacterResourcesFailure = error => ({
  type: CharacterActionTypes.FETCH_CHARACTER_RESOURCES_FAILURE,
  payload: error,
});

// Create Character Resource
export const createCharacterResourceStart = (charId, resourceType, body) => ({
  type: CharacterActionTypes.CREATE_CHARACTER_RESOURCE_START,
  payload: { charId, resourceType, body },
});

export const createCharacterResourceSuccess = newResource => ({
  type: CharacterActionTypes.CREATE_CHARACTER_RESOURCE_SUCCESS,
  payload: newResource,
});

export const createCharacterResourceFailure = error => ({
  type: CharacterActionTypes.CREATE_CHARACTER_RESOURCE_FAILURE,
  payload: error,
});

// Update Character Resource
export const updateCharacterResourceStart = (charId, resourceType, resourceId, body) => ({
  type: CharacterActionTypes.UPDATE_CHARACTER_RESOURCE_START,
  payload: { charId, resourceType, resourceId, body },
});

export const updateCharacterResourceSuccess = updatedResource => ({
  type: CharacterActionTypes.UPDATE_CHARACTER_RESOURCE_SUCCESS,
  payload: updatedResource,
});

export const updateCharacterResourceFailure = error => ({
  type: CharacterActionTypes.UPDATE_CHARACTER_RESOURCE_FAILURE,
  payload: error,
});

// Delete Character Resource
export const deleteCharacterResourceStart = (charId, resourceType, resourceId) => ({
  type: CharacterActionTypes.DELETE_CHARACTER_RESOURCE_START,
  payload: { charId, resourceType, resourceId },
});

export const deleteCharacterResourceSuccess = message => ({
  type: CharacterActionTypes.DELETE_CHARACTER_RESOURCE_SUCCESS,
  payload: message,
});

export const deleteCharacterResourceFailure = error => ({
  type: CharacterActionTypes.DELETE_CHARACTER_RESOURCE_FAILURE,
  payload: error,
});
