import styles from "./productCard.module.scss";

function ProductCard({
  id,
  sku,
  title,
  price,
  attribute,
  attribute_value,
  onCheckboxChange,
}) {
  const measurement =
    attribute === "weight" ? "kg" : attribute === "dimensions" ? "cm" : "MB";

  return (
    <div className={styles.card}>
      <div className={styles.card__checkbox}>
        <input
          type="checkbox"
          className="delete-checkbox"
          onChange={() => onCheckboxChange(id)}
        />
      </div>
      <span>{sku}</span>
      <span className={styles.card__title}>{title}</span>
      <span>{price} $</span>
      <div className={styles.card__attributes}>
        <span>{attribute} : </span>
        <span>
          {attribute_value} {measurement}
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
