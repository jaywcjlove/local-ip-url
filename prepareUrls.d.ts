
export interface Option {
  protocol?: string;
  host?: string;
  port?: string | number;
}

export interface Result {
  ip: string;
  localUrl: string;
  lanUrl: string;
}

export default function(option: Option): Result;
