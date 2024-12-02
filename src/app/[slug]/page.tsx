import { getProduct } from "@/lib/getProduct"
import Image from "next/image"

export default async function ProductPage ({ params: {slug} }:any) {
  const { product } = await getProduct(slug)

  console.log(product)

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{product.title}</h1>
          </div>
          <section aria-labelledby="information-heading" className="mt-4">
            <div className="flex items-center space-x-2">
              <p className="text-lg text-gray-900 sm:text-xl">{product.priceRange.maxVariantPrice.amount}</p>
              <p className="text-lg text-gray-900 sm:text-xl">{product.priceRange.maxVariantPrice.currencyCode}</p>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{product.description}</p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <Image
          className="aspect-square w-full rounded-lg object-cover" 
          src={product.featuredImage.url}
          width={100}
          height={100}
          alt={product.featuredImage.altText}
          />
        </div>
        {/* Product form */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <section aria-labelledby="options-heading">
            <form>
              <div className="mt-10">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Compra Ahora
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}
