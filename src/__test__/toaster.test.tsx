import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { Toaster, ToastComponent } from '../components/toaster';
import { Toast } from '../types/index';
// Jest type definitions are in jest.d.ts

describe('ToastComponent', () => {
  const mockToast: Toast = {
    id: '1',
    description: 'Test Toast',
    variant: 'success',
    duration: 3000,
    swipeToClose: true,
  };

  it('renders correctly with a toast', () => {
    const { getByText } = render(
      <ToastComponent toast={mockToast} onDismiss={jest.fn()} />
    );
    expect(getByText('Test Toast')).toBeTruthy();
  });

  it('calls onDismiss when the close button is pressed', () => {
    const onDismiss = jest.fn();
    const { getByRole } = render(
      <ToastComponent toast={mockToast} onDismiss={onDismiss} />
    );
    fireEvent.press(getByRole('button', { name: /close/i }));
    expect(onDismiss).toHaveBeenCalled();
  });

  it('handles swipe-to-close gesture', () => {
    const onDismiss = jest.fn();
    const { getByTestId } = render(
      <ToastComponent toast={mockToast} onDismiss={onDismiss} />
    );
    const toast = getByTestId('toast');
    act(() => {
      fireEvent(toast, 'onPanResponderRelease', { dx: 150 });
    });
    expect(onDismiss).toHaveBeenCalled();
  });
});

describe('Toaster', () => {
  const mockToasts: Toast[] = [
    { id: '1', description: 'Toast 1', variant: 'info', duration: 3000 },
    { id: '2', description: 'Toast 2', variant: 'error', duration: 3000 },
  ];

  it('renders correctly with multiple toasts', () => {
    const { getByText } = render(
      <Toaster toasts={mockToasts} onDismiss={jest.fn()} />
    );
    expect(getByText('Toast 1')).toBeTruthy();
    expect(getByText('Toast 2')).toBeTruthy();
  });

  it('calls onDismiss with the correct id when a toast is dismissed', () => {
    const onDismiss = jest.fn();
    const { getAllByRole } = render(
      <Toaster toasts={mockToasts} onDismiss={onDismiss} />
    );
    const closeButtons = getAllByRole('button', { name: /close/i });
    fireEvent.press(closeButtons[0]);
    expect(onDismiss).toHaveBeenCalledWith('1');
  });

  it('does not render when there are no toasts', () => {
    const { queryByTestId } = render(
      <Toaster toasts={[]} onDismiss={jest.fn()} />
    );
    expect(queryByTestId('toaster')).toBeNull();
  });
});
