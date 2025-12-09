/* eslint-disable @typescript-eslint/no-unused-vars */

export type DatasetSegmentType = 'page';

interface DatasetSegmentBase {
  type: DatasetSegmentType;
  index: number;
}

export interface DatasetPageSegment extends DatasetSegmentBase {
  type: 'page';
  source?: string;
  content: string;
  score: number;
  metadata: {
    document: {
      title?: string;
      language?: string;
    };
    pageIndex: number;
  };
}

export type DatasetSegment = DatasetPageSegment;

export function query(
  args:
    | {
        prompt:
          | string
          | {
              text: string;
              optimize?: boolean;
            };
        topK?: number;
        minScore?: number;
      }
    | string
): Promise<{
  segments: DatasetSegment[];
}> {
  throw new Error('Not implemented in this environment');
}
