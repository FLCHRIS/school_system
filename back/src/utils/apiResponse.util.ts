import { APIResponse } from "@/types/api.types";

export const createResponse = <T>(response: APIResponse<T>): APIResponse<T> => {
  return {
    ...(response.data !== undefined && { data: response.data }),
    ...(response.meta !== undefined && { meta: response.meta }),
    ...(response.message !== undefined && { message: response.message }),
    ...(response.errors !== undefined && { errors: response.errors }),
  };
};
