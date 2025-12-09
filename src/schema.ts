export type SchemaTypeMap = {
  string: string;
  number: number;
  integer: number;
  boolean: boolean;
  object: Record<string, any>;
  array: any[];
  null: null;
};

export type SchemaType =
  | 'string'
  | 'number'
  | 'integer'
  | 'boolean'
  | 'array'
  | 'object'
  | 'null';

export type SchemaFormat =
  | 'date-time'
  | 'date'
  | 'time'
  | 'email'
  | 'hostname'
  | 'ipv4'
  | 'ipv6'
  | 'uri'
  | 'uri-reference'
  | 'uuid'
  | 'json-pointer'
  | 'relative-json-pointer'
  | 'regex';

export interface SchemaProperty {
  // Type
  type?: SchemaType | SchemaType[];

  // Metadata
  title?: string;
  description?: string;
  default?: any;
  examples?: any[];

  // String validation
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  format?: SchemaFormat;

  // Numeric validation
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
  multipleOf?: number;

  // Enum
  enum?: any[];
  const?: any;

  // Array validation
  items?: SchemaProperty | SchemaProperty[];
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;

  // Object validation
  properties?: Record<string, SchemaProperty>;
  required?: string[];
  additionalProperties?: boolean | SchemaProperty;
  minProperties?: number;
  maxProperties?: number;
  patternProperties?: Record<string, SchemaProperty>;

  // Conditional
  allOf?: SchemaProperty[];
  anyOf?: SchemaProperty[];
  oneOf?: SchemaProperty[];
  not?: SchemaProperty;
  if?: SchemaProperty;
  then?: SchemaProperty;
  else?: SchemaProperty;

  // References
  $ref?: string;
  definitions?: Record<string, SchemaProperty>;

  // Custom
  'ui:widget'?:
    | 'textarea'
    | 'password'
    | 'color'
    | 'date'
    | 'datetime'
    | 'email'
    | 'hidden'
    | 'radio'
    | 'select'
    | 'range'
    | 'updown';
  'ui:options'?: {
    enumNames?: string[];
    [key: string]: any;
  };
}

export interface Schema extends SchemaProperty {
  $schema?: string;
  $id?: string;

  // Custom
  'ui:widget'?:
    | 'textarea'
    | 'password'
    | 'color'
    | 'date'
    | 'datetime'
    | 'email'
    | 'hidden'
    | 'radio'
    | 'select'
    | 'range'
    | 'updown';
  'ui:options'?: {
    enumNames?: string[];
    [key: string]: any;
  };
}

export type infer<T extends Schema> = {
  [K in keyof T['properties']]: T['properties'][K] extends { type: infer U }
    ? U extends keyof SchemaTypeMap
      ? SchemaTypeMap[U]
      : never
    : never;
};
