import { Home, ChartNoAxesCombined, Store } from "lucide-react";

export interface SiderbarMenu {
  label: string;
  icon: React.ElementType;
  key: string;
  path?: string;
  children?: { label: string; key: string; path: string }[];
}

export const SIDEBAR_MENUS: SiderbarMenu[] = [
  {
    label: "대시보드",
    key: "대시보드",
    icon: Home,
    path: "/",
  },

  {
    label: "거래내역",
    key: "거래내역",
    icon: ChartNoAxesCombined,
    children: [
      {
        label: "거래내역 조회",
        key: "거래내역 조회",
        path: "/transactions",
      },
    ],
  },

  {
    label: "가맹점 관리",
    key: "가맹점관리",
    icon: Store,
    children: [
      { label: "가맹점 조회", key: "가맹점 조회", path: "/merchants" },
    ],
  },
];
