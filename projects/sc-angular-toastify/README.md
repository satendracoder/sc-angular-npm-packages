# SC Angular Toastify

A simple, lightweight toast notification library for Angular standalone projects.

## 🚀 Installation

```bash
npm install sc-angular-toastify
```

## 📦 Usage

1. Import the service in your component:

```ts
import { ToastService } from 'sc-angular-toastify';
```

2. Inject it into your constructor:

```ts
constructor(private toast: ToastService) {}
```

3. Show a toast:

```ts
this.toast.show('Hello World!', { type: 'success', duration: 3000 });
```

## ⚙️ Options

| Option     | Type   | Default | Description                      |
| ---------- | ------ | ------- | -------------------------------- |
| `type`     | string | info    | success, error, warning, info    |
| `duration` | number | 3000    | Duration in ms before auto close |

## 📜 Example

```ts
this.toast.show('Data saved successfully!', { type: 'success', duration: 5000 });
```

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

## 📄 License

[MIT](LICENSE)
