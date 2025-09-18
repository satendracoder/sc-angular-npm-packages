# sc-angular-loader

A collection of **customizable Angular loader components** (spinner, dots, bar, skeleton) for modern Angular applications.  
Easily display loading states with stylish and reusable UI loaders.

---

## 🚀 Installation

```bash
npm install sc-angular-loader
```

---

## 📦 Setup

In your Angular project, import the loader components or module.

### Option 1 – Import Components Individually

```ts
import { SpinnerLoaderComponent, DotsLoaderComponent } from 'sc-angular-loader';
```

### Option 2 – Import All via `LoaderModule`

(Recommended for simplicity)

```ts
import { LoaderModule } from 'sc-angular-loader';

@NgModule({
  imports: [LoaderModule],
})
export class AppModule {}
```

---

## 🎨 Usage Examples

### Spinner Loader

```html
<sc-spinner-loader></sc-spinner-loader>
```

### Dots Loader

```html
<sc-dots-loader></sc-dots-loader>
```

### Bar Loader

```html
<sc-bar-loader></sc-bar-loader>
```

### Skeleton Loader

```html
<sc-skeleton-loader width="200px" height="20px"></sc-skeleton-loader>
```

---

## ⚙️ Customization

- **Skeleton Loader** supports custom width/height:

  ```html
  <sc-skeleton-loader width="150px" height="30px"></sc-skeleton-loader>
  ```

- **Global Styles**: You can override loader colors in your project’s CSS/SCSS:
  ```scss
  sc-spinner-loader .spinner {
    border-top-color: #ff4081; // pink
  }
  ```

---

## 📚 Supported Loaders

- 🔄 Spinner Loader
- ⬤⬤⬤ Dots Loader
- 📊 Bar Loader
- 🦴 Skeleton Loader

---

## 🛠 Development

To build the library locally:

```bash
ng build sc-angular-loader --configuration production
```

To publish on npm:

```bash
cd dist/sc-angular-loader
npm publish
```

---

## 📖 License

MIT © [Satendra Rajput](https://satendracoder.com)
