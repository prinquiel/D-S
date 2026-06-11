export const products = [
  {
    id: 1,
    name: "Vidigal",
    basePrice: 12000,
    images: ["./images/highwaist.jpg", "./images/vidigal_2.jpg"],
    description: "The ultimate beach essential. Minimal, structured, unapologetically elegant.",
  },
  {
    id: 2,
    name: "Straps",
    basePrice: 15000,
    images: ["./images/straps.jpg", "./images/straps_2.jpg"],
    description: "Support meets sensuality. Made for the woman who values both.",
  },
  {
    id: 3,
    name: "High Waist",
    basePrice: 17000,
    images: ["./images/vidigal.jpg"],
    description: "Retro silhouette reimagined. The high-waist cut that defines your presence.",
  },
  {
    id: 4,
    name: "Niva",
    basePrice: 17000,
    images: ["./images/rio.jpg", "./images/niva_dots.jpg", "./images/niva_2.jpg"],
    description: "Effortlessly chic. The print that turned heads on every Riviera.",
  },
  {
    id: 5,
    name: "Rio de Janeiro",
    basePrice: 15000,
    images: ["./images/niva.jpg", "./images/rio_2.jpg"],
    description: "Named for the city that never sleeps. Bold, breezy, eternally radiant.",
  },
]

export const formatPrice = (price) =>
  `$ ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
