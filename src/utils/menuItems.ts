export const categoryMenuItems: {
  categoryName: string;
  menuItems: { menuItemName: string; price?: number; description: string }[];
}[] = [
  // Appetizers
  {
    categoryName: "Appetizers",
    menuItems: [
      {
        menuItemName: "Peanut Masala",
        description:
          "A zesty and spicy snack made with chick peas, tomatoes and onions with an Indian twist",
        price: 80,
      },
      {
        menuItemName: "Crispy Calamari",
        description:
          "Lightly battered and fried calamari rings served with marinara sauce",
        price: 95,
      },
      {
        menuItemName: "Hummus & Pita Bread",
        description: "Classic hummus with warm pita bread",
        price: 70,
      },
      {
        menuItemName: "Onion Rings",
        description:
          "Crispy golden onion rings served with your choice of dipping sauce",
        price: 65,
      },
      {
        menuItemName: "Buffalo Wings",
        description: "Spicy chicken wings tossed in your choice of sauce",
        price: 90,
      },
      {
        menuItemName: "Nachos Supreme",
        description:
          "Loaded with seasoned ground beef, black beans, cheese sauce, pico de gallo, and sour cream",
        price: 100,
      },
    ],
  },

  // Main Courses
  {
    categoryName: "Main Courses",
    menuItems: [
      {
        menuItemName: "Chicken Parmesan",
        description:
          "Breaded chicken breast topped with marinara sauce and melted mozzarella cheese",
        price: 150,
      },
      {
        menuItemName: "Grilled Salmon",
        description: "Served with roasted vegetables and lemon dill sauce",
        price: 180,
      },
      {
        menuItemName: "Penne Pasta Primavera",
        description:
          "Fresh seasonal vegetables tossed in a light cream sauce with penne pasta",
        price: 140,
      },
      {
        menuItemName: "New York Strip Steak",
        description:
          "Grilled to your liking and served with mashed potatoes and green beans",
        price: 220,
      },
      {
        menuItemName: "Vegetarian Lasagna",
        description:
          "Layered with zucchini, eggplant, spinach, ricotta cheese, and tomato sauce",
        price: 160,
      },
      {
        menuItemName: "Thai Curry",
        description:
          "Choose your protein (chicken, tofu, or shrimp) and enjoy it with our flavorful curry sauce",
        price: 170,
      },
    ],
  },

  // Salads
  {
    categoryName: "Salads",
    menuItems: [
      {
        menuItemName: "Caesar Salad",
        description:
          "Romaine lettuce, croutons, Parmesan cheese, and Caesar dressing",
        price: 85,
      },
      {
        menuItemName: "Greek Salad",
        description:
          "Feta cheese, olives, tomatoes, cucumbers, red onions, and oregano vinaigrette",
        price: 90,
      },
      {
        menuItemName: "Chicken Cobb Salad",
        description:
          "Grilled chicken, bacon, avocado, hard-boiled egg, tomatoes, cucumbers, and blue cheese dressing",
        price: 120,
      },
      {
        menuItemName: "Mediterranean Salad",
        description:
          "Hummus, falafel, cucumber, tomato, red onion, and tahini dressing",
        price: 110,
      },
      {
        menuItemName: "Southwest Salad",
        description:
          "Grilled chicken, black beans, corn, avocado, tortilla strips, and chipotle ranch dressing",
        price: 125,
      },
      {
        menuItemName: "Caprese Salad",
        description: "Fresh mozzarella, tomatoes, basil, and balsamic glaze",
        price: 100,
      },
    ],
  },

  // Desserts
  {
    categoryName: "Desserts",
    menuItems: [
      {
        menuItemName: "Chocolate Cake",
        description: "Rich and decadent chocolate cake",
        price: 70,
      },
      {
        menuItemName: "Cheesecake",
        description: "Classic New York-style cheesecake",
        price: 80,
      },
      {
        menuItemName: "Apple Pie",
        description: "Homemade apple pie with a flaky crust",
        price: 65,
      },
      {
        menuItemName: "Ice Cream Sundae",
        description:
          "Vanilla ice cream topped with chocolate sauce, whipped cream, and a cherry",
        price: 55,
      },
      {
        menuItemName: "Chocolate Chip Cookies",
        description: "Warm and gooey chocolate chip cookies",
        price: 30,
      },
      {
        menuItemName: "Fruit Salad",
        description: "Seasonal fruits with a touch of honey",
        price: 45,
      },
    ],
  },

  // Drinks (non-alcoholic)
  {
    categoryName: "Drinks",
    menuItems: [
      {
        menuItemName: "Soft Drinks",
        description: "Choose from a variety of popular soft drinks",
        price: 30,
      },
      {
        menuItemName: "Juice",
        description: "Freshly squeezed orange, apple, or cranberry juice",
        price: 45,
      },
      {
        menuItemName: "Iced Tea",
        description: "Black, green, or herbal iced tea",
        price: 35,
      },
      {
        menuItemName: "Lemonade",
        description: "Homemade lemonade",
        price: 30,
      },
      {
        menuItemName: "Coffee",
        description: "Regular or decaf coffee",
        price: 40,
      },
      {
        menuItemName: "Hot Chocolate",
        description: "Rich and creamy hot chocolate",
        price: 50,
      },
    ],
  },

  // Beverages (alcoholic)
  {
    categoryName: "Beverages",
    menuItems: [
      {
        menuItemName: "Beer",
        description: "Selection of domestic and imported beers",
        price: 40,
      },
      {
        menuItemName: "Wine",
        description: "Red, white, and sparkling wines by the glass or bottle",
        price: 50,
      },
      {
        menuItemName: "Cocktails",
        description: "Classic and signature cocktails",
        price: 90,
      },
    ],
  },
];
