import { MenuItem } from "@/types";

const menuItems: MenuItem[] = [
  // Burguers
  {
    id: 1,
    name: "Barbecue",
    description:
      "Burger (160g), mussarela, bacon, alface americana, cebola caramelizada, molho barbecue e maionese Don's no pão de brioche.",
    price: 32.9,
    image:
      "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "burguers",
    featured: true,
  },
  {
    id: 2,
    name: "Clássico",
    description:
      "Burger (160g), queijo cheddar, tomate, alface americana, cebola roxa e maionese especial no pão de brioche.",
    price: 29.9,
    image:
      "https://images.pexels.com/photos/1199960/pexels-photo-1199960.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "burguers",
  },
  {
    id: 3,
    name: "Cheddar Duplo",
    description:
      "Burger duplo (320g), cheddar duplo, cebola caramelizada, picles e maionese Don's no pão de brioche.",
    price: 39.9,
    image:
      "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "burguers",
    featured: true,
  },
  {
    id: 4,
    name: "Vegetariano",
    description:
      "Burger de grão de bico (160g), queijo vegano, rúcula, tomate, cebola roxa caramelizada e molho especial vegano.",
    price: 34.9,
    image:
      "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "burguers",
  },

  // Especiais
  {
    id: 5,
    name: "Prime Rib",
    description:
      "Prime rib (180g), queijo gouda, rúcula, tomate confit, cebola crispy e molho gorgonzola no pão australiano.",
    price: 45.9,
    image:
      "https://images.pexels.com/photos/5474836/pexels-photo-5474836.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "especiais",
    featured: true,
  },
  {
    id: 6,
    name: "Camarão Empanado",
    description:
      "Camarão empanado (150g), guacamole, rúcula, tomate, cebola roxa e molho aioli no pão brioche.",
    price: 49.9,
    image:
      "https://images.pexels.com/photos/5718071/pexels-photo-5718071.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "especiais",
  },
  {
    id: 7,
    name: "Cordeiro",
    description:
      "Burger de cordeiro (180g), queijo de cabra, rúcula, tomate seco, cebola caramelizada e molho de hortelã no pão de fermentação natural.",
    price: 47.9,
    image:
      "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "especiais",
  },
  {
    id: 8,
    name: "Costela",
    description:
      "Costela desfiada (180g), queijo provolone, coleslaw, picles e barbecue de goiabada no pão australiano.",
    price: 42.9,
    image:
      "https://images.pexels.com/photos/2725744/pexels-photo-2725744.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "especiais",
  },

  // Acompanhados
  {
    id: 9,
    name: "Batata Frita",
    description: "Porção de batatas fritas crocantes com sal e orégano.",
    price: 15.9,
    image:
      "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "acompanhados",
  },
  {
    id: 10,
    name: "Batata Frita com Cheddar e Bacon",
    description:
      "Porção de batatas fritas cobertas com cheddar cremoso e bacon crocante.",
    price: 24.9,
    image:
      "https://images.pexels.com/photos/1893555/pexels-photo-1893555.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "acompanhados",
    featured: true,
  },
  {
    id: 11,
    name: "Onion Rings",
    description:
      "Anéis de cebola empanados e fritos, servidos com molho barbecue.",
    price: 19.9,
    image:
      "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "acompanhados",
  },
  {
    id: 12,
    name: "Mix de Folhas",
    description:
      "Mix de folhas frescas com tomate cereja, croutons e molho de mostarda e mel.",
    price: 16.9,
    image:
      "https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "acompanhados",
  },

  // Porções
  {
    id: 13,
    name: "Isca de Frango",
    description: "Iscas de frango empanadas, servidas com molho tártaro.",
    price: 29.9,
    image:
      "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "porcoes",
  },
  {
    id: 14,
    name: "Bolinho de Costela",
    description:
      "Bolinhos de costela desfiada com queijo, servidos com molho barbecue.",
    price: 34.9,
    image:
      "https://images.pexels.com/photos/6941000/pexels-photo-6941000.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "porcoes",
  },
  {
    id: 15,
    name: "Dadinho de Tapioca",
    description:
      "Dadinhos de tapioca com queijo coalho, servidos com geleia de pimenta.",
    price: 27.9,
    image:
      "https://images.pexels.com/photos/6941006/pexels-photo-6941006.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "porcoes",
  },
  {
    id: 16,
    name: "Camarão Empanado",
    description: "Camarões empanados servidos com molho tártaro.",
    price: 49.9,
    image:
      "https://images.pexels.com/photos/4518704/pexels-photo-4518704.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "porcoes",
  },
];

export default menuItems;
