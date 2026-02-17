import { useState } from "react";

const RevenueChart = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const data = [
    { month: "Jan", revenue: 45000, expenses: 32000 },
    { month: "Feb", revenue: 54000, expenses: 22000 },
    { month: "Mar", revenue: 78000, expenses: 42000 },
    { month: "Apr", revenue: 66000, expenses: 52000 },
    { month: "May", revenue: 67000, expenses: 54000 },
    { month: "Jun", revenue: 23000, expenses: 62000 },
    { month: "Jul", revenue: 78000, expenses: 78000 },
    { month: "Aug", revenue: 97000, expenses: 77000 },
    { month: "Sep", revenue: 99000, expenses: 88000 },
    { month: "Oct", revenue: 87000, expenses: 44000 },
    { month: "Nov", revenue: 86000, expenses: 22000 },
    { month: "Dec", revenue: 90000, expenses: 34000 },
  ];

  const width = 800;
  const height = 320;
  const paddingLeft = 60;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxValue = Math.max(...data.flatMap((d) => [d.revenue, d.expenses]));
  const yMax = Math.ceil(maxValue / 20000) * 20000;

  const barGroupWidth = chartWidth / data.length;
  const barWidth = Math.min(barGroupWidth * 0.35, 30);
  const gap = 4;

  const toY = (value) =>
    chartHeight - (value / yMax) * chartHeight + paddingTop;
  const yTicks = [0, 20000, 40000, 60000, 80000, 100000].filter(
    (v) => v <= yMax + 10000,
  );

  // Tooltip dimensions
  const ttW = 160;
  const ttH = 72;
  const ttPad = 10;

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            Revenue Chart
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Monthly Revenue and Expenses
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                background: "linear-gradient(to bottom, #3b82f6, #8b5cf6)",
              }}
            />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Revenue
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                background: "linear-gradient(to bottom, #94a3b8, #647488)",
              }}
            />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Expenses
            </span>
          </div>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="w-full overflow-x-auto">
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#647488" />
            </linearGradient>
            <linearGradient
              id="revenueGradientHover"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
            <linearGradient
              id="expenseGradientHover"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="4"
                stdDeviation="6"
                floodColor="#00000018"
              />
            </filter>
          </defs>

          {/* Y-axis grid lines + labels */}
          {yTicks.map((tick) => {
            const y = toY(tick);
            return (
              <g key={tick}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeDasharray="3 3"
                  opacity={0.5}
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize={11}
                  fill="#64748b"
                >
                  ${tick / 1000}k
                </text>
              </g>
            );
          })}

          {/* Bars + hover zones */}
          {data.map((d, i) => {
            const groupX = paddingLeft + i * barGroupWidth + barGroupWidth / 2;
            const revenueX = groupX - barWidth - gap / 2;
            const expenseX = groupX + gap / 2;

            const revenueHeight = (d.revenue / yMax) * chartHeight;
            const expenseHeight = (d.expenses / yMax) * chartHeight;
            const revenueY = toY(d.revenue);
            const expenseY = toY(d.expenses);

            const isHovered = hoveredIndex === i;

            // Position tooltip above the tallest bar, clamped within chart bounds
            const tallestY = Math.min(revenueY, expenseY);
            let ttX = groupX - ttW / 2;
            if (ttX < paddingLeft) ttX = paddingLeft;
            if (ttX + ttW > width - paddingRight)
              ttX = width - paddingRight - ttW;
            const ttY = Math.max(paddingTop, tallestY - ttH - 12);

            // Arrow tip X centered on group
            const arrowX = Math.min(Math.max(groupX, ttX + 16), ttX + ttW - 16);

            return (
              <g key={d.month}>
                {/* Column hover highlight */}
                {isHovered && (
                  <rect
                    x={paddingLeft + i * barGroupWidth}
                    y={paddingTop}
                    width={barGroupWidth}
                    height={chartHeight}
                    fill="#f1f5f9"
                    opacity={0.6}
                    rx={4}
                    style={{ pointerEvents: "none" }}
                  />
                )}

                {/* Revenue bar */}
                <rect
                  x={revenueX}
                  y={revenueY}
                  width={barWidth}
                  height={revenueHeight}
                  fill={
                    isHovered
                      ? "url(#revenueGradientHover)"
                      : "url(#revenueGradient)"
                  }
                  rx={4}
                  ry={4}
                  style={{ pointerEvents: "none" }}
                />

                {/* Expense bar */}
                <rect
                  x={expenseX}
                  y={expenseY}
                  width={barWidth}
                  height={expenseHeight}
                  fill={
                    isHovered
                      ? "url(#expenseGradientHover)"
                      : "url(#expenseGradient)"
                  }
                  rx={4}
                  ry={4}
                  style={{ pointerEvents: "none" }}
                />

                {/* X-axis label */}
                <text
                  x={groupX}
                  y={height - 8}
                  textAnchor="middle"
                  fontSize={11}
                  fill={isHovered ? "#3b82f6" : "#64748b"}
                  fontWeight={isHovered ? 600 : 400}
                >
                  {d.month}
                </text>

                {/* Invisible full-column hover zone */}
                <rect
                  x={paddingLeft + i * barGroupWidth}
                  y={paddingTop}
                  width={barGroupWidth}
                  height={chartHeight}
                  fill="transparent"
                  style={{ cursor: "crosshair" }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />

                {/* Tooltip rendered inside SVG above the bar */}
                {isHovered && (
                  <g style={{ pointerEvents: "none" }} filter="url(#shadow)">
                    {/* Tooltip background */}
                    <rect
                      x={ttX}
                      y={ttY}
                      width={ttW}
                      height={ttH}
                      rx={10}
                      ry={10}
                      fill="white"
                      stroke="#e2e8f0"
                      strokeWidth={0.5}
                    />
                    {/* Arrow pointing down to bar */}
                    <polygon
                      points={`${arrowX - 6},${ttY + ttH} ${arrowX + 6},${ttY + ttH} ${arrowX},${ttY + ttH + 8}`}
                      fill="white"
                      stroke="#e2e8f0"
                      strokeWidth={0.5}
                    />
                    {/* Cover the arrow base seam */}
                    <line
                      x1={arrowX - 6}
                      y1={ttY + ttH}
                      x2={arrowX + 6}
                      y2={ttY + ttH}
                      stroke="white"
                      strokeWidth={1.5}
                    />

                    {/* Month label */}
                    <text
                      x={ttX + ttPad}
                      y={ttY + ttPad + 13}
                      fontSize={13}
                      fontWeight={700}
                      fill="#1e293b"
                    >
                      {d.month}
                    </text>

                    {/* Revenue row */}
                    <circle
                      cx={ttX + ttPad + 5}
                      cy={ttY + ttPad + 32}
                      r={5}
                      fill="#3b82f6"
                    />
                    <text
                      x={ttX + ttPad + 15}
                      y={ttY + ttPad + 36}
                      fontSize={11}
                      fill="#64748b"
                    >
                      Revenue
                    </text>
                    <text
                      x={ttX + ttW - ttPad}
                      y={ttY + ttPad + 36}
                      fontSize={11}
                      fontWeight={600}
                      fill="#1e293b"
                      textAnchor="end"
                    >
                      ${d.revenue.toLocaleString()}
                    </text>

                    {/* Expenses row */}
                    <circle
                      cx={ttX + ttPad + 5}
                      cy={ttY + ttPad + 50}
                      r={5}
                      fill="#94a3b8"
                    />
                    <text
                      x={ttX + ttPad + 15}
                      y={ttY + ttPad + 54}
                      fontSize={11}
                      fill="#64748b"
                    >
                      Expenses
                    </text>
                    <text
                      x={ttX + ttW - ttPad}
                      y={ttY + ttPad + 54}
                      fontSize={11}
                      fontWeight={600}
                      fill="#1e293b"
                      textAnchor="end"
                    >
                      ${d.expenses.toLocaleString()}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default RevenueChart;
