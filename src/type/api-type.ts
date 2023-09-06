export interface PaginatedApiResponse<T> {
  serialized_items: T[];
  total_page: number;
}
