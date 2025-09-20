# SC Angular Toastify

A simple, lightweight toast notification library for **Angular standalone projects**.

---

## 🚀 Installation

Install the package via npm:

```bash
npm install sc-angular-toastify
```

---

## 📦 Usage

### 1️⃣ Import the Component and Service

Import the **ToastService** in your Angular component:

```ts
import { ToastService } from 'sc-angular-toastify';
```

If you are using the standalone component in your template, add:

```ts
import { ScAngularToastify } from 'sc-angular-toastify';
```

---

### 2️⃣ Inject ToastService in your Constructor

```ts
constructor(private toast: ToastService) {}
```

```ts
imports: [ScAngularToastify];
```

---

### 3️⃣ Show a Toast Notification

You can trigger a toast anywhere in your component:

```ts
this.toast.show('Hello World!', {
  type: 'success', // success | error | info | warn
  duration: 3000, // duration in ms
  position: 'top-right', // top-right | top-left | bottom-right | bottom-left
});
```

---

### 4️⃣ Add Toast Component to Template

If you are using standalone component, add this in your main template (like `app.component.html`):

```html
<sc-angular-toastify></sc-angular-toastify>
```

This will render all toasts in the selected positions.

---

## ⚙️ Options

| Option     | Type   | Default     | Description                                       |
| ---------- | ------ | ----------- | ------------------------------------------------- |
| `type`     | string | 'info'      | Type of toast: 'success', 'error', 'warn', 'info' |
| `duration` | number | 3000        | Duration in milliseconds before auto close        |
| `position` | string | 'top-right' | Position of the toast on screen                   |

---

## 📜 Example

```ts
// Show success toast
this.toast.show('
  Data saved successfully!', // Message
  'success', //type
   5000, //duration
  'top-right', //position with default
);

// Show error toast
this.toast.show(
  'Failed to save data!',   // Message
  'error', //type
  4000, //duration
  'bottom-left', //position
);
```

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📄 License

MIT © [Satendra Rajput](https://satendracoder.com)
