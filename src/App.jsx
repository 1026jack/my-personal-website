import { useEffect, useState } from 'react'
import './App.css'

const apiBase = import.meta.env.VITE_API_BASE_URL || ''
const ownerAvatar = `${import.meta.env.BASE_URL}headimg.svg`

function apiUrl(path) {
  return `${apiBase}${path}`
}

function assetUrl(path) {
  if (!path) return ownerAvatar
  if (path.startsWith('http')) return path
  return `${apiBase}${path}`
}

function App() {
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [authMode, setAuthMode] = useState('login')
  const [status, setStatus] = useState('')
  const [messageText, setMessageText] = useState('')
  const [praiseInput, setPraiseInput] = useState('')
  const [praise, setPraise] = useState('')
  const [loadingPraise, setLoadingPraise] = useState(false)

  useEffect(() => {
    let ignore = false

    async function hydrate() {
      try {
        const [sessionResponse, messagesResponse] = await Promise.all([
          fetch(apiUrl('/api/me'), { credentials: 'include' }),
          fetch(apiUrl('/api/messages'), { credentials: 'include' }),
        ])
        const [sessionData, messagesData] = await Promise.all([
          sessionResponse.json(),
          messagesResponse.json(),
        ])

        if (!ignore) {
          setUser(sessionData.user)
          setMessages(messagesData.messages || [])
        }
      } catch {
        if (!ignore) {
          setStatus('Backend is not connected yet. Deploy the Node server to enable login, messages, and AI praise.')
          setMessages([])
        }
      }
    }

    hydrate()
    return () => {
      ignore = true
    }
  }, [])

  async function handleRegister(event) {
    event.preventDefault()
    setStatus('')
    const formData = new FormData(event.currentTarget)

    const response = await fetch(apiUrl('/api/register'), {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })
    const data = await response.json()

    if (!response.ok) {
      setStatus(data.error || 'Registration failed.')
      return
    }

    setUser(data.user)
    setStatus('Registration successful. Welcome!')
    event.currentTarget.reset()
  }

  async function handleLogin(event) {
    event.preventDefault()
    setStatus('')
    const form = event.currentTarget

    const response = await fetch(apiUrl('/api/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: form.username.value,
        password: form.password.value,
      }),
      credentials: 'include',
    })
    const data = await response.json()

    if (!response.ok) {
      setStatus(data.error || 'Login failed.')
      return
    }

    setUser(data.user)
    setStatus('Login successful.')
    form.reset()
  }

  async function handleLogout() {
    await fetch(apiUrl('/api/logout'), { method: 'POST', credentials: 'include' })
    setUser(null)
    setStatus('Logged out.')
  }

  async function handleMessage(event) {
    event.preventDefault()
    const response = await fetch(apiUrl('/api/messages'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: messageText }),
      credentials: 'include',
    })
    const data = await response.json()

    if (!response.ok) {
      setStatus(data.error || 'Message failed.')
      return
    }

    setMessages((current) => [data.message, ...current])
    setMessageText('')
  }

  async function deleteMessage(id) {
    const response = await fetch(apiUrl(`/api/messages/${id}`), {
      method: 'DELETE',
      credentials: 'include',
    })

    if (response.ok) {
      setMessages((current) => current.filter((message) => message.id !== id))
    }
  }

  async function handlePraise(event) {
    event.preventDefault()
    setLoadingPraise(true)
    setPraise('')

    const response = await fetch(apiUrl('/api/praise'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: praiseInput }),
      credentials: 'include',
    })
    const data = await response.json()

    setLoadingPraise(false)
    if (!response.ok) {
      setStatus(data.error || 'AI praise failed.')
      return
    }
    setPraise(data.praise)
  }

  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">Personal Website</p>
          <h1>Hi, I&apos;m Jack</h1>
          <p className="lead">
            My name is Huang, Yan-Jia. I am from Taipei, Taiwan, and this page
            introduces my background, interests, and cybersecurity learning
            goals.
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="#introduction">
              Read My Intro
            </a>
            <a className="secondary-button" href="#guest-area">
              Guest Area
            </a>
          </div>
        </div>
        <img className="owner-avatar" src={ownerAvatar} alt="Jack Huang profile avatar" />
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

      <section className="panel">
        <article className="intro-panel">
          <h2>Introduction</h2>
          <p>
            Hi! My name is Huang, Yan-Jia, but you can call me Jack. I am from
            Taipei, Taiwan.
          </p>
          <p>
            I am a graduate student at National Taiwan University, majoring in
            Electrical Engineering in Cyber Security.
          </p>
          <p>
            Before that, I studied Biomechatronics Engineering at National
            Taiwan University as an undergraduate student, where I developed my
            programming and AI foundation through coursework and projects.
          </p>
          <p>
            Outside of class, I enjoy playing the guitar and singing. Music
            helps me stay creative and balanced while learning technical skills.
          </p>
          <p>
            In this course, I am currently learning about networks, websites,
            network defense, and network attacks. My goal is to become familiar
            with these skills and use them confidently in the future.
          </p>
        </article>
      </section>

      <section className="guest-layout" id="guest-area">
        <article className="panel auth-panel">
          <div className="panel-heading">
            <p className="section-label">Guest Account</p>
            <h2>{user ? `Welcome, ${user.username}` : 'Register or Login'}</h2>
          </div>

          {user ? (
            <div className="logged-in-card">
              <img src={assetUrl(user.avatarUrl)} alt={`${user.username} avatar`} />
              <div>
                <strong>{user.username}</strong>
                <p>You can leave messages and use the AI praise machine.</p>
                <button className="text-button" type="button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mode-switch">
                <button className={authMode === 'login' ? 'active' : ''} type="button" onClick={() => setAuthMode('login')}>
                  Login
                </button>
                <button className={authMode === 'register' ? 'active' : ''} type="button" onClick={() => setAuthMode('register')}>
                  Register
                </button>
              </div>

              {authMode === 'register' ? (
                <form className="stack-form" onSubmit={handleRegister}>
                  <label>
                    Username
                    <input name="username" autoComplete="username" required minLength="3" maxLength="32" />
                  </label>
                  <label>
                    Password
                    <input name="password" type="password" autoComplete="new-password" required minLength="8" />
                  </label>
                  <label>
                    Avatar (JPG or PNG)
                    <input name="avatar" type="file" accept="image/jpeg,image/png" required />
                  </label>
                  <button className="primary-button" type="submit">
                    Create Account
                  </button>
                </form>
              ) : (
                <form className="stack-form" onSubmit={handleLogin}>
                  <label>
                    Username
                    <input name="username" autoComplete="username" required />
                  </label>
                  <label>
                    Password
                    <input name="password" type="password" autoComplete="current-password" required />
                  </label>
                  <button className="primary-button" type="submit">
                    Login
                  </button>
                </form>
              )}
            </>
          )}

          {status && <p className="status-text">{status}</p>}
        </article>

        <article className="panel praise-panel">
          <div className="panel-heading">
            <p className="section-label">AI Praise Machine</p>
            <h2>Get Complimented</h2>
          </div>
          <form className="stack-form" onSubmit={handlePraise}>
            <label>
              Enter anything
              <textarea
                value={praiseInput}
                onChange={(event) => setPraiseInput(event.target.value)}
                maxLength="20"
                placeholder="Write under 20 characters..."
                required
              />
            </label>
            <p className="hint-text">{praiseInput.length}/20 characters</p>
            <button className="primary-button" type="submit" disabled={!user || loadingPraise}>
              {loadingPraise ? 'Generating...' : 'Generate Praise'}
            </button>
          </form>
          {praise && <p className="praise-output">{praise}</p>}
          {!user && <p className="hint-text">Please login first to use this feature.</p>}
        </article>
      </section>

      <section className="panel message-board">
        <div className="panel-heading">
          <p className="section-label">Message Board</p>
          <h2>Leave a Message</h2>
        </div>

        <form className="message-form" onSubmit={handleMessage}>
          <textarea
            value={messageText}
            onChange={(event) => setMessageText(event.target.value)}
            maxLength="500"
            placeholder={user ? 'Write a friendly message...' : 'Login to leave a message.'}
            disabled={!user}
            required
          />
          <button className="primary-button" type="submit" disabled={!user}>
            Post Message
          </button>
        </form>

        <div className="messages">
          {messages.length === 0 ? (
            <p className="hint-text">No messages yet.</p>
          ) : (
            messages.map((message) => (
              <article className="message-card" key={message.id}>
                <img src={assetUrl(message.author.avatarUrl)} alt={`${message.author.username} avatar`} />
                <div>
                  <div className="message-meta">
                    <strong>{message.author.username}</strong>
                    <span>{new Date(message.createdAt).toLocaleString()}</span>
                  </div>
                  <p>{message.content}</p>
                  {user?.id === message.author.id && (
                    <button className="text-button" type="button" onClick={() => deleteMessage(message.id)}>
                      Delete my message
                    </button>
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  )
}

export default App
