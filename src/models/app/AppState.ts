import ModalTypes from '../../utils/ModalTypes';
import SlideOverTypes from '../../utils/SlideOverTypes';

export interface Modal {
  type: ModalTypes;
  show?: boolean;
  id?: string;
  data?: any;
}

export interface SlideOver {
  type: SlideOverTypes;
  show?: boolean;
  id?: string;
  data?: any;
}

export interface Notification {
  _id: number;
  heading: string;
  message: string;
  dismissed: boolean;
}

export interface Alert {
  short: string;
  long: string;
  button: {
    text: string;
    href: string;
    external?: boolean;
  };
}
