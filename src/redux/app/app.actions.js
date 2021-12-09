import AppActionTypes from './app.types';

export const setModal = modal => ({
  type: AppActionTypes.SET_MODAL,
  payload: modal,
});

export const setSlideOver = slideOver => ({
  type: AppActionTypes.SET_SLIDE_OVER,
  payload: slideOver,
});

export const addFlashMessage = flashMessage => ({
  type: AppActionTypes.ADD_FLASH_MESSAGE,
  payload: flashMessage,
});
