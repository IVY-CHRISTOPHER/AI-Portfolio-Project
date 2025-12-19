function ConfirmModal({ isOpen, item, type, onCancel, onConfirm }) {
  if (!isOpen) return null

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p className="eyebrow">Confirm delete</p>
            <h3>{item?.title}</h3>
          </div>
          <button className="modal-close" type="button" onClick={onCancel} aria-label="Close">
            A-
          </button>
        </div>
        <div className="modal-form">
          <p className="muted">
            Are you sure you want to delete this {type}? This action cannot be undone.
          </p>
          <div className="modal-actions">
            <button className="btn ghost" type="button" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn danger" type="button" onClick={onConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
