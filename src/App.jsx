import './App.css'

const highlights = [
  {
    title: 'School Life',
    text: 'I am a student who enjoys learning by building small projects and exploring new technologies step by step.',
  },
  {
    title: 'Favorite Tools',
    text: 'React, Vite, GitHub, and VS Code help me turn ideas into simple and interactive web experiences.',
  },
  {
    title: 'Future Goals',
    text: 'I want to improve my frontend skills, write cleaner code, and create websites that are useful and friendly.',
  },
]

function App() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Personal Website</p>
        <h1>Hi, I&apos;m Web Explorer</h1>
        <p className="lead">
          Welcome to my homepage. This small website introduces who I am, what
          I enjoy learning, and where I hope to grow next.
        </p>

        <div className="hero-actions">
          <a className="primary-button" href="#introduction">
            Read My Intro
          </a>
          <a className="secondary-button" href="#goals">
            View My Goals
          </a>
        </div>
      </section>

      <section className="content-grid" id="introduction">
        <article className="panel intro-panel">
          <h2>Introduction</h2>
          <p>
            I am a curious learner who likes technology, design, and solving
            problems with code. I enjoy practicing web development because it
            lets me combine creativity with logic in one place.
          </p>
          <p>
            Outside of coding, I like discovering useful tools, organizing my
            ideas, and learning new skills that can help me in school and future
            projects.
          </p>
        </article>

        <aside className="panel profile-panel">
          <h2>Quick Profile</h2>
          <ul className="profile-list">
            <li>
              <span>Nickname</span>
              <strong>Web Explorer</strong>
            </li>
            <li>
              <span>Interests</span>
              <strong>Frontend, UI design, problem solving</strong>
            </li>
            <li>
              <span>Hobbies</span>
              <strong>Learning tech, reading, music</strong>
            </li>
            <li>
              <span>Focus</span>
              <strong>Building clean and readable websites</strong>
            </li>
          </ul>
        </aside>
      </section>

      <section className="panel" id="goals">
        <div className="section-heading">
          <p className="section-label">Highlights</p>
          <h2>What I&apos;m Working On</h2>
        </div>

        <div className="highlight-grid">
          {highlights.map((item) => (
            <article className="highlight-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
