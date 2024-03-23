interface JsonResponse {
  statusCode: number;
  status: boolean;
  message?: string;
  data?: any;
}

export type { JsonResponse };
