// Cart.tsx
import type React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Fetch cart items from the server when the component mounts
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      //   const response = await axios.get<CartItem[]>('/api/cart');
      //   setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleRemoveItem = async (productId: number) => {
    try {
      //   await axios.delete(`/api/cart/${productId}`);
      //   fetchCartItems();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleQuantityChange = async (productId: number, quantity: number) => {
    try {
      //   await axios.put(`/api/cart/${productId}`, { quantity });
      //   fetchCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <img src={item.image} alt={item.name} />
            <div>{item.name}</div>
            <div>Price: ${item.price}</div>
            <div>
              Quantity:
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
              >
                -
              </button>
              {item.quantity}
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
