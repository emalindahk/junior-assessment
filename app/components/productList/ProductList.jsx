import styles from "./productList.module.scss";

import ProductCard from "../productCard/ProductCard";

async function ProductList({ onCheckboxChange, selectedCards }) {
  const data = await fetch(
    `${process.env.SCANDI_PUBLIC_API_URL}product/get.php`,
    { next: { revalidate: 10 } }
  );
  const res = await data.json();

  return (
    <div className={styles.productList}>
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
          onCheckboxChange={onCheckboxChange}
        />
      ))}
    </div>
  );
}

export default ProductList;
