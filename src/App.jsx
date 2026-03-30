import './App.css'

function App() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Personal Website</p>
        <h1>Hi, I&apos;m Jack</h1>
        <p className="lead">
          My name is Huang, Yan-Jia. I am from Taipei, Taiwan, and this page is
          a simple introduction to my background, interests, and learning
          goals.
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
        <article className="panel profile-panel">
          <h2>Profile</h2>
          <ul className="profile-list">
            <li>
              <span>Research</span>
              <strong>AI, AI security, LLM</strong>
            </li>
            <li>
              <span>Favorite tools</span>
              <strong>Python, VSCode, ChatGPT</strong>
            </li>
            <li>
              <span>Interests</span>
              <strong>Playing the guitar and singing</strong>
            </li>
            <li>
              <span>Future goals</span>
              <strong>Become an AI Engineer</strong>
            </li>
          </ul>
        </article>

        <article className="panel">
          <h2>Academic Background</h2>
          <ul className="timeline-list">
            <li>
              <strong>National Taiwan University</strong>
              <span>Master of Electrical Engineering in Cyber Security</span>
              <em>Sep 2025 - present</em>
            </li>
            <li>
              <strong>National Taiwan University</strong>
              <span>Bachelor of Biomechatronics Engineering</span>
              <em>Sep 2020 - June 2025</em>
            </li>
            <li>
              <strong>Taipei Municipal Chien Kuo High School</strong>
              <span>Programming Track</span>
              <em>Sep 2016 - June 2020</em>
            </li>
          </ul>
        </article>
      </section>

      <section className="panel" id="goals">
        <article className="intro-panel">
          <h2>Introduction</h2>
          <p>
            Hi! My name is Huang, Yan-Jia or you can call me Jack. I am from
            Taipei, Taiwan.
          </p>
          <p>
            I am a graduate student at National Taiwan University. I am
            majoring in Electrical Engineering in Cyber Security.
          </p>
          <p>
            Before that, I studied Biomechatronics Engineering at National
            Taiwan University when I was an undergraduate student. I developed
            my programming and AI foundation through coursework and projects.
          </p>
          <p>
            Outside of class, I enjoy playing the guitar and singing. Music
            helps me stay creative and balanced while learning technical skills.
          </p>
          <p>
            Currently, I am learning skills of network, website and network
            defense and attacking in this course. My goals for this course is
            to familliar with those skills. And I hope that I can easily use
            them in the future.
          </p>
        </article>
      </section>
    </main>
  )
}

export default App
