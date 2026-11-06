function Player() {
  return (
    <footer className="flex h-20 items-center justify-between bg-black px-4">
      <div className="w-1/3 text-sm text-white">Now playing</div>
      <div className="flex w-1/3 justify-center text-white">Controls</div>
      <div className="flex w-1/3 justify-end text-white">Volume</div>
    </footer>
  )
}

export default Player