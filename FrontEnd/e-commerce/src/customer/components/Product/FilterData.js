export const color = [
  "white",
  "Black",
  "Red",
  "Marun",
  "Being",
  "Pink",
  "Green",
  "Yellow",
];
export const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White" },
      { value: "beige", label: "Beige" },
      { value: "blue", label: "Blue" },
      { value: "brown", label: "Brown" },
      { value: "green", label: "Green" },
      { value: "purple", label: "Purple" },
      { value: "yellow", label: "Yellow" },
      { value: "pink", label: "pink" },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "S", label: "S" },
      { value: "M", label: "M" },
      { value: "L", label: "L" },
    ],
  },
];

export const singleFilter = [
  {
    id: "price",
    name: "Price",
    options: [
      { value: "159-399", label: "₹159 To $399" },
      { value: "399-999", label: "₹399 To $999" },
      { value: "999-1999", label: "₹999 To $1999" },
      { value: "1999-2999", label: "₹1999 To $2999" },
      { value: "3999-4999", label: "₹3999 To $4999" },
    ],
  },
  {
    id: "discount",
    name: "DiscountRange",
    options: [
      {
        value: "10",
        label: "10% Add Above",
      },
      {
        value: "20",
        label: "20% Add Above",
      },
      {
        value: "30",
        label: "30% Add Above",
      },
      {
        value: "40",
        label: "40% Add Above",
      },
      {
        value: "50",
        label: "50% Add Above",
      },
      {
        value: "60",
        label: "60% Add Above",
      },
      {
        value: "70",
        label: "70% Add Above",
      },
      {
        value: "80",
        label: "80% Add Above",
      },
    ],
  },
  {
    id: "stock",
    name: "Availability",
    options: [
      { value: "in_stock", label: "In Stock" },
      { value: "out_of_stock", label: "Out Of Stock" },
    ],
  },
];
