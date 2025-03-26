export interface Alert {
  title?: string;
  message: string;
  type: AlertType;
}

export type AlertType = 'success' | 'info' | 'warning' | 'error';
