import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

import { TAlert } from './alerts.types';

@Injectable()
export class AlertsService {
  alerts: string[];

  constructor(private snackBar: MatSnackBar) {
    this.alerts = [];
  }

  static s_from_alert(alert: string | TAlert | Error): string {
    if (alert == null) return 'undefined error';

    const to_known_else = ((k: string | number, els?: string): string => {
      const known = {
        'Gateway Timeout': 'API server not available',
        504: 'API server not available'
      };
      return known[k] == null ? (els == null ? k : els) : known[k];
    });

    if (typeof alert === 'string') return to_known_else(alert);
    else if (alert instanceof HttpErrorResponse || ['status', 'statusText'].every(alert.hasOwnProperty))
      return to_known_else((alert as HttpErrorResponse).status, (alert as HttpErrorResponse).statusText);
    else if (alert instanceof Error) return to_known_else(alert.message);
    return Object
      .keys(alert)
      .map(k => alert[k])
      .join('\t');
  }

  public add(alert: string | TAlert | Error, action?: string | false, config?: MatSnackBarConfig): void {
    const alert_s = alert && (typeof alert === 'string' ? alert
      : (alert instanceof Error ? alert.message : Object
        .keys(alert)
        .map(k => alert[k])
        .join('\t'))) || 'undefined alert';

    this.alerts.push(alert_s);
    // console.warn('AlertsService::alerts =', this.alerts, ';');
    this.snackBar.open(
      alert_s,
      !action && typeof action !== 'boolean' ? 'Close' : action as string,
      config
    );
  }
}
