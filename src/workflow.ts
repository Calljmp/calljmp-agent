/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  AgentPhaseConfig,
  AgentRetryOptions,
  AgentParallelOptions,
  AgentSuspendOptions,
} from './common/ai';

const StubError = new Error('Not implemented in this environment');

declare const resultBrand: unique symbol;
declare const phaseBrand: unique symbol;
declare const retryBrand: unique symbol;
declare const parallelBrand: unique symbol;

export interface Result<Output> extends Promise<Output> {
  [resultBrand]: true;
}

export interface PhaseResult<Output> extends Result<Output> {
  [phaseBrand]: true;
}

export interface RetryResult<Output> extends Result<Output> {
  [retryBrand]: true;
}

export interface ParallelResult<Output> extends Result<Output> {
  [parallelBrand]: true;
}

export function phase<Output>(
  nameOrConfig: string | AgentPhaseConfig,
  block: () => Promise<Output>
): PhaseResult<Output> {
  throw StubError;
}

export function retry<Output>(result: PhaseResult<Output>): RetryResult<Output>;
export function retry<Output>(
  options: AgentRetryOptions,
  result: PhaseResult<Output>
): RetryResult<Output>;
export function retry<Output>(
  optionsOrResult: AgentRetryOptions | PhaseResult<Output>,
  maybeResult?: PhaseResult<Output>
): RetryResult<Output> {
  throw StubError;
}

type TaskResult<T> = T extends (...args: any[]) => Promise<infer R>
  ? R
  : T extends Result<infer R>
    ? R
    : never;

export function parallel<Tasks extends ReadonlyArray<Result<unknown>>>(
  options: AgentParallelOptions,
  tasks: [...Tasks]
): ParallelResult<{ [K in keyof Tasks]: Awaited<TaskResult<Tasks[K]>> }> {
  throw StubError;
}

export function suspend(options?: string | AgentSuspendOptions): Promise<void> {
  throw StubError;
}
