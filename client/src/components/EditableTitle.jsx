import { useState } from "react"

function EditableTitle({ value, onSave, className = "" }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)

  const startEditing = () => {
    setDraft(value)
    setEditing(true)
  }

  const save = () => {
    const trimmed = draft.trim()
    if (trimmed && trimmed !== value) {
      onSave(trimmed)
    }
    setEditing(false)
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") save()
    if (event.key === "Escape") setEditing(false)
  }

  if (editing) {
    return (
      <input
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={save}
        onKeyDown={handleKeyDown}
        maxLength={60}
        aria-label="Playlist name"
        className={`w-full rounded bg-white/10 px-2 outline-none ring-2 ring-white/40 ${className}`}
      />
    )
  }

  return (
    <h1
      onClick={startEditing}
      className={`cursor-pointer rounded px-2 hover:bg-white/10 ${className}`}
      title="Click to rename"
    >
      {value}
    </h1>
  )
}

export default EditableTitle