import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { SIDEBAR_MENUS } from "../../constants/sidebarMenu";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState<Record<string, boolean>>({});
  const [activeMenu, setActiveMenu] = useState("");
  const navigate = useNavigate();

  const toggleMenu = (menuKey: string) => {
    setOpenMenu((prev) => ({ ...prev, [menuKey]: !prev[menuKey] }));
  };

  return (
    <aside className="w-60 bg-gray-100 border-r border-gray-200 p-4">
      <nav className="space-y-6 mt-1 text-gray-800">
        {SIDEBAR_MENUS.map((menu) => {
          const Icon = menu.icon;

          // 대시보드
          if (!menu.children) {
            return (
              <div
                key={menu.key}
                onClick={() => {
                  setActiveMenu(menu.key);
                  if (menu.path) navigate(menu.path);
                }}
                className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer
                  ${
                    activeMenu === menu.key
                      ? "bg-gray-200"
                      : "hover:bg-gray-200"
                  }`}
              >
                <Icon size={20} />
                <span>{menu.label}</span>
              </div>
            );
          }

          // 거래내역, 가맹점 관리
          return (
            <div key={menu.key}>
              <div
                onClick={() => toggleMenu(menu.key)}
                className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer
                  ${
                    activeMenu === menu.key
                      ? "bg-gray-200"
                      : "hover:bg-gray-200"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  <span>{menu.label}</span>
                </div>

                {openMenu[menu.key] ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </div>

              {/* 서브 메뉴 */}
              {openMenu[menu.key] && (
                <ul className="ml-8 mt-1 space-y-1 text-gray-500 text-sm">
                  {menu.children.map((child) => (
                    <li
                      key={child.key}
                      onClick={() => {
                        setActiveMenu(child.key);
                        navigate(child.path);
                      }}
                      className={`cursor-pointer px-2 py-1 rounded-md
                        ${
                          activeMenu === child.key
                            ? "bg-gray-300 font-medium"
                            : "hover:text-blue-600"
                        }`}
                    >
                      {child.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
