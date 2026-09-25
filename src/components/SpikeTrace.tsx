const BASELINE = 14
const AMPLITUDE = 12
// Distance in px between spike peaks. Raise this to fire less often.
const SPIKE_SPACING = 250
const EDGE_PADDING = 28
// Seconds for one left-to-right pass. Raise this to slow the sweep.
const SWEEP_SECONDS = 20

const spikeSegment = (x: number) =>
  `L ${x - 11} 0 L ${x - 7} 1.6 L ${x - 4} 0 L ${x - 1.5} ${-AMPLITUDE} L ${x + 1.5} ${AMPLITUDE * 0.26} L ${
    x + 4.5
  } ${AMPLITUDE * 0.32} L ${x + 9} ${AMPLITUDE * 0.14} L ${x + 15} 0`

const buildTrace = (width: number, from: number, to: number) => {
  const start = from + EDGE_PADDING
  const end = to - EDGE_PADDING
  const count = Math.max(0, Math.floor((end - start) / SPIKE_SPACING) + 1)
  const span = count > 1 ? (end - start) / (count - 1) : 0
  const spikes = Array.from({ length: count }, (_, i) => spikeSegment(count > 1 ? start + i * span : (start + end) / 2))
  return `M 0 0 ${spikes.join(' ')} L ${width} 0`
}

export type TraceBounds = { width: number; from: number; to: number }

const SpikeTrace = ({ bounds }: { bounds: TraceBounds | null }) => (
  <svg
    className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-5 w-full overflow-visible sm:block"
    aria-hidden="true"
  >
    <line x1="0" x2="100%" y1={BASELINE} y2={BASELINE} className="stroke-muted/30" strokeWidth="1.25" />
    {bounds && (
      <path
        d={buildTrace(bounds.width, bounds.from, bounds.to)}
        transform={`translate(0 ${BASELINE})`}
        pathLength={1000}
        className="trace-sweep fill-none stroke-primary"
        style={{ animationDuration: `${SWEEP_SECONDS}s` }}
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    )}
  </svg>
)

export default SpikeTrace
