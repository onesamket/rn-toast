// Type declarations for @testing-library/react-native
declare module '@testing-library/react-native' {
  import { ReactElement } from 'react';

  export interface RenderResult {
    getByText: (text: string | RegExp) => HTMLElement;
    getByRole: (role: string, options?: { name?: RegExp }) => HTMLElement;
    getByTestId: (testId: string) => HTMLElement;
    getAllByRole: (role: string, options?: { name?: RegExp }) => HTMLElement[];
    queryByTestId: (testId: string) => HTMLElement | null;
  }

  export function render(ui: ReactElement): RenderResult;
  export function fireEvent(element: any, eventName: string, eventData?: any): void;
  export function fireEvent(element: any, eventData: { type: string, [key: string]: any }): void;
  export namespace fireEvent {
    function press(element: any): void;
  }
  export function act(callback: () => void): void;
}
