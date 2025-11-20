import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const navigate = useNavigate();
  return (
    <header className="h-16 flex items-center justify-start px-6 py-4 border-b border-gray-200">
      <button className="md:hidden mr-4" onClick={onMenuClick}>
        <Menu size={26} />
      </button>

      <div
        className="text-lg font-semibold cursor-pointer"
        onClick={() => navigate("/")}
      >
        (주)올페이즈
      </div>
    </header>
  );
}
