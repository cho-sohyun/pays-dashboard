import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import MainLayout from "./layout/MainLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import TransactionListPage from "./pages/transactions/TransactionListPage";
import MerchantListPage from "./pages/merchants/MerchantListPage";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionListPage />} />
          <Route path="/merchants" element={<MerchantListPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
