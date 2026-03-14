export type APIResponse<T> = {
  data?: T;
  meta?: Meta;
  message?: Message;
  errors?: APIError[];
};

export type Meta = {
  pagination?: PaginationMeta;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type Message = {
  title: string;
  detail?: string;
};

export type APIError = {
  field?: string;
  message: string;
};
