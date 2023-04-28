export interface AppError {
  status: 'alert' | 'error' | 'fail' | string;
  heading?: string;
  message: string;
  data?: any;
}
