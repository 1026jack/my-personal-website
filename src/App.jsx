import './App.css'

const highlights = [
  {
    title: 'Education',
    text: 'I am currently studying for a Master of Electrical Engineering in Cyber Security at National Taiwan University, after completing my bachelor degree in Biomechatronics Engineering.',
  },
  {
    title: 'Interests',
    text: 'Outside of class, I enjoy playing the guitar and singing. Music helps me stay creative and balanced while learning technical skills.',
  },
  {
    title: 'Future Goals',
    text: 'I want to become familiar with the skills of Attacking and Defense of Network and build a stronger foundation for future cybersecurity work.',
  },
]

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
        <article className="panel intro-panel">
          <h2>Introduction</h2>
          <p>
            I am a graduate student at National Taiwan University, currently
            pursuing a Master of Electrical Engineering in Cyber Security in
            the College of EECS.
          </p>
          <p>
            Before that, I studied Biomechatronics Engineering and developed my
            programming and AI foundation through coursework and projects. I am
            now continuing to grow in cybersecurity and network defense.
          </p>
        </article>

        <aside className="panel profile-panel">
          <h2>Quick Profile</h2>
          <ul className="profile-list">
            <li>
              <span>Name</span>
              <strong>Huang, Yan-Jia / Jack</strong>
            </li>
            <li>
              <span>From</span>
              <strong>Taipei, Taiwan</strong>
            </li>
            <li>
              <span>Hobbies</span>
              <strong>Playing the guitar and singing</strong>
            </li>
            <li>
              <span>Learning Focus</span>
              <strong>Attacking and Defense of Network</strong>
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

      <section className="content-grid">
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

        <article className="panel">
          <h2>Course Goal</h2>
          <p>
            My goal for this course is to become more familiar with the skills
            used in Attacking and Defense of Network and apply them with better
            understanding and confidence.
          </p>
        </article>
      </section>
    </main>
  )
}

export default App
