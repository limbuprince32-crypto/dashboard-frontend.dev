import Sidebar from "./components/layouts/Sidebar";
import Header from "./components/layouts/Header";
import { useState } from "react";
import Dashboard from "./components/layouts/Dashboard/Dashboard";

const App = () => {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 transition-all duration-500">
      <div className="flex h-screen">
        <Sidebar
          collapsed={sideBarCollapsed}
          onToggle={() => setSideBarCollapsed(!sideBarCollapsed)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <div className="flex flex-1 flex-col min-h-0">
          <Header
            sideBarCollapsed={sideBarCollapsed}
            onToggleSideBar={() => setSideBarCollapsed(!sideBarCollapsed)}
          />
          <main className="flex-1 overflow-y-auto bg-transparent">
            <div className="p-6 space-y-6">
              {currentPage === "dashboard" && <Dashboard />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
