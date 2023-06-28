interface Option {
  protocol?: string;
  host?: string;
  port?: string | number;
}

interface Result {
  ip: string;
  localUrl: string;
  lanUrl: string;
}

declare function prepareUrls(option: Option): Result;

export = prepareUrls;