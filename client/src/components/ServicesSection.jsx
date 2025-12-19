function ServicesSection({ servicesList, isAdmin = false, onEdit, onDelete }) {
  return (
    <section className="section" id="services">
      <div className="section-head">
        <p className="eyebrow">Services</p>
        <h2>What I can help with</h2>
        <p className="muted">End-to-end support from early discovery to polished, production-ready build.</p>
      </div>
      <div className="grid">
        {servicesList.map((service) => (
          <div className="card" key={service._id || service.title}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <div className="tag-row">
              {(service.tags || []).map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            {isAdmin && (
              <div className="admin-actions">
                <button className="btn ghost" type="button" onClick={() => onEdit?.(service)}>
                  Edit
                </button>
                <button className="btn ghost danger" type="button" onClick={() => onDelete?.(service)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default ServicesSection
