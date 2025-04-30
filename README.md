# @onesamket/rn-toast

A beautiful toast notification library for React Native and Expo applications.

## Features

- 🎨 Beautiful, customizable toast notifications
- 🔄 Promise-based API for async operations
- 🌓 Dark mode support
- 🎯 Multiple toast variants (success, error, warning, info, loading)
- 👆 Swipe to dismiss
- ♿ Accessibility support
- 📱 Safe area aware
- 🔄 Animated transitions

## Installation

```bash
npm install @onesamket/rn-toast
# or
yarn add @onesamket/rn-toast
```

### Peer Dependencies

This library requires the following peer dependencies:

```bash
npm install expo-blur expo-haptics @expo/vector-icons react-native-safe-area-context
# or
yarn add expo-blur expo-haptics @expo/vector-icons react-native-safe-area-context
```

## Usage

### Setup Provider

Wrap your application with the `ToastProvider`:

```jsx
import { ToastProvider } from '@onesamket/rn-toast';

export default function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}
```

### Basic Usage

```jsx
import { useToast } from '@onesamket/rn-toast';

function MyComponent() {
  const toast = useToast();
  
  const showToast = () => {
    toast.toast({
      description: 'This is a toast notification',
      duration: 3000, // milliseconds
    });
  };
  
  return (
    <Button title="Show Toast" onPress={showToast} />
  );
}
```

### Toast Variants

```jsx
// Success toast
toast.success({
  description: 'Successfully saved!',
});

// Error toast
toast.error({
  description: 'An error occurred',
});

// Warning toast
toast.warning({
  description: 'Warning: Low battery',
});

// Info toast
toast.info({
  description: 'New message received',
});

// Loading toast
const toastId = toast.loading({
  description: 'Loading data...',
  duration: 0, // Won't auto-dismiss
});

// Later, dismiss the toast manually
toast.dismissToast(toastId);
```

### Promise Toast

```jsx
const fetchData = async () => {
  return toast.promise(
    fetch('https://api.example.com/data'),
    {
      description: 'Fetching data',
      promise: {
        loading: 'Loading data...',
        success: 'Data loaded successfully!',
        error: 'Failed to load data',
      },
    }
  );
};
```

### Toast with Action

```jsx
toast.info({
  description: 'Your file is ready',
  action: {
    label: 'Download',
    onPress: () => {
      // Handle action
      downloadFile();
    },
  },
});
```

## API Reference

### ToastProvider

The `ToastProvider` component is required to use the toast functionality.

### useToast

The `useToast` hook returns an object with the following methods:

- `toast(options)`: Show a default toast
- `success(options)`: Show a success toast
- `error(options)`: Show an error toast
- `warning(options)`: Show a warning toast
- `info(options)`: Show an info toast
- `loading(options)`: Show a loading toast
- `custom(options)`: Show a custom toast
- `promise(promise, options)`: Show a toast for a promise
- `dismissToast(id)`: Dismiss a toast by ID

### Toast Options

| Property | Type | Description |
|----------|------|-------------|
| `description` | `string` | The content of the toast |
| `variant` | `'default' \| 'destructive' \| 'success' \| 'warning' \| 'info' \| 'loading' \| 'custom' \| 'error'` | The visual style of the toast |
| `duration` | `number` | Duration in milliseconds before auto-dismissing (default: 3000, 0 for no auto-dismiss) |
| `action` | `{ label: string, onPress: () => void }` | Optional action button |
| `promise` | `{ loading: string, success: string, error: string }` | Messages for promise states |
| `swipeToClose` | `boolean` | Whether the toast can be dismissed by swiping (default: true) |
| `position` | `'top' \| 'bottom'` | Position of the toast (default: 'bottom') |

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgements

This library was built with React Native and Expo, and was inspired by the need for a simple, customizable toast notification system for React Native applications.

## Version History

### 0.1.0
- Initial release
- Basic toast functionality with various variants
- Support for promise-based toasts
- Customizable appearance and behavior
