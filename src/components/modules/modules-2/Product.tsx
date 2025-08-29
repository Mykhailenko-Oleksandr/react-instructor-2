// src/components/Product.tsx
import clsx from "clsx";
import css from "./Product.module.css";

interface ProductProps {
  name: string;
  imgUrl: string;
  price: number;
  type?: "success" | "error";
}

export default function Product({ name, imgUrl, price, type }: ProductProps) {
  return (
    <div>
      <h2>{name}</h2>
      <img
        src={imgUrl}
        alt={name}
        width="480"
      />
      <p className={clsx(css.product_title, type && css[type])}>
        Price: {price} credits
      </p>
    </div>
  );
}
