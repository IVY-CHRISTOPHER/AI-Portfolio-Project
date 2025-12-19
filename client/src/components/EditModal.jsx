function EditModal({ isOpen, type, form, onChange, onClose, onSave }) {
  if (!isOpen) return null

  const isProject = type === 'project'

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p className="eyebrow">Edit {isProject ? 'Project' : 'Service'}</p>
            <h3>{form.title || ''}</h3>
          </div>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Close">
            A-
          </button>
        </div>
        <form
          className="modal-form"
          onSubmit={(e) => {
            e.preventDefault()
            onSave()
          }}
        >
          <label className="field">
            <span>Title</span>
            <input name="title" value={form.title || ''} onChange={onChange} required />
          </label>
          {isProject && (
            <>
              <label className="field">
                <span>Category</span>
                <input name="category" value={form.category || ''} onChange={onChange} />
              </label>
              <label className="field">
                <span>Timeline</span>
                <input name="timeline" value={form.timeline || ''} onChange={onChange} />
              </label>
            </>
          )}
          <label className="field">
            <span>Description</span>
            <textarea name="description" rows="3" value={form.description || ''} onChange={onChange} />
          </label>
          {isProject && (
            <>
              <label className="field">
                <span>Outcome</span>
                <input name="outcome" value={form.outcome || ''} onChange={onChange} />
              </label>
              <label className="field">
                <span>Link</span>
                <input name="link" value={form.link || ''} onChange={onChange} />
              </label>
              <label className="field">
                <span>Photo URL</span>
                <input name="photo" value={form.photo || ''} onChange={onChange} />
              </label>
            </>
          )}
          <label className="field">
            <span>Tags (comma separated)</span>
            <input name="tags" value={form.tags || ''} onChange={onChange} />
          </label>
          <div className="modal-actions">
            <button className="btn ghost" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="btn primary" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditModal
