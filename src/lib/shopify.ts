'use server'

import {createStorefrontApiClient} from '@shopify/storefront-api-client';

const client = createStorefrontApiClient({
  storeDomain: process.env.STORE_DOMAIN!,
  apiVersion: '2024-10',
  privateAccessToken: process.env.STOREFRONT_PRIVATE_API_KEY,
});

/* Get all Products */
const GetAllProducts = `
  query Products {
    products(first: 8) {
      edges {
        node {
          id
          title
          handle
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
  `

export async function getStoreFront () {
  try {
    const { data, errors, extensions } = await client.request(GetAllProducts)
    
    if (errors) {
      console.error("Error description:", errors.graphQLErrors);
      return { data: null, errors, extensions };
    }

    return { data, errors: null, extensions };

  } catch (error) {
    console.error(error);
    return { data: null, errors: [error], extensions: null };
  }
}

/* Get Product */
const GetProduct = `
  query ProductQuery($id: ID!) {
  product(id: $id) {
    id
    title
    handle
  }
}
`

export async function getProduct () {
  try {
    const { data } = await client.request(GetProduct, {
      variables: {
        id: 'gid://shopify/Product/9815019258178'
      } 
    })

    return data

  } catch (error) {
      console.error(error);
  }
}