import { useState, useEffect } from "react";

const data = [
  { name: "Electronics", value: 45, color: "#6366f1" },
  { name: "Clothing", value: 30, color: "#ec4899" },
  { name: "Books", value: 15, color: "#14b8a6" },
  { name: "Other", value: 10, color: "#f97316" },
];

const SIZE = 200;
const CX = SIZE / 2;
const CY = SIZE / 2;
const OUTER = 76;
const INNER = 44;
const GAP = 0.03;

function polarToCartesian(cx, cy, r, angle) {
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
}

function slicePath(cx, cy, innerR, outerR, startAngle, endAngle) {
  const p1 = polarToCartesian(cx, cy, outerR, startAngle);
  const p2 = polarToCartesian(cx, cy, outerR, endAngle);
  const p3 = polarToCartesian(cx, cy, innerR, endAngle);
  const p4 = polarToCartesian(cx, cy, innerR, startAngle);
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
  return [
    `M ${p1.x} ${p1.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${p4.x} ${p4.y}`,
    "Z",
  ].join(" ");
}

function buildSlices(items) {
  const total = items.reduce((s, d) => s + d.value, 0);
  let angle = -Math.PI / 2;
  return items.map((item) => {
    const sweep = (item.value / total) * 2 * Math.PI - GAP;
    const start = angle + GAP / 2;
    const end = start + sweep;
    angle += (item.value / total) * 2 * Math.PI;
    return { ...item, start, end };
  });
}

const slices = buildSlices(data);

export default function SalesChart() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const [barProgress, setBarProgress] = useState(false);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    let start = null;
    const duration = 900;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(step);
      else setBarProgress(true);
    };
    requestAnimationFrame(step);
  }, []);

  const active = activeIndex !== null ? slices[activeIndex] : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        .sc-card {
          font-family: 'DM Sans', sans-serif;
          background: #ffffff;
          border-radius: 20px;
          padding: 20px 24px;
          width: 100%;
          max-width: 300px;
          margin: 0 auto;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          position: relative;
          box-sizing: border-box;
          border: 1px solid rgba(226,232,240,0.5);
        }
        .sc-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 2px;
        }
        .sc-sub {
          font-size: 11px;
          color: #94a3b8;
          font-weight: 400;
          margin: 0 0 0;
        }
        .sc-chart-wrap {
          position: relative;
          width: 100%;
          max-width: 200px;
          margin: 16px auto 8px;
        }
        .sc-svg { width: 100%; height: auto; overflow: visible; display: block; }
        .sc-slice { cursor: pointer; transition: filter 0.2s; }
        .sc-tooltip {
          position: absolute;
          pointer-events: none;
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(12px);
          border-radius: 10px;
          padding: 6px 10px;
          transform: translate(-50%, -115%);
          white-space: nowrap;
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
          z-index: 10;
        }
        .sc-tooltip-name { font-size: 10px; color: #94a3b8; font-weight: 500; margin-bottom: 1px; }
        .sc-tooltip-val { font-size: 14px; font-weight: 700; }
        .sc-divider {
          height: 1px;
          background: #f1f5f9;
          margin: 12px 0;
        }
        .sc-legend-row {
          display: flex; align-items: center; gap: 10px;
          padding: 5px 4px; border-radius: 8px; cursor: pointer;
          transition: background 0.2s;
        }
        .sc-legend-row:hover, .sc-legend-row.active {
          background: rgba(0,0,0,0.03);
        }
        .sc-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .sc-lname { flex: 1; font-size: 13px; color: #334155; font-weight: 400; }
      `}</style>

      <div className="sc-card">
        <p className="sc-title">Sales by Category</p>
        <p className="sc-sub">Product Distribution · 2024</p>

        <div className="sc-chart-wrap">
          <svg className="sc-svg" viewBox={`0 0 ${SIZE} ${SIZE}`}>
            <defs>
              {slices.map((s) => (
                <radialGradient
                  key={s.name}
                  id={`grad-${s.name}`}
                  cx="50%"
                  cy="50%"
                  r="50%"
                >
                  <stop offset="0%" stopColor={s.color} stopOpacity="0.75" />
                  <stop offset="100%" stopColor={s.color} stopOpacity="1" />
                </radialGradient>
              ))}
            </defs>

            {slices.map((s, i) => {
              const isActive = activeIndex === i;
              const sweep = (s.end - s.start) * progress;
              const end = s.start + sweep;
              const outerR = isActive ? OUTER + 9 : OUTER;
              const innerR = isActive ? INNER - 4 : INNER;
              const path = slicePath(CX, CY, innerR, outerR, s.start, end);
              const mid = (s.start + end) / 2;
              const tx = CX + (OUTER + 18) * Math.cos(mid);
              const ty = CY + (OUTER + 18) * Math.sin(mid);

              return (
                <g key={s.name}>
                  {isActive && (
                    <path
                      d={slicePath(
                        CX,
                        CY,
                        innerR - 6,
                        outerR + 12,
                        s.start,
                        end,
                      )}
                      fill={s.color}
                      opacity={0.13}
                    />
                  )}
                  <path
                    className="sc-slice"
                    d={path}
                    fill={`url(#grad-${s.name})`}
                    style={{
                      filter: isActive
                        ? `drop-shadow(0 0 8px ${s.color}80)`
                        : "none",
                    }}
                    onMouseEnter={(e) => {
                      setActiveIndex(i);
                      const svgEl = e.currentTarget.closest("svg");
                      const svgRect = svgEl.getBoundingClientRect();
                      const scale = svgRect.width / SIZE;
                      setTooltip({ x: tx * scale, y: ty * scale, item: s });
                    }}
                    onMouseLeave={() => {
                      setActiveIndex(null);
                      setTooltip(null);
                    }}
                  />
                </g>
              );
            })}

            {active ? (
              <>
                <text
                  x={CX}
                  y={CY - 6}
                  textAnchor="middle"
                  fill={active.color}
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  {active.value}%
                </text>
                <text
                  x={CX}
                  y={CY + 10}
                  textAnchor="middle"
                  fill="#94a3b8"
                  style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9 }}
                >
                  {active.name}
                </text>
              </>
            ) : (
              <>
                <text
                  x={CX}
                  y={CY - 5}
                  textAnchor="middle"
                  fill="#1e293b"
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  100%
                </text>
                <text
                  x={CX}
                  y={CY + 10}
                  textAnchor="middle"
                  fill="#94a3b8"
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 9,
                    fontWeight: 500,
                  }}
                >
                  TOTAL
                </text>
              </>
            )}
          </svg>

          {tooltip && (
            <div
              className="sc-tooltip"
              style={{
                left: tooltip.x,
                top: tooltip.y,
                border: `1px solid ${tooltip.item.color}40`,
              }}
            >
              <div className="sc-tooltip-name">{tooltip.item.name}</div>
              <div
                className="sc-tooltip-val"
                style={{ color: tooltip.item.color }}
              >
                {tooltip.item.value}%
              </div>
            </div>
          )}
        </div>

        <div className="sc-divider" />

        <div>
          {slices.map((s, i) => (
            <div
              key={s.name}
              className={`sc-legend-row${activeIndex === i ? " active" : ""}`}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <span className="sc-dot" style={{ background: s.color }} />
              <span className="sc-lname">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
