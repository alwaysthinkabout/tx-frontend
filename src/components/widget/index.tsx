import { ReactNode } from "react";

export default function Widget({ icon, name, onClick }: { icon: ReactNode; name: string; onClick?: () => void }) {
  return (
    <div className="p-5 w-16" onClick={() => onClick?.()}>
      <div className="flex items-center justify-center">
        {icon}
      </div>
      <div className="mt-4 text-center font-bold text-base">{name}</div>
    </div>
  );
}
