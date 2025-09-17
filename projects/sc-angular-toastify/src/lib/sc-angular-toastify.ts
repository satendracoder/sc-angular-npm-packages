import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';
import { Toast } from './toast.model';

@Component({
  selector: 'sc-angular-toastify',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sc-toast-wrap">
      <div *ngFor="let t of toasts" class="sc-toast sc-{{ t.type }}">
        {{ t.message }}
        <button (click)="close(t.id)">✕</button>
      </div>
    </div>
  `,
  styles: [
    `
      .sc-toast-wrap {
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 9999;
      }
      .sc-toast {
        padding: 8px 12px;
        margin-bottom: 8px;
        border-radius: 6px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-width: 200px;
      }
      .sc-success {
        background: #e6ffed;
        color: #046b25;
      }
      .sc-error {
        background: #ffe6e6;
        color: #7b0000;
      }
      .sc-info {
        background: #e6f0ff;
        color: #003366;
      }
      .sc-warn {
        background: #fff6e6;
        color: #664400;
      }
      button {
        border: none;
        background: transparent;
        cursor: pointer;
        margin-left: 8px;
        font-weight: bold;
      }
    `,
  ],
})
export class ScAngularToastify implements OnInit {
  toasts: Toast[] = [];

  constructor(private service: ToastService) {}

  ngOnInit() {
    this.service.getToasts().subscribe((list) => (this.toasts = list));
  }

  close(id: number) {
    this.service.remove(id);
  }
}
