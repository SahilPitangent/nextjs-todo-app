export interface CommonResponseBody<T = any> {
   status: number;
   response?: ResponseData<T>;
   error?: string;
}

type ResponseData<T> = {
   data: T;
   message: string;
};
