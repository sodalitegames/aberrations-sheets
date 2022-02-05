export interface AppError {
  status: 'alert' | 'error' | 'fail';
  heading?: string;
  message: string;
  data?: any;
}
