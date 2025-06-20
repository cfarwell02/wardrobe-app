import React, { createContext, useContext, useState, ReactNode } from "react";

type ClothingItem = {
  image: string;
  category: string;
};

type WardrobeContextType = {
  items: ClothingItem[];
  addItem: (item: ClothingItem) => void;
};

const WardrobeContext = createContext<WardrobeContextType | undefined>(
  undefined
);

export const WardrobeProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<ClothingItem[]>([]);

  const addItem = (item: ClothingItem) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  return (
    <WardrobeContext.Provider value={{ items, addItem }}>
      {children}
    </WardrobeContext.Provider>
  );
};

export const useWardrobe = () => {
  const context = useContext(WardrobeContext);
  if (!context) {
    throw new Error("useWardrobe must be used within a WardrobeProvider");
  }
  return context;
};
