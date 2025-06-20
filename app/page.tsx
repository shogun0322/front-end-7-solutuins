"use client";

import { appStore } from "@/store/app-store";
import { RenderItem } from "@/components/items";
import { RenderGroupData } from "@/components/groups-data";

export default function Home() {
  const { originalData, fruitData, vegetableData, moveto, moveBackNow } =
    appStore();

  const RenderMainData = () => {
    return (
      <div className="flex flex-col flex-1 gap-2">
        {originalData.map((row) => {
          const { name, type } = row;
          return (
            <div key={name} onClick={() => moveto(type, name)}>
              <RenderItem name={name} type={type} />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex gap-3 p-3 h-screen">
      <RenderMainData />
      <RenderGroupData
        title="Fruit"
        items={fruitData}
        onClick={(type: string, name: string) => moveBackNow(type, name)}
      />
      <RenderGroupData
        title="Vegetable"
        items={vegetableData}
        onClick={(type: string, name: string) => moveBackNow(type, name)}
      />
    </div>
  );
}
