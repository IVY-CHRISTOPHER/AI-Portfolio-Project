function ProjectsSection({
  projectList,
  isAdmin,
  dragTarget,
  onDragOver,
  onDragLeave,
  onDrop,
  onAddPhoto,
  onEdit,
  onDelete,
}) {
  return (
    <section className="section" id="work">
      <div className="section-head">
        <p className="eyebrow">Selected work</p>
        <h2>Recent projects</h2>
        <p className="muted">A sampling of engagements across product design, brand, and build.</p>
      </div>
      <div className="stack">
        {projectList.map((project) => {
          const id = project._id || project.title
          return (
            <article
              className={`project-card ${dragTarget === id ? 'dragging-over' : ''}`}
              key={id}
              onDragOver={(e) => onDragOver(e, project)}
              onDragLeave={() => onDragLeave(project)}
              onDrop={(e) => onDrop(e, project)}
            >
              <div className="project-top">
                <span className="pill">{project.category}</span>
                <span className="pill ghost">{project.timeline}</span>
              </div>
              <h3>{project.title}</h3>
              {project.photo && (
                <img className="project-photo" src={project.photo} alt={`${project.title} screenshot`} loading="lazy" />
              )}
              <p>{project.description}</p>
              <div className="project-footer">
                <span className="muted">{project.outcome}</span>
                <div className="tag-row">
                  {project.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a className="project-link" href={project.link} target="_blank" rel="noreferrer">
                    View on GitHub
                  </a>
                )}
                {isAdmin && (
                  <div className="photo-actions">
                    <button className="btn ghost add-photo-btn" type="button" onClick={() => onAddPhoto(project)}>
                      {project.photo ? 'Update photo' : 'Add photo'}
                    </button>
                    <span className="drop-hint">or drag & drop a photo onto this card</span>
                    <div className="admin-actions">
                      <button className="btn ghost" type="button" onClick={() => onEdit?.(project)}>
                        Edit
                      </button>
                      <button className="btn ghost danger" type="button" onClick={() => onDelete?.(project)}>
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default ProjectsSection
