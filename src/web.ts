/* eslint-disable @typescript-eslint/no-unused-vars */

export type ScrapeFormat = 'text' | 'html';

export interface WebFilterOperators {
  $eq?: string | number | boolean;
  $ne?: string | number | boolean;
  $contains?: string;
  $startsWith?: string;
  $endsWith?: string;
  $regex?: string;
  $exists?: boolean;
  $in?: (string | number)[];
  $nin?: (string | number)[];
}

export interface WebAttributeFilters {
  [attribute: string]: WebFilterOperators;
}

export interface WebTextFilters {
  $contains?: string;
  $startsWith?: string;
  $endsWith?: string;
  $regex?: string;
}

export interface WebExtractOptions {
  selector: string;
  where?: {
    attributes?: WebAttributeFilters;
    text?: WebTextFilters;
  };
  fields?: ('html' | 'text' | 'attributes' | 'url' | 'index')[];
}

export interface WebExtractedElement {
  html?: string;
  text?: string;
  attributes?: Record<string, string>;
  url?: string;
  index?: number;
}

interface ScrapeBaseResult {
  format: ScrapeFormat;
}

export interface ScrapeTextResult extends ScrapeBaseResult {
  format: 'text';
  content: string;
  /** @deprecated Use `content` instead */
  text: string;
}

export interface ScrapeHtmlResult extends ScrapeBaseResult {
  format: 'html';
  content: string;
}

export interface ScrapeExtractedResult extends ScrapeBaseResult {
  format: 'html';
  content: Array<WebExtractedElement[]>;
}

export type ScrapeResult =
  | ScrapeTextResult
  | ScrapeHtmlResult
  | ScrapeExtractedResult;

export function scrape<
  F extends ScrapeFormat,
  E extends WebExtractOptions[] | undefined = undefined,
>(args: {
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
  extract?: E;
}): Promise<
  E extends WebExtractOptions[]
    ? ScrapeExtractedResult
    : F extends 'text'
      ? ScrapeTextResult
      : F extends 'html'
        ? ScrapeHtmlResult
        : never
> {
  throw new Error('Not implemented in this environment');
}
