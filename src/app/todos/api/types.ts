export interface HttpResponse<T> {
   status: number;
   response?: ResponseData<T>;
   error?: string;
}

type ResponseData<T> = {
   data: T;
   message: string;
};
