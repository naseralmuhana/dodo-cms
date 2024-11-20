import { ProductSchema } from "./validation"

export const products: ProductSchema[] = [
  // Category pizza id 1
  { name: "Naija Beef", slug: "naija-beef", categoryId: 1 },
  { name: "Naija Chicken", slug: "naija-chicken", categoryId: 1 },
  { name: "Dodo BBQ", slug: "dodo-bbq", categoryId: 1 },
  {
    name: "Mexican Beef pizza",
    slug: "mexican-beef-pizza",
    categoryId: 1
  },
  {
    name: "Cheeseburger Pizza",
    slug: "cheeseburger-pizza",
    categoryId: 1
  },
  { name: "Cheesy Chicken", slug: "cheesy-chicken", categoryId: 1 },
  { name: "Chicken BBQ", slug: "chicken-bbq", categoryId: 1 },
  { name: "Margherita", slug: "margherita", categoryId: 1 },
  { name: "Meaty BBQ", slug: "meaty-bbq", categoryId: 1 },
  { name: "Pepperoni", slug: "pepperoni", categoryId: 1 },
  { name: "Super Meaty", slug: "super-meaty", categoryId: 1 },
  { name: "Veggie Overload", slug: "veggie-overload", categoryId: 1 },
  { name: "Hawaiian", slug: "hawaiian", categoryId: 1 },
  { name: "Beef Suya", slug: "beef-suya", categoryId: 1 },
  {
    name: "Sweet Chili Chicken",
    slug: "sweet-chili-chicken",
    categoryId: 1
  },
  { name: "Chicken Suya", slug: "chicken-suya", categoryId: 1 },
  {
    name: "Spicy Mixed Pizza",
    slug: "spicy-mixed-pizza",
    categoryId: 1
  },
  { name: "Shawarma Pizza", slug: "shawarma-pizza", categoryId: 1 },
  { name: "Meaty Overload", slug: "meaty-overload", categoryId: 1 },
  { name: "Dodo Supreme", slug: "dodo-supreme", categoryId: 1 },
  // Category coffee id 3
  { name: "Americano", slug: "americano", categoryId: 3 },
  { name: "Cafe Latte", slug: "cafe-latte", categoryId: 3 },
  { name: "Cappuccino", slug: "cappuccino", categoryId: 3 },
  // Category drinks id 4
  { name: "Coca-Cola", slug: "coca-cola", categoryId: 4 },
  { name: "Fanta", slug: "fanta", categoryId: 4 },
  { name: "Sprite", slug: "sprite", categoryId: 4 },
  {
    name: "Schweppes Virigin Mojito",
    slug: "schweppes-virgin-mojito",
    categoryId: 4
  },
  {
    name: "Schweppes Pineapple",
    slug: "schweppes-pineapple",
    categoryId: 4
  },
  {
    name: "Schweppes Chapman",
    slug: "schweppes-chapman",
    categoryId: 4
  },
  {
    name: "Monster Energy Drink",
    slug: "monster-energy-drink",
    categoryId: 4
  },
  {
    name: "Monster Energy Drink Ultra",
    slug: "monster-energy-drink-ultra",
    categoryId: 4
  },
  { name: "Eva still water", slug: "eva-still-water", categoryId: 4 },
  // Category sauces 6
  { name: "BBQ sauce (P)", slug: "bbq-sauce-p", categoryId: 6 },
  { name: "Peppe sauce", slug: "peppe-sauce", categoryId: 6 }
]
