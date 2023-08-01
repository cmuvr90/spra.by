const Config = <Config>{
  API_BASE_URL: process?.env?.API_BASE_URL ?? 'http://localhost',
};

export type Config = {
  API_BASE_URL: string;
};

export default Config;
