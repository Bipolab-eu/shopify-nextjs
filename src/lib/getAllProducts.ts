import  { client } from './storeAuth'

/* Get all Products */
const QUERY_PRODUCTS = `
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

export async function getAllProducts () {
  try {
    const { data, errors, extensions } = await client.request(QUERY_PRODUCTS)
    
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