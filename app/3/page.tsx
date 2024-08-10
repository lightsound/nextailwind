"use client";

import { ComponentProps, useActionState, useState } from "react";

type Product = { title: string; price: number };

export default function Page() {
  // const [products, setProducts] = useState<Product[]>([]);
  // const [isPending, setIsPending] = useState(false);
  // const handleSubmit: ComponentProps<"form">["onSubmit"] = async (e) => {
  //   e.preventDefault();
  //   setProducts([]);
  //   const query = e.currentTarget.query.value;
  //   if (!query) {
  //     return;
  //   }
  //   setIsPending(true);
  //   const products = await searchProducts(query);
  //   setProducts(products);
  //   setIsPending(false);
  // };

  const [products, dispatch, isPending] = useActionState(
    async (_prev: Product[], formData: FormData) => {
      const query = formData.get("query") as string;
      if (!query) {
        return [];
      }
      const products = await searchProducts(query);
      return products;
    },
    [],
  );

  return (
    <div className="p-4">
      <form className="mb-4 flex space-x-2" action={dispatch}>
        <input
          type="text"
          name="query"
          className="flex-1 rounded border px-4 py-2"
          placeholder="商品を検索"
        />
        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          disabled={isPending}
        >
          検索
        </button>
      </form>

      {isPending ? (
        <div className="flex items-center justify-center">
          <span className="text-lg text-gray-500">ローディング中...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.title}
              className="rounded-lg border bg-white p-6 shadow-lg"
            >
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                {product.title}
              </h2>
              <p className="text-lg text-gray-600">価格: ${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

async function searchProducts(query: string): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
  const json = await res.json();
  return json.products;
}
