"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

import Header from "./components/header/Header";
import Button from "./components/button/Button";
import ProductCard from "./components/productCard/ProductCard";

import styles from "./page.module.scss";

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}product/get.php`, {
    next: {
      revalidate: 10,
    },
  });
  const data = await res.json();
  return data;
}

export default function Home() {
  const [selectedCards, setSelectedCards] = useState([]);
  const [products, setProducts] = useState([]);

  const router = useRouter();

  const fetchProducts = useCallback(async () => {
    const data = await getProducts();
    setProducts(data.data);
  }, []);

  const handleChange = (id) => {
    if (!selectedCards.includes(id)) {
      setSelectedCards([...selectedCards, id]);
      return;
    }

    const removeItem = selectedCards.filter((item) => item !== id);
    setSelectedCards(removeItem);
  };

  const handleDelete = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}product/delete.php`,
      {
        body: JSON.stringify({
          ids: selectedCards.toString(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }
    ).then((res) => res.json());
    if (res.success) {
      console.log(res)
      revalidatePath("/");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const actions = (
    <>
      <Link className={styles.main__link} href="/product-add">
        Add
      </Link>
      <Button onClick={handleDelete} deleteBtn>
        Mass Delete
      </Button>
    </>
  );

  return (
    <main className={styles.main}>
      <Header label="Product List" children={actions} />
      <div className={styles.main__productList}>
        {products.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            sku={item.sku}
            title={item.name}
            price={item.price}
            category={item.category_name}
            attribute={item.attribute_name}
            attribute_value={item.attribute_value}
            onCheckboxChange={handleChange}
          />
        ))}
      </div>
    </main>
  );
}
