import React from "react";
import { Zap } from "lucide-react";

const Sidebar = () => {
  return (
    <div
      className="transition duration-300 ease-in-out bg-white/80 dark:bg-salte-200/80 
  backdrop-blur-xl  border-salte-200/40 dark:border-salte-200/40 flex flex-col"
    >
      <div className="p-6 border-b border-salte-200/50 dark:border-salte-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-linear-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-salte-800 dark:text-white">
              Nexus
            </h1>
            <p className="text-xs text-salte-500 dark:text-salte-400">
              Admin Panel
            </p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto"></nav>
      <div className="p-4 border-t border-salte-200/50 dark:border-salte-200/50">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-salte-50 dark:bg-salte-200/50">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKfvHeA11v61E-qbagDTvYuBsAtoSP-jIk1w&s"
            alt="user"
            className="w-10 h-10 rounded-full ring-2 ring-blue-500"
          />
          <div className="flex-1 min-w-0">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-salte-800 dark:text-white truncate">
                Natasha Karen Green
              </p>
              <p className="text-xs text-salte-500 dark:text-salte-400 truncate">
                Administrator
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
