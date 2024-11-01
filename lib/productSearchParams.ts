import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString
} from 'nuqs/server';

export const productSearchParams = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(10),
  q: parseAsString,
  product: parseAsString,
  categories: parseAsString
};

export const productSearchParamsCache = createSearchParamsCache(productSearchParams);
export const serialize = createSerializer(productSearchParams);
