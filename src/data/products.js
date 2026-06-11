export const products = [
  {
    id: 1,
    name: "Top Vidigal",
    basePrice: 12000,
    images: ["./images/highwaist.jpg", "./images/vidigal_2.jpg"],
  },
  {
    id: 2,
    name: "Straps Bottom",
    basePrice: 15000,
    images: ["./images/straps.jpg", "./images/straps_2.jpg"],
  },
  {
    id: 3,
    name: "High Waist Bottom",
    basePrice: 17000,
    images: ["./images/vidigal.jpg", "./images/highwaist_2.jpg"],
  },
  {
    id: 4,
    name: "Top Niva",
    basePrice: 17000,
    images: ["./images/niva_2.jpg", "./images/rio.jpg", "./images/niva_dots.jpg"],
  },
  {
    id: 5,
    name: "Top Rio de Janeiro",
    basePrice: 15000,
    images: ["./images/niva.jpg", "./images/rio_2.jpg"],
  },
]

export const formatPrice = (price) =>
  `$ ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
