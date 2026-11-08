import { createContext, useContext, useState, useEffect } from "react";
import { message } from "antd";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    // Check if product is out of stock completely
    const stockLimit = item.stockQuantity ?? 0;
    if (stockLimit <= 0) {
      message.error("Sorry, This item is out of stock!");
      return;
    }

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((prod) => prod.id === item.id);

      if (existingItemIndex > -1) {
        const currentQty = prevCart[existingItemIndex].quantity || 1;

        // 💡 Check if adding one more exceeds available stock
        if (currentQty >= stockLimit) {
          message.warning(`Only ${stockLimit} items available in stock!`);
          return prevCart;
        }

        // message.success(`${item.title} quantity increased!`, 0.5);
        return prevCart.map((prod, index) =>
          index === existingItemIndex
            ? { ...prod, quantity: currentQty + 1 }
            : prod
        );
      } else {
        // message.success(`${item.title} added to cart!`, 0.5);
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((prod) => prod.id === item.id);

      if (!existingItem) return prevCart;

      if (existingItem.quantity <= 1) {
        return prevCart.filter((prod) => prod.id !== item.id);
      } else {
        return prevCart.map((prod) =>
          prod.id === item.id
            ? { ...prod, quantity: prod.quantity - 1 }
            : prod
        );
      }
    });
  };

  const updateCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartProvider;