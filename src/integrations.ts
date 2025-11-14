/* eslint-disable @typescript-eslint/no-unused-vars */

export const slack = {
  postMessage: async (params: {
    channel: string;
    text?: string;
    markdown_text?: string;
    mrkdwn?: boolean;
    blocks?: Array<{
      [key: string]: any;
      type: string;
      fields?: Array<{
        [key: string]: any;
        type: string;
      }>;
      text?: {
        type: string;
        text: string;
        emoji?: boolean;
        [key: string]: any;
      };
    }>;
  }): Promise<void> => {
    throw new Error('Not implemented in this environment');
  },
};
