import Sidebar from "./components/layouts/Sidebar";
import Header from "./components/layouts/Header";

const App = () => {
  return (
    <div
      className="min-h-screen bg-linear-to-br from-salte-50 via-blue-50 to-indigo-50 
    dark:from-salte-900 dark:via-salte-800 dark:to-salte-900 transition-all duration-500"
    >
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex-col overflow-hidden">
          <Header />
        </div>
      </div>
    </div>
  );
};

export default App;
