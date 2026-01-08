/* eslint-disable @typescript-eslint/no-unused-vars */

import { z } from 'zod';

const SystemModels = {
  Meta_Llama_31_8B_Instruct_FP8_Fast: {
    name: '@cf/meta/llama-3.1-8b-instruct-fp8-fast' as const,
    capabilities: {
      tools: false,
      jsonSchema: false,
    },
  },
  Qwen3_30B_A3B_FP8: {
    name: '@cf/qwen/qwen3-30b-a3b-fp8' as const,
    capabilities: {
      tools: true,
      jsonSchema: true,
    },
  },
} as const;

type SystemModel = (typeof SystemModels)[keyof typeof SystemModels]['name'];

type SystemModelWithJsonSchema = {
  [K in keyof typeof SystemModels]: (typeof SystemModels)[K]['capabilities']['jsonSchema'] extends true
    ? (typeof SystemModels)[K]
    : never;
}[keyof typeof SystemModels]['name'];

type SystemModelWithTools = {
  [K in keyof typeof SystemModels]: (typeof SystemModels)[K]['capabilities']['tools'] extends true
    ? (typeof SystemModels)[K]
    : never;
}[keyof typeof SystemModels]['name'];

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

export type Model = SystemModel | OpenAIModel;

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
  Tools extends Array<Tool<any>> | undefined = undefined,
>(args: {
  model?: Schema extends z.ZodObject<any>
    ? OpenAIModel | SystemModelWithJsonSchema
    : Tools extends Array<Tool<any>>
      ? OpenAIModel | SystemModelWithTools
      : Model;
  input: (Input | Promise<Input>)[];
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  topK?: number;
  seed?: number;
  repetitionPenalty?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  toolChoice?: 'auto' | 'required' | 'none';
  tools?: Tools;
  // stream?: boolean;
  // raw?: boolean;
  responseSchema?: Schema;
  maxIterations?: number;
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
