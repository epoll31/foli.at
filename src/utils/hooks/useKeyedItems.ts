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
    setItems([
      ...items,
      {
        key: items.reduce(
          (acc, item) => (acc > item.key ? acc : item.key) + 1,
          0
        ),
        value: defaultValue,
      },
    ]);
  }
  function removeItem(key: number) {
    setItems(items.filter((item) => item.key !== key));
  }
  return { items: items, addItem, removeItem };
}
