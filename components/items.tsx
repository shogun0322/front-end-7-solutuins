import { OriginalEachData } from "@/store/app-store";

export const RenderItem: React.FC<OriginalEachData> = ({ name, type }) => {
  return (
    <div className="flex items-center px-4 h-[40px] border cursor-pointer">
      {name}
    </div>
  );
};
