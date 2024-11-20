import { ProductSizeTypeSchema } from "./validation"

export const productsSizesTypes: ProductSizeTypeSchema[] = [
  {
    productId: 1,
    sizeId: 1,
    typeId: 2,
    price: 3.25,
    imageUrl: "pizza-original-small.jpg"
  },
  {
    productId: 1,
    sizeId: 2,
    typeId: 1,
    price: 5,
    imageUrl: "pizza-thin-medium.jpg"
  },
  {
    productId: 1,
    sizeId: 2,
    typeId: 2,
    price: 5,
    imageUrl: "pizza-original-medium.jpg"
  },
  {
    productId: 1,
    sizeId: 3,
    typeId: 1,
    price: 6.5,
    imageUrl: "pizza-thin-large.jpg"
  },
  {
    productId: 1,
    sizeId: 3,
    typeId: 2,
    price: 6.5,
    imageUrl: "pizza-original-large.jpg"
  }
]
