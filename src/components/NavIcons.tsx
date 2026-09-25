export const CellIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
    <ellipse cx="8" cy="8" rx="6.6" ry="5.8" className="fill-primary-tint stroke-primary" strokeWidth="1.3" />
    <circle cx="9.2" cy="7.4" r="2.3" className="fill-primary" />
    <circle cx="5" cy="10" r="0.9" className="fill-secondary" />
  </svg>
)

const helixCells = Array.from({ length: 9 }, (_, i) => {
  const left = Math.round(2 + Math.sin((i / 8) * Math.PI * 2) * 2)
  return [
    { x: left, y: i, className: 'fill-primary' },
    { x: 4 - left, y: i, className: 'fill-secondary' },
  ]
}).flat()

export const HelixIcon = () => (
  <svg
    width="10"
    height="18"
    viewBox="0 0 5 9"
    shapeRendering="crispEdges"
    aria-hidden="true"
    className="shrink-0 -rotate-[14deg]"
  >
    {helixCells.map((cell, i) => (
      <rect key={i} x={cell.x} y={cell.y} width="1" height="1" className={cell.className} />
    ))}
  </svg>
)

export const NeuronIcon = () => (
  <svg width="18" height="16" viewBox="0 0 18 16" aria-hidden="true" className="shrink-0">
    <g className="fill-none stroke-primary" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.2 6.6 L2.6 3.4 M3.6 4.6 L1.4 4.8 M5.6 9.6 L2.2 12.4 M4.8 6.2 L4.4 1.6 M8 10.4 L7.4 14.2" />
      <path d="M9 8 L15 8" />
      <path d="M15 8 L16.8 6.4 M15 8 L16.8 9.6" className="stroke-secondary" />
    </g>
    <circle cx="6.8" cy="8" r="2.6" className="fill-primary-tint stroke-primary" strokeWidth="1.2" />
    <circle cx="6.8" cy="8" r="1" className="fill-primary" />
  </svg>
)
