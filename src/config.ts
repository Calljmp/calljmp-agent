import { Schema } from './schema';

export interface AgentConfig {
  name: string;
  description: string;
  forms?: {
    inputSchema?: Schema;
  };
}
