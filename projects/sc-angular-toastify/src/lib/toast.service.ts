import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Toast, ToastType } from './toast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toasts: Toast[] = [];
  private toasts$ = new Subject<Toast[]>();

  getToasts() {
    return this.toasts$.asObservable();
  }

  show(message: string, type: ToastType = 'info', duration = 3000) {
    const toast: Toast = { id: Date.now(), message, type, duration };
    this.toasts.push(toast);
    this.toasts$.next(this.toasts);

    setTimeout(() => this.remove(toast.id), duration);
  }

  remove(id: number) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.toasts$.next(this.toasts);
  }

  clear() {
    this.toasts = [];
    this.toasts$.next(this.toasts);
  }
}
