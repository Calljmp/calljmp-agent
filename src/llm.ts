/* eslint-disable @typescript-eslint/no-unused-vars */

import { z } from 'zod';

const InstructModelsWithTools = {
  Mistralai_Small_31_24B:
    '@cf/mistralai/mistral-small-3.1-24b-instruct' as const,
  Hermes_2_Pro_Mistral_7B: '@hf/nousresearch/hermes-2-pro-mistral-7b' as const,
} as const;

type InstructModelsWithTools =
  (typeof InstructModelsWithTools)[keyof typeof InstructModelsWithTools];

const InstructModelsWithVision = {
  Mistralai_Small_31_24B:
    '@cf/mistralai/mistral-small-3.1-24b-instruct' as const,
  Llama4_Scout_17B_16E: '@cf/meta/llama-4-scout-17b-16e-instruct' as const,
  Llama31_8B_Fast: '@cf/meta/llama-3.1-8b-instruct-fast' as const,
} as const;

type InstructModelsWithVision =
  (typeof InstructModelsWithVision)[keyof typeof InstructModelsWithVision];

type InstructModel = InstructModelsWithTools | InstructModelsWithVision;

const OpenAIModels = {
  GPT_5: 'openai/gpt-5' as const,
  GPT_5_Mini: 'openai/gpt-5-mini' as const,
  GPT_5_Nano: 'openai/gpt-5-nano' as const,
  GPT_5_Codex: 'openai/gpt-5-codex' as const,
  GPT_41: 'openai/gpt-4.1' as const,
  GPT_41_Mini: 'openai/gpt-4.1-mini' as const,
  GPT_41_Nano: 'openai/gpt-4.1-nano' as const,
  GPT_4o: 'openai/gpt-4o' as const,
  GPT_4o_Mini: 'openai/gpt-4o-mini' as const,
} as const;

type OpenAIModel =
  | (typeof OpenAIModels)[keyof typeof OpenAIModels]
  | (`openai/${string}` & {});

export type Model = InstructModel | OpenAIModel;

export type Tool<
  Parameters extends z.ZodObject<any> = z.ZodObject<any>,
  Result = any,
> = {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: Parameters;
    execute: (params: z.infer<Parameters>) => Promise<Result> | Result;
  };
};

export type TextContext = string;

export type MultimodalContent =
  | TextContext
  | Array<{ type: 'text'; text: string } | { type: 'image'; url: string }>;

export type JsonContent = Record<string, any>;

export type InputRole = 'system' | 'user' | 'assistant';

interface BaseInput {
  role: InputRole;
}

export interface SystemInput<Content = TextContext> extends BaseInput {
  role: 'system';
  content: Content;
}

export interface UserInput<Content = TextContext> extends BaseInput {
  role: 'user';
  content: Content;
}

export interface AssistantInput<Content = TextContext> extends BaseInput {
  role: 'assistant';
  content: Content;
}

export type Input = SystemInput | UserInput | AssistantInput;

export function generate<
  Schema extends z.ZodObject<any> | undefined = undefined,
>(args: {
  model?: Model;
  input: Array<Input>;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  topK?: number;
  seed?: number;
  repetitionPenalty?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  toolChoice?: 'auto' | 'required' | 'none';
  tools?: Array<Tool<any>>;
  // stream?: boolean;
  // raw?: boolean;
  responseSchema?: Schema;
}): Promise<{
  response: Schema extends z.ZodObject<any> ? z.infer<Schema> : string;
}> {
  throw new Error('Not implemented in this environment');
}

export function tool<
  Parameters extends z.ZodObject<any>,
  Result = any,
>(config: {
  name: string;
  description: string;
  parameters: Parameters;
  execute: (params: z.infer<Parameters>) => Promise<Result> | Result;
}): Tool<Parameters, Result> {
  throw new Error('Not implemented in this environment');
}
