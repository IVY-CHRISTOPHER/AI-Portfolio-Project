// ContactModal renders the overlay form for sending a message
function ContactModal({ isModalOpen, formData, handleChange, handleSubmit, isSending, closeModal }) {
  if (!isModalOpen) return null

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p className="eyebrow">Quick note</p>
            <h3>{formData.topic}</h3>
          </div>
          <button className="modal-close" type="button" onClick={closeModal} aria-label="Close">
            x
          </button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Name</span>
            <input
              name="name"
              type="text"
              placeholder="How should I address you?"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label className="field">
            <span>Email</span>
            <input
              name="email"
              type="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label className="field">
            <span>Topic</span>
            <input name="topic" type="text" placeholder="Project inquiry" value={formData.topic} onChange={handleChange} />
          </label>
          <label className="field">
            <span>Message</span>
            <textarea
              name="message"
              rows="4"
              placeholder="Share goals, timeline, and any links."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>
          <button className="btn primary" type="submit" disabled={isSending}>
            {isSending ? 'Sending...' : 'Send email'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ContactModal
