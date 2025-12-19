function AdminPanel({
  adminForm,
  adminMessage,
  isAdminPhotoDrag,
  onModeChange,
  onChange,
  onDrop,
  onDragOver,
  onDragLeave,
  onSubmit,
}) {
  return (
    <section className="section admin-panel">
      <div className="section-head">
        <p className="eyebrow">Admin</p>
        <h2>Create entries</h2>
        <p className="muted">Add projects or services directly to the backend.</p>
      </div>
      <div className="admin-toggle">
        <label>
          <input type="radio" name="mode" value="project" checked={adminForm.mode === 'project'} onChange={() => onModeChange('project')} />
          Project
        </label>
        <label>
          <input type="radio" name="mode" value="service" checked={adminForm.mode === 'service'} onChange={() => onModeChange('service')} />
          Service
        </label>
      </div>
      <form className="admin-form" onSubmit={onSubmit}>
        <label className="field">
          <span>Title</span>
          <input name="title" value={adminForm.title} onChange={onChange} required />
        </label>
        {adminForm.mode === 'project' && (
          <>
            <label className="field">
              <span>Category</span>
              <input name="category" value={adminForm.category} onChange={onChange} />
            </label>
            <label className="field">
              <span>Timeline</span>
              <input name="timeline" value={adminForm.timeline} onChange={onChange} />
            </label>
          </>
        )}
        <label className="field">
          <span>Description</span>
          <textarea name="description" rows="3" value={adminForm.description} onChange={onChange} />
        </label>
        {adminForm.mode === 'project' && (
          <>
            <label className="field">
              <span>Outcome</span>
              <input name="outcome" value={adminForm.outcome} onChange={onChange} />
            </label>
            <label className="field">
              <span>Link</span>
              <input name="link" value={adminForm.link} onChange={onChange} />
            </label>
            <label className="field">
              <span>Photo (URL or drop file)</span>
              <input name="photo" value={adminForm.photo} onChange={onChange} />
            </label>
            <div className={`drop-zone ${isAdminPhotoDrag ? 'drop-zone-active' : ''}`} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
              {adminForm.photo ? (
                <>
                  <span className="muted">Photo attached. Drop to replace.</span>
                  <img className="project-photo preview" src={adminForm.photo} alt="Preview" loading="lazy" />
                </>
              ) : (
                <span className="muted">Drag & drop a photo file here</span>
              )}
            </div>
          </>
        )}
        <label className="field">
          <span>Tags (comma separated)</span>
          <input name="tags" value={adminForm.tags} onChange={onChange} />
        </label>
        <button className="btn primary" type="submit">
          Save {adminForm.mode}
        </button>
        {adminMessage && <span className="muted">{adminMessage}</span>}
      </form>
    </section>
  )
}

export default AdminPanel
