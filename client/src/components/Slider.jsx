function Slider({ value, max, step = 0.1, onChange, label, className = "" }) {
  const percent = max > 0 ? (value / max) * 100 : 0

  return (
    <div className={`group relative flex h-4 items-center ${className}`}>
      <div className="h-1 w-full overflow-hidden rounded-full bg-white/30">
        <div
          className="h-full rounded-full bg-white group-hover:bg-[#1DB954]"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div
        className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 rounded-full bg-white opacity-0 shadow group-hover:opacity-100"
        style={{ left: `${percent}%` }}
      />

      <input
        type="range"
        min={0}
        max={max || 0}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
    </div>
  )
}

export default Slider