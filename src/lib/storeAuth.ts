import {createStorefrontApiClient} from '@shopify/storefront-api-client';

export const client = createStorefrontApiClient({
  storeDomain: process.env.STORE_DOMAIN!,
  apiVersion: '2024-10',
  privateAccessToken: process.env.STOREFRONT_PRIVATE_API_KEY,
});