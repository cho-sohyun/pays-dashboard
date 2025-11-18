import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 px-10 py-6">{children}</main>
      </div>
    </div>
  );
}
