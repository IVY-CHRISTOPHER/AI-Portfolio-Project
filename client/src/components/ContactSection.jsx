function ContactSection({ onEmailClick }) {
  return (
    <section className="section contact" id="contact">
      <div className="contact-card">
        <p className="eyebrow">Contact</p>
        <h2>Let us build something focused and timeless.</h2>
        <p className="muted">Share the problem, timeline, and goals. I respond to every note within one business day.</p>
        <div className="cta-row">
          <button className="btn primary" type="button" onClick={onEmailClick}>
            Email me
          </button>
          <a className="btn ghost" href="#services">
            View services
          </a>
        </div>
        <div className="contact-meta">
          <span>Remote-friendly</span>
          <span>Project-based or retained</span>
          <span>Lightweight, calm process</span>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
