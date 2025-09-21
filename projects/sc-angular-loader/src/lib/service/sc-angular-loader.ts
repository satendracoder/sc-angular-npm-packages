import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root', // standalone service, available globally
})
export class SLoader {
  /** Signal to track loading state */
  public loading: WritableSignal<boolean> = signal(false);

  /** Show loader */
  show() {
    this.loading.set(true);
  }

  /** Hide loader */
  hide() {
    this.loading.set(false);
  }
}
