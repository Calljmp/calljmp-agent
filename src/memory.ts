/* eslint-disable @typescript-eslint/no-unused-vars */

export interface MemoryProvider {
  retrieve<T>(key: string): Promise<T | undefined>;
  retrieve<T>(key: string, defaultValue: T): Promise<T>;
  store<T>(key: string, value: T): Promise<void>;
  delete(key: string): Promise<void>;
}

const RuntimeProvider: MemoryProvider = {
  retrieve: async <T>(
    key: string,
    defaultValue?: T
  ): Promise<T | undefined> => {
    throw new Error('Not implemented in this environment');
  },
  store: async (key, value) => {
    throw new Error('Not implemented in this environment');
  },
  delete: async key => {
    throw new Error('Not implemented in this environment');
  },
};

export interface MemoryContext<T = unknown> {
  get(): Promise<T | undefined>;
  get(defaultValue: T): Promise<T>;
  set(value: T | null): Promise<void>;
  delete(): Promise<void>;
}

export const short = Object.assign(
  {
    context: <T>(
      options?:
        | {
            key?: string;
            defaultValue?: T;
          }
        | string
    ): MemoryContext<T> => {
      throw new Error('Not implemented in this environment');
    },
  },
  RuntimeProvider
);
