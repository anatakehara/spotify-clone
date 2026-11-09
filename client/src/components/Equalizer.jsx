function Equalizer({ playing }) {
  return (
    <div
      className={`flex h-4 items-end gap-0.5 ${playing ? "" : "eq-paused"}`}
      aria-hidden="true"
    >
      <span className="eq-bar" style={{ animationDelay: "0s" }} />
      <span className="eq-bar" style={{ animationDelay: "0.3s" }} />
      <span className="eq-bar" style={{ animationDelay: "0.6s" }} />
    </div>
  )
}

export default Equalizer