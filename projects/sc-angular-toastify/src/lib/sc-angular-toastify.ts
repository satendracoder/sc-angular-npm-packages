import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';
import { Toast } from './toast.model';

@Component({
  selector: 'sc-angular-toastify',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngFor="let pos of positions" class="sc-toast-wrap {{ pos }}">
      <div
        *ngFor="let t of getToastsByPosition(pos)"
        class="sc-toast sc-{{ t.type }} {{ t.closing ? 'closing' : '' }}"
      >
        <img [src]="getIcon(t.type)" alt="{{ t.type }}" class="toast-icon" />
        <span class="toast-message">{{ t.message }}</span>
        <button (click)="close(t.id)">✕</button>
        <div
          class="progress"
          [style.--duration.ms]="t.duration"
          (animationend)="onProgressEnd(t.id)"
        ></div>
      </div>
    </div>
  `,
  styles: [
    `
      .sc-toast-wrap {
        position: fixed;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        z-index: 9999;
      }

      .sc-toast-wrap.top-right {
        top: 1rem;
        right: 1rem;
      }
      .sc-toast-wrap.top-left {
        top: 1rem;
        left: 1rem;
      }
      .sc-toast-wrap.bottom-right {
        bottom: 1rem;
        right: 1rem;
      }
      .sc-toast-wrap.bottom-left {
        bottom: 1rem;
        left: 1rem;
      }

      .sc-toast {
        position: relative;
        display: inline-flex;
        align-items: center;
        padding: 8px 12px;
        border-radius: 6px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        overflow: hidden;
        max-width: 300px;
        white-space: normal;
        word-break: break-word;
        animation: fadeIn 0.3s ease-out;
        gap: 8px;
      }

      .sc-toast.top-right,
      .sc-toast.top-left {
        animation-name: fadeInTop;
      }
      .sc-toast.bottom-right,
      .sc-toast.bottom-left {
        animation-name: fadeInBottom;
      }

      .sc-toast.closing {
        animation-name: slideOut;
        animation-duration: 0.3s;
      }

      .sc-success {
        background: #4caf50;
        color: #fff;
      }
      .sc-error {
        background-color: #f44336;
        color: #fff;
      }
      .sc-info {
        background-color: #2196f3;
        color: #fff;
      }
      .sc-warn {
        background-color: #ff9800;
        color: #fff;
      }

      .toast-icon {
        width: 20px;
        height: 20px;
      }

      .toast-message {
        flex: 1;
      }

      button {
        border: none;
        background: transparent;
        cursor: pointer;
        font-weight: bold;
        color: #fff;
      }

      .progress {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background-color: rgba(0, 0, 0, 0.59);
        width: 100%;
        transform-origin: left;
        animation: progressBar linear forwards;
        animation-duration: var(--duration, 3000ms);
      }

      @keyframes fadeInTop {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes fadeInBottom {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes slideOut {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(-20px);
        }
      }
      @keyframes progressBar {
        from {
          transform: scaleX(1);
        }
        to {
          transform: scaleX(0);
        }
      }
    `,
  ],
})
export class ScAngularToastify implements OnInit {
  positions: string[] = ['top-right', 'top-left', 'bottom-right', 'bottom-left'];
  toasts: Toast[] = [];

  constructor(private service: ToastService) {}

  ngOnInit() {
    this.service.getToasts().subscribe((list) => (this.toasts = list));
  }

  getToastsByPosition(pos: string) {
    return this.toasts.filter((t) => t.position === pos || (!t.position && pos === 'top-right'));
  }

  close(id: number) {
    this.service.remove(id);
  }

  onProgressEnd(id: number) {
    this.close(id);
  }

  getIcon(type: string): string {
    switch (type) {
      case 'success':
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABXdJREFUeNrsnY112jAQxy2/DkAmKJkgMEHoBIUJAhM0mSCvE5BOAJ0gZAKcCXAmgEwAncDVkYNnwMayfbI+fPeeXtrkBcv65X+nk+RzELBZZcKFTiZJMpBferJ1ZLvHb3exXbNYtp1sG9k+8f+xEGLDQNQHHwZ9iAPfw0ZtACmS7V22hU2AhCUQugjhQROAQEFJb7LNbVZPEyDGsr0mdtkS+tUmCB3ZHmVbJ3bb2nswCGKbuGX+gZE3NHRAEUW2wtmeu0EdZ0wzDNi+2Fy2Jxn8d04BAVUgjI6H3hdgTCSUBfUHh5qCNoB49RRGgPcFs8Op1QrBfOLVUC5hyiCHGVHlL4IQBkBYeqyKIhf2Q0KJrXBZOC1ctRTGwYWtKKbHggjGLGA7GAT7uREgDIMeimAYdkERFWEMcTbFRgxFVIDR5tlUFYPZV6QFCC6FrBmGvilx2WkvK6PalHiGf8x0QHCZoMfjW8lg3JSWWYQijAGqg62ejYoWJIUCjA5m4V0eT5J4cntt6V7FZT0zDNJ48lxZITjFXfE4kls/b9ZVpJApj50Wm5Z2WRjIBy0dMMiuJ+jzddggb39eXAGybCmQ43IHTmiWmqb7kbzODyWFtFgdJ2tPOBuCQYubUkmey/rVdhgNQXkodFm4L75mGJn5mA73dZPOS0JWh9oSuUaljIsUsm5RIlh6v0KDUuB5lX6mQjARZBjNKqWHYSLTZT0wDGUoE8L+DPOADBiGMhTKWPLzAgjKpscwlGMJ5QGPwWEDK60QhlEOxpg6UTwHcs8wjME4CqINCnEBxlEQInWxbeDfAQZXYIDtZF9vRCrZ2TIMYzAOdhsadFcwWBuGcWLd0ACIw8ExGLRbBMMwvqzzreGE8OIUH4CRNx4Q3bjLMPaeKjSgjDgj650QKMV1GGB3oWkYRFB8gLF3WaENMGpC8QVGkE4Mv5uGURGKVzDSnVlqKEWxxf2VygNU8Pljwvuf2VKJ6KAQHfnApM4SdYFS/FRGymV9Un8wRdmJHCjewkgD0eEGH4nApqF4DUMrEGlTKj+PUPq+w5AWh6nZkA6bEUKJPYcB9u8AJNZ4kZktFdkshwEW6VaINVAcgLHnkN6gShq4IFlQ9hAGuGWRDupxA9dsXCmuwDiMf9NAGoXiEIxMIB8NXlw7FMdggL2fA4ka7oA2KA7COI6/OLsREydPSAO9ozA2uJ19kakvDHSGTCmOwjjxTudA3gx1qDYUh2GcjHvWAzsmD8xVcl+Ow9gfkMtTiCm3VVkpjsO4GO8sIH8Nd1AZigcwwP6cZOs5Nwr1TUwfvr7qvjyBcfJ8YZ5CLqjZphRPYGSO87XSGrY8jXuiFI9gHHMPFYWA/bak4zN8M0/HIxi541tUL6tNz6wbV0eRQvbugsdOjxvO+8FVIFgAeMHjR5t3XCusrFoEk4snE2XlQd0imPjLTzyWJFb4MjHlUuPwRs7Ar7etmXBVo0IBlADC9XtrzKqCr4N+had7lE8u4oeNAv1HhnyMGyPV9x6WOkqKpwc5npSPG8oHSEqf7cVlDIaiZi/aX+iSiik+LWPosDkeEg8aAcJQ6GHUBsJQaGGQAGEodDAqBfWcQD/hQL8P4LUXY6lfTgwqgcr/bVv3IjvsR/4+dXwUGlxYG95XtcGkj+ygOvkzhtg5qGs79xwGbEv0iauT0ivkTC1DVItPLmyHLkrLPpHWWifYadiqfPElcAdf+xnub9pBXWBYwk/ctFm6HLhXBi8xsai2iAqIdrxMExUzxSI1NtkW+9UN2mqQvxh2Z1tUg/EdUWEhHBgUKCoMX3X+lcJ0NZLt3aYgLSxXDkyXB5hk3iGgKj49wunqB/47Vt3BYyAlJgcK0+7Itfv6L8AA0mPYDSVaymoAAAAASUVORK5CYII=';
      case 'error':
        return 'data:image/png;base64,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';
      case 'info':
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABRpJREFUeNrsnYtx4jAQhi1XQCo4p4JABTgVhKvgSAUhFZBUwHUAV0FIBZgK4lQAVwG+CnzazPrG+PySkawV3n9GQyAMY+nz7mple+V5LFISLhxkmqahfBnLNpJtih9n76uUyBbj3/vsvRAiYiBqgw+DHOLAZyB0C0BFCCqSkBIG8j+EmWwP+Nq3trK9wyslOFZckWzrlJbW6CIHBWIu2yGlLTi+OYNgML25po/UbR36cGXCMAgI1ivZrukMgwnAo6ngLwzCgNnSuiFXcFUJQtnq/mHfEAywircrheFhv95wRjYiayHy4AIEMfaGoxitJSYFRMIACLsrtoomF/Zdx7KMrwkGBO2PgcLIXNhOx/RYaIKx9liZwH1trABhGPqhCIZBC4roCGOGsymWZiiiA4whz6a6aKIyJRaKMEY4mwqITTljbGOv+UqijeMDKEcTGfiO2ILfS1mmLD9byHYidJwfJmAsiMEYN7lWYlBWOmGMqVmGoydRqCWGoMlRWZ9KpD++UTiZDoRi3hHjSdJ56QTOMmKLhZHh75sUnBiLzmtZGDCXxKaRn4rf/03s+Je4Kt7JQlacbxjRShkIUpzz2BnRrCrA11nIksfNrOtqDYStoxeFZbmUz9ZhVU+NQHL32bLMa15c+imzkBnPrPqF0gTkiceoV/2oBILBfMxj1KvG+eDul7grloW8pArIA4+NFT1UAQl5bKy5rdEZkME9NUQwUSxaCAOxq2kRyJTHxK7bKgIJeExouSwGYlmQB/oc0Ekp8HkMaAJhC2ELYZWJgdDSNwZC1GXd8VjQcll8hZAYkNihY1Zd4rlzEcgfh445bFs9IVedjmdZhtX2WYuFY+547yqQedMzInjXvnP3l7kYQzIt8RG7sAAC7pvdKVgRKQnsBHRq5/gEJfLcXwK6F7ngd+JJp3VNRM7UT5yPWHZXUvmgHvOQWFVcnPYyEGJA9jwmdnOQf7MsDuwkdAvlN/xcQEnYbVnTMauF4pfM5Vn9a1vM1DP94rGxFz/OYkgullAqRTEEnZUKKVtcZCvpV5uz5LDEQsA6Do51Kh/7QseO/azinF+Svh/zQYa4XmW7kcd8nzV4j587cSK1Kv+H20tQ17yhD9QKmCn3odihHeGOvLTsw4JwH0rDgqizEo/mNRKXC5jlVVpCtvISLhaWp5gobg1/vw/FVfV8m66pUwyOqgXJKN5R81z1j1ogaCUbYp355voySd22Fo1FMHEVGPwwlauJsBB3qxBDSBXw9BqKKjfeBoSrwI+EzrAAa8+3mr57tEqFvDZVuBYKZxoU358ROtNu68qtEiyLHmHiWiuVG+XASo5EOvflRquejcTPKcH42hKpzRdVi/FT3BkBAuQeTxYAMCW4ntV6h4Qu21VAus8buVyYAOpwWVmQ3zi0eGdbG+MbuuQsBaxkzmNeC0N5dnrppmAMRSOMi4EwFL0wtABhKPpgdArqFYH+kVg2bysLv3gMdG9OfM1bdtclfc+X7O5pDAhCgeRsKDtGa90pWpvLKrgvWI2dyD9/XjkM6N+9ThhGLKRgLSG6sOCKQBzRKiITP270KVw4aLx28Yq+1vVYAf2YmILRq2A5HKbHqZta1+0b5TqYwCEw1wuiwmJg69QDMQgnPC4rIAQROJC/QP1zW3uXQHyA24XeZXywetuQIGg5ACW7yGQylzkihL1tCKSBFN0aQgE4d2g9YYefitAKPjGZi+quxzOQbrCa9k1PdCdtfeivAAMAhjNuqHfE7vYAAAAASUVORK5CYII=';
      case 'warn':
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABHFJREFUeNrsnY1V2zAUhW2xgDdomKDOBu4GdAMzQcMEhglMJwgb0A1gA8IEZIO2A1Aq0WeapCm2/p7ek989RydAID++udL3JNkUhUgkEolEoixUcn7xv56fK31TQ6vgx/e6bdTJyQ+xF8+IWre1bi/vtFvdGjla8c3oR4w4ZkwlXVac7ukOuidbbXT7xKEbU4zCcetoRgF/d8chKYpJOi71je94YEzppMvyN2Ohbx52KMpXS911bSQh7uoCmmHUS0Lc09HAQB5an3VKvokh9obcBRg7jmmrDTmVLsvOjDaSGUYLAAVJiEXNYQbyRcSnMTXJKbXahGpCVpHNKAAUekkIPuaywmCKCekQzSCHwSWxdMTC3DGZea57MQQPc9lgsCJkRpvIjAGDV5KQfUOeEMiKPAYrImZcJjZjwOBu9gmBIvAJmazek0nJds4J6T3MMPWDmSgsh2a+L/5sdHDVupirYLPCi2Nbjzz22uOxm1l2WR6Ya7b5LCM+fjIMVgnNOPPA3K+Bf+8YBrezSogP5sJYMfV5XjhhsEpkBibmuk4cGtBYZZ+QEJhrmRDf6RhUDE6REOzZ3BBYnmeXBWsdq4KXzjAxGDshXIuuPjtD4FPWMDWkxsJgJemYnhKMvcEKKR0YmxZiCwWDFYIZJKa1A+kLgAnrhHDD3LGUdGwNYYq5Y2pjYnDshOS6ttCxM4Q55o6piYXBMRPSF3mri4HBKlI6zKenztyQKOOjimBGNYN0RMPgGAlZZYS56BisAqdjkVERaIPBNdWE9MU81ZMzBDD3bKaGNLBpg1RC5pqOoO9fBUrHHDB3FINDnEiqAphRSTr2MLhKnRDqmFshP5fXh7P0TIfB3AdsQ5A2yvnI+URS34QkWeuYSjQJN0336AlJeIKmUezN1iHkdCKp8kxHKtVTTkco0k7/O60FKcd0tEX6tQ4zZfFw2H2Z783Pzf0EMNh6Nrh0MAPjOiQu2hJ8TdY76F0SQnVLD8XXZD0bXFqmIwnmZqDJO+htE9KJGXEHeJsCq4Z0iCJisE1CZL4KoVhUE9Phc4Km6G/tNIri5URDUl+HJBeNYrCaYMalmBEUg1fOCSF4HZLsMXgsIb2YgTvAl4K5tDBYMcfcGFcDwlI3OSGAubfE39CNNuD8nYSb6rgl/h7O9Xu4mWIIdczlsEA1RWZgX+5isGKKuVeBfy+VFocYXHLEXAabHGyLxeWAwWoGmEt9gN9bMyl3PkkLSAd5ZZaQQa9bh9QYhlHU1PP7mP1jye4tITB2fGf04iddE5EBZR3qdEgIt9MIFgy2AbmoUTv4xU3DNqD2sKglsg3IRR9LRlXtHHSvdlhYRIEg4fanHAoisAJfbORYkNAjV+zNVUsFla8ZQ27keCQe0HWlznLqJFO9riC+TZ3AbOOVHJckuh6Wc8v/VLhSk+Bpb+XznwUquPNajhNaMs6P1SGHplyYPq3gsVmA5QAOY8bF4R2j6wow2JvJxw+FXK3BR6bWewSa2srhEIlEIpEoc/0WYADugLIhrdiXxQAAAABJRU5ErkJggg==';
      default:
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABRpJREFUeNrsnYtx4jAQhi1XQCo4p4JABTgVhKvgSAUhFZBUwHUAV0FIBZgK4lQAVwG+CnzazPrG+PySkawV3n9GQyAMY+nz7mple+V5LFISLhxkmqahfBnLNpJtih9n76uUyBbj3/vsvRAiYiBqgw+DHOLAZyB0C0BFCCqSkBIG8j+EmWwP+Nq3trK9wyslOFZckWzrlJbW6CIHBWIu2yGlLTi+OYNgML25po/UbR36cGXCMAgI1ivZrukMgwnAo6ngLwzCgNnSuiFXcFUJQtnq/mHfEAywircrheFhv95wRjYiayHy4AIEMfaGoxitJSYFRMIACLsrtoomF/Zdx7KMrwkGBO2PgcLIXNhOx/RYaIKx9liZwH1trABhGPqhCIZBC4roCGOGsymWZiiiA4whz6a6aKIyJRaKMEY4mwqITTljbGOv+UqijeMDKEcTGfiO2ILfS1mmLD9byHYidJwfJmAsiMEYN7lWYlBWOmGMqVmGoydRqCWGoMlRWZ9KpD++UTiZDoRi3hHjSdJ56QTOMmKLhZHh75sUnBiLzmtZGDCXxKaRn4rf/03s+Je4Kt7JQlacbxjRShkIUpzz2BnRrCrA11nIksfNrOtqDYStoxeFZbmUz9ZhVU+NQHL32bLMa15c+imzkBnPrPqF0gTkiceoV/2oBILBfMxj1KvG+eDul7grloW8pArIA4+NFT1UAQl5bKy5rdEZkME9NUQwUSxaCAOxq2kRyJTHxK7bKgIJeExouSwGYlmQB/oc0Ekp8HkMaAJhC2ELYZWJgdDSNwZC1GXd8VjQcll8hZAYkNihY1Zd4rlzEcgfh445bFs9IVedjmdZhtX2WYuFY+547yqQedMzInjXvnP3l7kYQzIt8RG7sAAC7pvdKVgRKQnsBHRq5/gEJfLcXwK6F7ngd+JJp3VNRM7UT5yPWHZXUvmgHvOQWFVcnPYyEGJA9jwmdnOQf7MsDuwkdAvlN/xcQEnYbVnTMauF4pfM5Vn9a1vM1DP94rGxFz/OYkgullAqRTEEnZUKKVtcZCvpV5uz5LDEQsA6Do51Kh/7QseO/azinF+Svh/zQYa4XmW7kcd8nzV4j587cSK1Kv+H20tQ17yhD9QKmCn3odihHeGOvLTsw4JwH0rDgqizEo/mNRKXC5jlVVpCtvISLhaWp5gobg1/vw/FVfV8m66pUwyOqgXJKN5R81z1j1ogaCUbYp355voySd22Fo1FMHEVGPwwlauJsBB3qxBDSBXw9BqKKjfeBoSrwI+EzrAAa8+3mr57tEqFvDZVuBYKZxoU358ROtNu68qtEiyLHmHiWiuVG+XASo5EOvflRquejcTPKcH42hKpzRdVi/FT3BkBAuQeTxYAMCW4ntV6h4Qu21VAus8buVyYAOpwWVmQ3zi0eGdbG+MbuuQsBaxkzmNeC0N5dnrppmAMRSOMi4EwFL0wtABhKPpgdArqFYH+kVg2bysLv3gMdG9OfM1bdtclfc+X7O5pDAhCgeRsKDtGa90pWpvLKrgvWI2dyD9/XjkM6N+9ThhGLKRgLSG6sOCKQBzRKiITP270KVw4aLx28Yq+1vVYAf2YmILRq2A5HKbHqZta1+0b5TqYwCEw1wuiwmJg69QDMQgnPC4rIAQROJC/QP1zW3uXQHyA24XeZXywetuQIGg5ACW7yGQylzkihL1tCKSBFN0aQgE4d2g9YYefitAKPjGZi+quxzOQbrCa9k1PdCdtfeivAAMAhjNuqHfE7vYAAAAASUVORK5CYII=';
    }
  }
}
