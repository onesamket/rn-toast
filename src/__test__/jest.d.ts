// Type definitions for Jest
declare namespace jest {
  function fn<T extends (...args: any[]) => any>(implementation?: T): jest.Mock<ReturnType<T>, Parameters<T>>;
  
  interface Mock<T = any, Y extends any[] = any[]> {
    (...args: Y): T;
    mockImplementation: (fn: (...args: Y) => T) => Mock<T, Y>;
    mockReturnValue: (value: T) => Mock<T, Y>;
    mockReturnThis: () => Mock<T, Y>;
    mockResolvedValue: (value: T) => Mock<T, Y>;
    mockRejectedValue: (value: any) => Mock<T, Y>;
    mockClear: () => Mock<T, Y>;
    mockReset: () => Mock<T, Y>;
    mockRestore: () => Mock<T, Y>;
    mockReturnValueOnce: (value: T) => Mock<T, Y>;
    mockResolvedValueOnce: (value: T) => Mock<T, Y>;
    mockRejectedValueOnce: (value: any) => Mock<T, Y>;
    mockImplementationOnce: (fn: (...args: Y) => T) => Mock<T, Y>;
    mockName: (name: string) => Mock<T, Y>;
    getMockName: () => string;
    mock: {
      calls: Y[];
      instances: T[];
      invocationCallOrder: number[];
      results: { type: string; value: T }[];
    };
  }
}

declare function describe(name: string, fn: () => void): void;
declare function it(name: string, fn: () => void): void;
declare function expect(actual: any): any;
