import styles from "./productCard.module.scss";

function ProductCard({
  id,
  sku,
  title,
  price,
  attribute,
  attribute_value,
  selectedCards,
  onCheckboxChange,
}) {
  const measurement =
    attribute === "weight" ? "kg" : attribute === "dimensions" ? "cm" : "MB";

   const isSelected = selectedCards.includes(id);
   console.log(isSelected);

   const handleCheckboxChange = (event) => {
     const isChecked = event.target.checked;
     onCheckboxChange(id, isChecked);
   };

   const handleClick = () => {
     const isChecked = !isSelected;
     onCheckboxChange(id, isChecked);
   };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.card__checkbox}>
        <input
          type="checkbox"
          className="delete-checkbox"
          onChange={handleCheckboxChange}
        />
      </div>
      <span>{sku}</span>
      <span>{title}</span>
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
