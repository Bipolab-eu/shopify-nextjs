'use server'

import {createStorefrontApiClient} from '@shopify/storefront-api-client';

const client = createStorefrontApiClient({
  storeDomain: process.env.STORE_DOMAIN!,
  apiVersion: '2024-10',
  privateAccessToken: process.env.STOREFRONT_PRIVATE_API_KEY,
});

const productQuery = `
  query Products($handle: Int) {
    products(first: $handle) {
      edges {
        node {
          id
          title
          description
          priceRange {
            minVariantPrice {
              amount
            }
          }
          media(first: 10) {
            edges {
              node {
                id
                ... on MediaImage {
                  image {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  `;

export async function getStoreFront () {
  
  try {
    const { data, errors, extensions } = await client.request(productQuery, {
      variables: {
        handle: 6,
      },
    })

    const { products: { edges } } = data
    
    return { edges, errors, extensions }

  } catch (error) {
    console.error(console.log(error))
  }
}

