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

export type Model = InstructModel;

export type Tool<Parameters extends z.ZodSchema<any> = z.ZodSchema<any>> = {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: Parameters;
  };
};

export type TextContext = string;

export type MultimodalContent =
  | TextContext
  | Array<{ type: 'text'; text: string } | { type: 'image'; url: string }>;

export type MessageRole = 'system' | 'user' | 'assistant' | 'tool';

export interface Message<Content = TextContext> {
  role: MessageRole;
  content: Content;
  toolCallId?: string;
}

interface InstructParameters<
  Content = TextContext,
  Schema extends z.ZodSchema<any> = z.ZodSchema<any>,
> {
  messages: Array<Message<Content>>;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  topK?: number;
  seed?: number;
  repetitionPenalty?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  // stream?: boolean;
  // raw?: boolean;
  responseSchema?: Schema;
}

interface ChatResponse<ToolParameters = any, SchemaOutput = any> {
  response: SchemaOutput;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  toolCalls?: Array<{
    id?: string;
    type: 'function';
    function: {
      name: string;
      arguments: ToolParameters;
    };
  }>;
}

export function generate<
  M extends InstructModel,
  Content = TextContext,
  Schema extends z.ZodSchema<any> = z.ZodSchema<any>,
>(
  args: { model?: M } & InstructParameters<Content, Schema>
): Promise<
  M extends InstructModel ? ChatResponse<any, z.infer<Schema>> : string
> {
  throw new Error('Not implemented in this environment');
}

export function chat<
  T extends Tool = Tool,
  Schema extends z.ZodSchema<any> = z.ZodSchema<any>,
>(
  args: { model?: InstructModelsWithVision; tools?: T[] } & InstructParameters<
    MultimodalContent,
    Schema
  >
): Promise<ChatResponse<z.infer<T['function']['parameters']>, z.infer<Schema>>>;

export function chat<
  T extends Tool = Tool,
  Schema extends z.ZodSchema<any> = z.ZodSchema<any>,
>(
  args: { model?: InstructModelsWithTools; tools?: T[] } & InstructParameters<
    TextContext,
    Schema
  >
): Promise<ChatResponse<z.infer<T['function']['parameters']>, z.infer<Schema>>>;

export function chat<
  T extends Tool = Tool,
  Schema extends z.ZodSchema<any> = z.ZodSchema<any>,
>(
  args: { model?: InstructModel; tools?: T[] } & InstructParameters<any, Schema>
): Promise<
  ChatResponse<z.infer<T['function']['parameters']>, z.infer<Schema>>
> {
  throw new Error('Not implemented in this environment');
}
