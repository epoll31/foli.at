import { useState } from "react";

export default function useKeyedItems<T>(
  startingItems: T[] = [],
  defaultValue: T
) {
  const [items, setItems] = useState(
    startingItems.map((value, index) => ({
      key: index,
      value: value,
    }))
  );
  function addItem() {
    const item = {
      key: items.reduce(
        (acc, item) => (acc > item.key ? acc : item.key) + 1,
        0
      ),
      value: defaultValue,
    };

    setItems([...items, item]);

    return item;
  }
  function removeItem(key: number) {
    setItems(items.filter((item) => item.key !== key));
  }
  return { items: items, addItem, removeItem };
}
