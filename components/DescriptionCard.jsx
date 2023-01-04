import styles from "./DescriptionCard.module.css";

const wrapper = `${styles.wrapper} dark:text-white text-nft-black-1`;

const DescriptionCard = ({ image, description }) => {
  return (
    <div className={wrapper}>
      <div className={styles.imageWrapper}>
        <img src={image} alt="img" className={styles.image} />
      </div>
      <h3 className={styles.description}>{description}</h3>
    </div>
  );
};

export default DescriptionCard;
