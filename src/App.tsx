import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import MainLayout from "./layout/MainLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import PeriodSalesPage from "./pages/transactions/period/PeriodSalesPage";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/transactions/period" element={<PeriodSalesPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
