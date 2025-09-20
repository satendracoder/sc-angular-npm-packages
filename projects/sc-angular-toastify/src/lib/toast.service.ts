import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Toast, ToastType, ToastPosition } from './toast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toasts: Toast[] = [];
  private toasts$ = new Subject<Toast[]>();

  getToasts() {
    return this.toasts$.asObservable();
  }

  show(
    message: string,
    type: ToastType = 'info',
    duration = 3000,
    position: ToastPosition = 'top-right'
  ) {
    const toast: Toast = { id: Date.now(), message, type, duration, position };
    this.toasts.push(toast);
    this.toasts$.next([...this.toasts]);

    // Start timer for removal
    setTimeout(() => this.startRemove(toast.id), duration);
  }

  private startRemove(id: number) {
    const toast = this.toasts.find((t) => t.id === id);
    if (!toast) return;

    toast.closing = true;
    this.toasts$.next([...this.toasts]);

    // wait for slide-out animation to finish (300ms)
    setTimeout(() => this.remove(id), 300);
  }

  remove(id: number) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.toasts$.next([...this.toasts]);
  }

  clear() {
    this.toasts = [];
    this.toasts$.next([...this.toasts]);
  }
}
