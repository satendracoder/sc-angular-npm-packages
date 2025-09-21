# SC Angular Loader (Standalone)

A lightweight Angular loader package with **spinners, dots, bars, skeletons**. Fully customizable and works with **standalone components**.

---

## Features

- Loader types: `spinner`, `dots`, `bar`, `skeleton`
- Dynamic color, width, height, and background
- Standalone Angular component (no NgModule import needed)
- Optional HTTP interceptor to auto show/hide loader

---

## Installation

```bash
npm install sc-angular-loader
```

---

## Import Standalone Component

You can import directly in any standalone component:

```ts
import { Component } from '@angular/core';
import { ScAngularLoader } from 'sc-angular-loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScAngularLoader],
  template: `
    <h1>Standalone Loader Demo</h1>
    <sc-angular-loader
      type="spinner"
      class="spinner-1"
      color="#ff5722"
      background="rgba(0,0,0,0.2)"
      width="60px"
      height="60px"
    >
    </sc-angular-loader>
  `,
})
export class AppComponent {}
```

---

## Inputs / Properties

| Input        | Type        | Default           | Description                            |              |             |             |
| ------------ | ----------- | ----------------- | -------------------------------------- | ------------ | ----------- | ----------- |
| `type`       | \`'spinner' | 'dots'            | 'bar'                                  | 'skeleton'\` | `'spinner'` | Loader type |
| `class`      | `string`    | `'spinner'`       | Loader variant / CSS class             |              |             |             |
| `color`      | `string`    | `#3f51b5`         | Primary color for loader               |              |             |             |
| `background` | `string`    | `rgba(0,0,0,0.2)` | Loader overlay background              |              |             |             |
| `width`      | `string`    | `'40px'`          | Loader width                           |              |             |             |
| `height`     | `string`    | `'40px'`          | Loader height                          |              |             |             |
| `bgBar`      | `string`    | `#ddd`            | Bar background color (for bar loaders) |              |             |             |

---

---

# Use Class And Component

## spinner

`spinner` `|` `spinner-1` `|` `spinner-2` `|` `spinner-3` `|` `spinner-4` `|` `spinner-5`

```html
<sc-angular-loader
  type="spinner"
  class="spinner-5"
  color="#0891b2"
  background="rgba(0,0,0,0.3)"
  width="40px"
  height="40px"
>
</sc-angular-loader>
```

## dots

`dots` `|` `dots-1` `|` `dots-2` `|` `dots-3` `|` `dots-4` `|` `dots-5`

```html
<sc-angular-loader
  type="dots"
  class="dots-1"
  color="#0891b2"
  background="rgba(0,0,0,0.3)"
  width="40px"
  height="40px"
>
</sc-angular-loader>
```

## bar

`bar` `|` `bar-1` `|` `bar-2` `|` `bar-3` `|` `bar-4` `|` `bar-5`

```html
<sc-angular-loader type="bar" class="bar-3" color="#0891b2" background="rgba(0,0,0,0.3)">
</sc-angular-loader>
```

## classic

`classic` `|` `classic-1` `|` `classic-2` `|` `classic-3` `|` `classic-4` `|` `bar-5`

```html
<sc-angular-loader
  type="classic"
  class="classic-3"
  name="sc-angular-loader..."
  color="#0891b2"
  background="rgba(0,0,0,0.3)"
>
</sc-angular-loader>
```

## skeleton

`skeleton`

```html
<sc-angular-loader type="skeleton" class="skeleton" color="#0891b2" width="200px" height="200px">
</sc-angular-loader>
```

---

## Using Loader Service (`SLoader`)

You can manually show/hide the loader in any standalone component:

```ts
import { Component } from '@angular/core';
import { ScAngularLoader, SLoader } from 'sc-angular-loader';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [ScAngularLoader],
  template: `
    <button (click)="show()">Show Loader</button>
    <button (click)="hide()">Hide Loader</button>
    <sc-angular-loader type="spinner" [color]="'#ff5722'"></sc-angular-loader>
  `,
})
export class DemoComponent {
  constructor(public loaderService: SLoader) {}

  show() {
    this.loaderService.show();
  }

  hide() {
    this.loaderService.hide();
  }
}
```

---

## Using HTTP Interceptor (Standalone)

To automatically show/hide the loader for HTTP requests:

```ts
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { iloadersInterceptor } from 'sc-angular-loader';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch(), withInterceptors([iloadersInterceptor]))],
};
```

> This will show loader automatically on all HTTP calls.

---

## Example Usage in Standalone Component

```html
<sc-angular-loader
  type="dots"
  class="dots-1"
  [color]="'#4caf50'"
  [background]="'rgba(0,0,0,0.3)'"
  [width]="'50px'"
  [height]="'50px'">
</sc-angular-loader
```

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📄 License

MIT © [Satendra Rajput](https://satendracoder.com)
