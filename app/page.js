"use client";
import Link from "next/link";
import { useState } from "react";

import Header from "./components/header/Header";
import Button from "./components/button/Button";
import ProductCard from "./components/productCard/ProductCard";

import styles from "./page.module.scss";

async function getProducts() {
  const res = await fetch(`${process.env.SCANDI_PUBLIC_API_URL}product/get.php`);
  const data = await res.json();
  return data;
}

export default async function Home() {
  const [selectedCards, setSelectedCards] = useState([]);

  const res = await getProducts();
  
  const handleChange = (id, isChecked) => {
    setSelectedCards((prevSelectedCards) => {
      if (isChecked) {
        if (!prevSelectedCards.includes(id)) {
          return [...prevSelectedCards, id];
        }
      } else {
        return prevSelectedCards.filter((selectedId) => selectedId !== id);
      }
      return prevSelectedCards;
    });
  };

  function handleDelete() {
    console.log("delete", selectedCards);
    // const res = await fetch(`${process.env.SCANDI_PUBLIC_API_URL}product/delete.php`, {
    //   body: JSON.stringify({
    //     ids: selectedCards.toString(),
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "DELETE",
    // }).then((res) => res.json()
    // )
    // if(res.success) {
    //   revalidatePath('/')
    // }
  }

  console.log("dele", selectedCards);

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
        {res.data?.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            sku={item.sku}
            title={item.name}
            price={item.price}
            category={item.category_name}
            attribute={item.attribute_name}
            attribute_value={item.attribute_value}
            selectedCards={selectedCards}
            onCheckboxChange={handleChange}
          />
        ))}
      </div>
    </main>
  );
}
