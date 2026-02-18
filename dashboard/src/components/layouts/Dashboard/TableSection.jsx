import { MoreHorizontal, TrendingUp, TrendingDown } from "lucide-react";

const recentOrders = [
  {
    id: "#3487",
    customer: "Allison Smith",
    product: "Macbook Pro M4",
    amount: "$3,699",
    status: "completed",
    date: "2025-01-02",
  },
  {
    id: "#3567",
    customer: "Alexa John Taylor",
    product: "HP Vistus 14",
    amount: "$1,699",
    status: "pending",
    date: "2024-01-02",
  },
  {
    id: "#6779",
    customer: "Dustin Hawking",
    product: "Iphone 16 ProMax",
    amount: "$2,099",
    status: "cancelled",
    date: "2026-10-04",
  },
];
const topProducts = [
  {
    name: "Macbook M4 Pro 16",
    sales: 4456,
    revenue: "$854,697",
    trend: "up",
    change: "+3%",
  },
  {
    name: "Samsung Evo",
    sales: 1290,
    revenue: "$154,697",
    trend: "down",
    change: "-13%",
  },
  {
    name: "Macbook M3 Air 13",
    sales: 44564,
    revenue: "$8354,697",
    trend: "up",
    change: "+34%",
  },
  {
    name: "iPhone 17 Promax",
    sales: 44456,
    revenue: "$872,697",
    trend: "up",
    change: "+32%",
  },
  {
    name: "Samsung Galaxy S25 Ultra",
    sales: 3946,
    revenue: "$872,697",
    trend: "up",
    change: "+12%",
  },
];
const TableSection = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Recent Orders
              </h3>
              <p className="text-sm text-slate-500">Latest Customer Orders</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-4 text-sm font-semibold text-slate-600">
                  Order ID
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600">
                  Customer
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600">
                  Product
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600">
                  Amount
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600">
                  Date
                </th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="p-4 text-sm font-medium text-blue-600">
                    {order.id}
                  </td>
                  <td className="p-4 text-sm text-slate-800">
                    {order.customer}
                  </td>
                  <td className="p-4 text-sm text-slate-800">
                    {order.product}
                  </td>
                  <td className="p-4 text-sm text-slate-800">{order.amount}</td>
                  <td className="p-4">
                    <span
                      className={`${getStatusColor(order.status)} text-xs font-medium px-3 py-1 rounded-full capitalize`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-500">{order.date}</td>
                  <td className="p-4 text-slate-400">
                    <MoreHorizontal className="w-4 h-4" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl 
      reounded-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden"
      >
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-slate-800 dark:text-white">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                Top Products
              </h3>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Best Performing Products
            </p>
          </div>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="p-6 space-y-4">
          {topProducts.map((product, index) => {
            return (
              <div
                className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 
            dark:hoverbg-slate-800/50 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-white">
                    {product.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {product.sales}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end space-x-1">
                    {product.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">
                      {product.revenue}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      product.trend === "up"
                        ? "text-emerald-500"
                        : "text-red-500"
                    }`}
                  >
                    {product.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TableSection;
