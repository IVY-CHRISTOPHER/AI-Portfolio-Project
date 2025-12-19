function Hero({ onStartProject }) {
  return (
    <header className="hero">
      <p className="eyebrow">Freelance product designer and Full-Stack developer</p>
      <h1>Hi, I am Chris Ivy. I build thoughtful web experiences for modern teams.</h1>
      <p className="lede">
        A balanced mix of strategy, design, and Full-Stack craft to help you move from idea to a polished launch-ready product.
      </p>
      <div className="cta-row">
        <button className="btn primary" type="button" onClick={onStartProject}>
          Start a project
        </button>
        <a className="btn ghost" href="#work">
          View recent work
        </a>
      </div>
      <div className="hero-grid">
        <div className="mini-card">
          <h3>Capabilities</h3>
          <p>Product shaping, modern UI, and code that ships on time.</p>
        </div>
        <div className="mini-card">
          <h3>Availability</h3>
          <p>Accepting select freelance collaborations this quarter.</p>
        </div>
        <div className="mini-card">
          <h3>Location</h3>
          <p>Based in the US, collaborating remotely with global teams.</p>
        </div>
      </div>
    </header>
  )
}

export default Hero
