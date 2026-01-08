/* eslint-disable @typescript-eslint/no-unused-vars */

export interface Message<
  T extends number = number,
  K extends Record<string, unknown> = Record<string, unknown>,
> {
  type: T;
  payload: K;
}

export function publish(
  message: Message | Record<string, unknown>,
  options?: {
    throwOnError?: boolean;
  }
): Promise<void> {
  throw new Error('Not implemented in this environment');
}
