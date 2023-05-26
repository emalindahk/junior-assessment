"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./productAdd.module.scss";

import Header from "../components/header/Header";
import Button from "../components/button/Button";
import Input from "../components/input/Input";
import Link from "next/link";

const categories = [
  {
    id: "DVD",
    value: 1,
    name: "DVD-Disc",
  },
  {
    id: "Book",
    value: 2,
    name: "Book",
  },
  {
    id: "Furniture",
    value: 3,
    name: "Furniture",
  },
];

function ProductAdd() {
  const [category, setCategory] = useState();
  const [size, setSize] = useState("");
  const [dimensions, setDimensions] = useState({
    width: "",
    height: "",
    length: "",
  });
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      sku: sku,
      name: name,
      price: price,
      category_id: category,
      attribute_value: size
        ? size
        : dimensions.width + "x" + dimensions.height + "x" + dimensions.length,
    });
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}product/create.php`,
      {
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    ).then((res) => res.json());
    if (res.success) router.push("/");
  };

  useEffect(() => {
    setCategory("1");
  }, []);
  

  return (
    <div className={styles.productAdd}>
      <Header label="Product Add">
        <Button primary onClick={handleSubmit}>
          SAVE
        </Button>
        <Link className={styles.productAdd__action} href="/">
          CANCEL
        </Link>
      </Header>
      <form className={styles.productAdd__form} id="product_form">
        <Input
          id="sku"
          label="SKU"
          type="text"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          required={true}
        />
        <Input
          id="name"
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required={true}
        />
        <Input
          id="price"
          label="Price ($)"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required={true}
        />

        <div className={styles.productAdd__select}>
          <label className={styles.productAdd__select__label}>
            Type Switcher
          </label>
          <select
            id="productType"
            className={styles.productAdd__select__switcher}
            onChange={(e) => setCategory(e.target.value)}
            defaultValue={category}
          >
            {categories.map((category, id) => (
              <option key={id} id={category.id} value={category.value}>
                {category.name}
              </option>
            ))}
          </select>

          <div className={styles.productAdd__select__description}>
            {category === "1" && (
              <>
                <Input
                  id="size"
                  label="Size (MB)"
                  type="number"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  required={true}
                />
                <span>
                  Please provide the size of your disk in mega bytes eg 1Gb -
                  1024Mbs
                </span>
              </>
            )}
            {category === "2" && (
              <>
                <Input
                  id="weight"
                  label="Weight (KG)"
                  type="number"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  required={true}
                />
                <span>Please provide the size of your disk in kilograms</span>
              </>
            )}
            {category === "3" && (
              <>
                <Input
                  id="height"
                  label="Height (CM)"
                  type="number"
                  value={dimensions.height}
                  onChange={(e) =>
                    setDimensions({ ...dimensions, height: e.target.value })
                  }
                  required={true}
                />
                <Input
                  id="width"
                  label="Width (CM)"
                  type="number"
                  value={dimensions.width}
                  onChange={(e) =>
                    setDimensions({ ...dimensions, width: e.target.value })
                  }
                  required={true}
                />
                <Input
                  id="length"
                  label="Length (CM)"
                  type="number"
                  value={dimensions.length}
                  onChange={(e) =>
                    setDimensions({ ...dimensions, length: e.target.value })
                  }
                  required={true}
                />
                <span>
                  Please provide the dimensions of your item in HxWxL format
                </span>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductAdd;
