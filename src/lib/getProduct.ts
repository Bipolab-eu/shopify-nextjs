import  { client } from './storeAuth'

const QUERY_PRODUCT = `
  query ProductQuery($handle: String) {
  product(handle: $handle) {
    handle
    title
    description
    featuredImage {
      url
      altText
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
    }
  }
}
`

export async function getProduct (param:any) {
  try {
    const { data } = await client.request(QUERY_PRODUCT, {
      variables: {
        handle: param
      } 
    })

    return data

  } catch (error) {
      console.error(error);
  }
}