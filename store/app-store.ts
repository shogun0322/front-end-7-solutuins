import { create } from "zustand";
import { devtools } from "zustand/middleware";

const timeouts = new Map<string, ReturnType<typeof setTimeout>>();

interface AppState {
  originalData: OriginalEachData[];
  fruitData: OriginalEachData[];
  vegetableData: OriginalEachData[];

  moveto: (type: string, name: string) => void;
  moveBackNow: (type: string, name: string) => void;
}

export interface OriginalEachData {
  type: string;
  name: string;
}

const data = [
  { type: "Fruit", name: "Apple" },
  { type: "Vegetable", name: "Broccoli" },
  { type: "Vegetable", name: "Mushroom" },
  { type: "Fruit", name: "Banana" },
  { type: "Vegetable", name: "Tomato" },
  { type: "Fruit", name: "Orange" },
  { type: "Fruit", name: "Mango" },
  { type: "Fruit", name: "Pineapple" },
  { type: "Vegetable", name: "Cucumber" },
  { type: "Fruit", name: "Watermelon" },
  { type: "Vegetable", name: "Carrot" },
];

export const appStore = create<AppState>()(
  devtools((set, get) => ({
    originalData: data,
    fruitData: [],
    vegetableData: [],
    moveto: (type: string, name: string) => {
      const { originalData, fruitData, vegetableData, moveBackNow } = get();

      const isFruit = type === "Fruit";
      const targetKey = isFruit ? "fruitData" : "vegetableData";
      const targetData = [...(isFruit ? fruitData : vegetableData)];

      const selectedItems = originalData.filter((item) =>
        item.name.includes(name)
      );
      const remainingItems = originalData.filter(
        (item) => !item.name.includes(name)
      );

      if (selectedItems.length === 0) return;

      set({
        originalData: remainingItems,
        [targetKey]: [...targetData, ...selectedItems],
      });

      const timeout = setTimeout(() => {
        moveBackNow(type, name);
        timeouts.delete(name);
      }, 5000);

      timeouts.set(name, timeout);
    },

    moveBackNow: (type: string, name: string) => {
      const { originalData, fruitData, vegetableData } = get();

      const isFruit = type === "Fruit";
      const targetKey = isFruit ? "fruitData" : "vegetableData";
      const targetData = [...(isFruit ? fruitData : vegetableData)];

      const itemsToReturn = targetData.filter((item) =>
        item.name.includes(name)
      );
      const updatedTarget = targetData.filter(
        (item) => !item.name.includes(name)
      );

      if (itemsToReturn.length === 0) return;

      if (timeouts.has(name)) {
        clearTimeout(timeouts.get(name)!);
        timeouts.delete(name);
      }

      set({
        [targetKey]: updatedTarget,
        originalData: [...originalData, ...itemsToReturn],
      });
    },
  }))
);
