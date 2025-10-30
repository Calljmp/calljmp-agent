/* eslint-disable @typescript-eslint/no-unused-vars */

import z from 'zod';

export type ScrapeFormat = 'text' | 'html';

interface ScrapeBaseResult {
  format: ScrapeFormat;
}

export interface ScrapeTextResult extends ScrapeBaseResult {
  format: 'text';
  text: string;
}

export interface ScrapeHtmlResult extends ScrapeBaseResult {
  format: 'html';
  content: string;
}

export type ScrapeResult = ScrapeTextResult | ScrapeHtmlResult;

export function scrape<F extends ScrapeFormat = 'text'>(args: {
  url: string | URL;
  format?: F;
  consent?: {
    selectors?: string[];
    textPatterns?: string[];
  };
  activity?: {
    enabled?: boolean;
    maxScrolls?: number;
  };
}): Promise<
  F extends 'text'
    ? ScrapeTextResult
    : F extends 'html'
      ? ScrapeHtmlResult
      : never
> {
  throw new Error('Not implemented in this environment');
}

export function structurize<T extends z.ZodSchema<any>>(args: {
  content: string;
  schema: T;
}): Promise<z.infer<T>> {
  throw new Error('Not implemented in this environment');
}
