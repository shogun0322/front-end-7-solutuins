import { OriginalEachData } from "@/store/app-store";
import { RenderItem } from "./items";

type RenderGroupDataProps = {
  title: string;
  items: OriginalEachData[];
  onClick: (type: string, name: string) => void;
};

export const RenderGroupData: React.FC<RenderGroupDataProps> = ({
  title,
  items,
  onClick,
}) => {
  return (
    <div className="flex flex-col flex-1 gap-2 border">
      <div className="flex items-center justify-center h-10 border-b">
        {title}
      </div>
      <div className="flex flex-col flex-1 gap-2 p-3">
        {items.map((row) => {
          const { name, type } = row;
          return (
            <div key={name} onClick={() => onClick(type, name)}>
              <RenderItem name={name} type={type} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
