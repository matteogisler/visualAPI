export interface TestResult {
  status?: number;
  statusText?: string;
  headers?: Record<string, string>;
  data?: any;
  error?: string;
  duration?: number;
  size?: number;
  timestamp: string;
}

export interface Environment {
  id: string;
  name: string;
  variables: Record<string, string>;
  isActive?: boolean;
}

export interface RequestCollection {
  id: string;
  name: string;
  requests: SavedRequest[];
  createdAt: string;
  updatedAt: string;
}

export interface SavedRequest {
  id: string;
  name: string;
  method: string;
  url: string;
  headers?: Record<string, string>;
  body?: any;
  tests?: string[];
  createdAt: string;
  updatedAt: string;
}