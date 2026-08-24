'use client'

import { useEffect, useState } from 'react'

type Film = {
  id: string
  title: string
  duration: number
  ratio: string
  style: string
  director: string
  created: number
  scenes: number
}

type Scene = {
  id: string
  n: number
  duration: number
  prompt: string
  environment: string
  action: string
  camera: string
  lighting: string
  dialogue: string
  sound: string
  status:
    | 'queued'
    | 'rendering'
    | 'processing'
    | 'ready'
    | 'failed'
}

const durations = [10, 20, 30, 40, 60, 120, 300, 600]

const labels = (seconds: number) =>
  seconds < 60
    ? `${seconds}s`
    : seconds === 60
      ? '1 min'
      : `${seconds / 60} min`

const sceneCount = (seconds: number) => seconds / 10

function makeScenes(total: number): Scene[] {
  return Array.from({ length: sceneCount(total) }, (_, index) => ({
    id: crypto.randomUUID(),
    n: index + 1,
    duration: 10,
    prompt: '',
    environment: '',
    action: '',
    camera: '',
    lighting: '',
    dialogue: '',
    sound: '',
    status: 'queued',
  }))
}

const blankFilm = (duration = 60): Film => ({
  id: crypto.randomUUID(),
  title: 'Untitled Film',
  duration,
  ratio: '16:9',
  style: 'Cinematic',
  director: '',
  created: Date.now(),
  scenes: sceneCount(duration),
})

export default function Home() {
  const [films, setFilms] = useState<Film[]>([])
  const [film, setFilm] = useState<Film>(() => blankFilm())
  const [scenes, setScenes] = useState<Scene[]>(() => makeScenes(60))
  const [tab, setTab] = useState('Studio')
  const [selected, setSelected] = useState(0)
  const [character, setCharacter] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem('dac_films') || '[]',
      )
      setFilms(stored)
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem(
      'dac_current',
      JSON.stringify({ film, scenes, character }),
    )
    localStorage.setItem('dac_films', JSON.stringify(films))
  }, [film, scenes, character, films])

  const ready = scenes.filter((scene) => scene.status === 'ready').length

  const queue = scenes.filter(
    (scene) =>
      scene.status === 'queued' ||
      scene.status === 'rendering' ||
      scene.status === 'processing',
  ).length

  const current = scenes[selected] || scenes[0]

  function create() {
    const newFilm = blankFilm(60)
    setFilm(newFilm)
    setScenes(makeScenes(60))
    setSelected(0)
    setTab('Studio')
  }

  function save() {
    const next = [
      film,
      ...films.filter((item) => item.id !== film.id),
    ]

    setFilms(next)
    setSaved(true)

    setTimeout(() => setSaved(false), 1600)
  }

  function duration(value: number) {
    setFilm({
      ...film,
      duration: value,
      scenes: sceneCount(value),
    })

    setScenes(makeScenes(value))
    setSelected(0)
  }

  function updateScene(update: Partial<Scene>) {
    setScenes((items) =>
      items.map((scene, index) =>
        index === selected
          ? { ...scene, ...update }
          : scene,
      ),
    )
  }

  function demoRender(index: number) {
    setScenes((items) =>
      items.map((scene, currentIndex) =>
        currentIndex === index
          ? { ...scene, status: 'rendering' }
          : scene,
      ),
    )

    setTimeout(() => {
      setScenes((items) =>
        items.map((scene, currentIndex) =>
          currentIndex === index
            ? { ...scene, status: 'processing' }
            : scene,
        ),
      )
    }, 800)

    setTimeout(() => {
      setScenes((items) =>
        items.map((scene, currentIndex) =>
          currentIndex === index
            ? { ...scene, status: 'ready' }
            : scene,
        ),
      )
    }, 1900)
  }

  function renderAll() {
    scenes.forEach((_, index) => {
      setTimeout(() => demoRender(index), index * 250)
    })
  }

  return (
    <main>
      <header>
        <div className="brand">
          <span className="mark">D</span>

          <div>
            <strong>DAVITECH</strong>
            <small>AI CINEMA</small>
          </div>
        </div>

        <div className="top">
          <span className="free">FREE • NO PAYWALL</span>

          <button onClick={save}>
            {saved ? 'Saved' : 'Save Film'}
          </button>

          <button className="primary" onClick={create}>
            + New Film
          </button>
        </div>
      </header>

      <div className="layout">
        <aside>
          {[
            'Studio',
            'New Film',
            'My Films',
            'Character Vault',
            'Scene Studio',
            'Render Queue',
            'Asset Library',
            'Director',
            'Voice Studio',
            'Sound Studio',
            'Timeline',
            'Subtitles',
            'Color',
            'Export',
          ].map((item) => (
            <button
              key={item}
              className={tab === item ? 'nav active' : 'nav'}
              onClick={() => setTab(item)}
            >
              {item}
            </button>
          ))}

          <div className="sidefoot">
            v0.4 • 10 MIN MAX
            <br />
            Scene-based production
          </div>
        </aside>

        <section className="content">
          <div className="hero">
            <div>
              <p className="eyebrow">
                PRODUCTION WORKSTATION
              </p>

              <h1>{film.title}</h1>

              <p className="muted">
                {labels(film.duration)} • {film.scenes} scenes •{' '}
                {film.ratio}
              </p>
            </div>

            <div className="stats">
              <div>
                <b>{scenes.length}</b>
                <span>Scenes</span>
              </div>

              <div>
                <b>{ready}</b>
                <span>Ready</span>
              </div>

              <div>
                <b>{queue}</b>
                <span>Queue</span>
              </div>
            </div>
          </div>

          {tab === 'New Film' && (
            <section className="panel">
              <h2>New Film</h2>

              <label>
                Film title

                <input
                  value={film.title}
                  onChange={(event) =>
                    setFilm({
                      ...film,
                      title: event.target.value,
                    })
                  }
                />
              </label>

              <label>
                Maximum production duration

                <div className="duration">
                  {durations.map((value) => (
                    <button
                      key={value}
                      className={
                        film.duration === value ? 'pick' : ''
                      }
                      onClick={() => duration(value)}
                    >
                      {labels(value)}

                      <small>
                        {sceneCount(value)} scene
                        {sceneCount(value) > 1 ? 's' : ''}
                      </small>
                    </button>
                  ))}
                </div>
              </label>

              <div className="grid2">
                <label>
                  Aspect ratio

                  <select
                    value={film.ratio}
                    onChange={(event) =>
                      setFilm({
                        ...film,
                        ratio: event.target.value,
                      })
                    }
                  >
                    <option>16:9</option>
                    <option>9:16</option>
                    <option>1:1</option>
                    <option>4:5</option>
                  </select>
                </label>

                <label>
                  Production style

                  <select
                    value={film.style}
                    onChange={(event) =>
                      setFilm({
                        ...film,
                        style: event.target.value,
                      })
                    }
                  >
                    <option>Cinematic</option>
                    <option>Documentary</option>
                    <option>Fashion Film</option>
                    <option>Music Video</option>
                    <option>Commercial</option>
                  </select>
                </label>
              </div>

              <label>
                Director prompt

                <textarea
                  value={film.director}
                  onChange={(event) =>
                    setFilm({
                      ...film,
                      director: event.target.value,
                    })
                  }
                  placeholder="Describe the director's creative intent, pacing, visual language and continuity rules..."
                />
              </label>

              <button
                className="primary wide"
                onClick={() => {
                  save()
                  setTab('Scene Studio')
                }}
              >
                Create Scene Plan
              </button>
            </section>
          )}

          {tab === 'Character Vault' && (
            <section className="panel">
              <h2>Character Vault</h2>

              <p className="muted">
                Reference images remain the source of truth
                for identity and continuity.
              </p>

              <div className="vault">
                <div className="drop">
                  {character ? (
                    <img src={character} alt="Character reference" />
                  ) : (
                    <>
                      <span>＋</span>
                      <b>Upload character reference</b>
                      <small>
                        Face • hair • skin tone • proportions •
                        tattoos • identifiers
                      </small>
                    </>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0]

                    if (!file) return

                    const reader = new FileReader()

                    reader.onload = () =>
                      setCharacter(String(reader.result))

                    reader.readAsDataURL(file)
                  }}
                />

                <div className="checklist">
                  ✓ Face consistency
                  <br />
                  ✓ Hair consistency
                  <br />
                  ✓ Recognizable features
                  <br />
                  ✓ Project-level reference lock
                </div>
              </div>
            </section>
          )}

          {tab === 'Render Queue' && (
            <section className="panel">
              <div className="row">
                <h2>Render Queue</h2>

                <button
                  className="primary"
                  onClick={renderAll}
                >
                  Render All Demo
                </button>
              </div>

              <p className="muted">
                Provider-ready queue. Demo mode simulates jobs
                locally until a real video provider is connected.
              </p>

              <div className="queue">
                {scenes.map((scene, index) => (
                  <button
                    key={scene.id}
                    className="job"
                    onClick={() => {
                      setSelected(index)
                      setTab('Scene Studio')
                    }}
                  >
                    <span>
                      SCENE {String(scene.n).padStart(3, '0')}
                    </span>

                    <b>{scene.status.toUpperCase()}</b>

                    <i>
                      {scene.prompt || 'No prompt yet'}
                    </i>
                  </button>
                ))}
              </div>
            </section>
          )}

          {tab === 'My Films' && (
            <section className="panel">
              <div className="row">
                <h2>My Films</h2>

                <button onClick={create}>
                  + New Film
                </button>
              </div>

              {films.length === 0 ? (
                <div className="empty">
                  No saved films yet.
                </div>
              ) : (
                films.map((item) => (
                  <button
                    className="film"
                    key={item.id}
                    onClick={() => {
                      setFilm(item)
                      setScenes(makeScenes(item.duration))
                      setTab('Studio')
                    }}
                  >
                    <b>{item.title}</b>

                    <span>
                      {labels(item.duration)} • {item.scenes}{' '}
                      scenes • {item.style}
                    </span>
                  </button>
                ))
              )}
            </section>
          )}

          {[
            'Studio',
            'Scene Studio',
            'Director',
            'Timeline',
            'Asset Library',
            'Voice Studio',
            'Sound Studio',
            'Subtitles',
            'Color',
            'Export',
          ].includes(tab) && (
            <>
              <section className="panel">
                <div className="row">
                  <div>
                    <p className="eyebrow">
                      SCENE ENGINE
                    </p>

                    <h2>
                      {tab === 'Studio'
                        ? 'Film Control Center'
                        : tab}
                    </h2>
                  </div>

                  <button
                    className="primary"
                    onClick={() => setTab('Scene Studio')}
                  >
                    Open Scene Studio
                  </button>
                </div>

                <div className="sceneStrip">
                  {scenes.slice(0, 24).map((scene, index) => (
                    <button
                      key={scene.id}
                      className={`${index === selected ? 'sel ' : ''}${scene.status}`}
                      onClick={() => {
                        setSelected(index)
                        setTab('Scene Studio')
                      }}
                    >
                      {scene.n}
                    </button>
                  ))}

                  {scenes.length > 24 && (
                    <span>+{scenes.length - 24}</span>
                  )}
                </div>
              </section>

              {tab === 'Scene Studio' && current && (
                <section className="panel">
                  <div className="row">
                    <h2>Scene {current.n}</h2>

                    <span
                      className={`status ${current.status}`}
                    >
                      {current.status}
                    </span>
                  </div>

                  <div className="grid2">
                    <label>
                      Environment

                      <input
                        value={current.environment}
                        onChange={(event) =>
                          updateScene({
                            environment: event.target.value,
                          })
                        }
                        placeholder="Location, time, atmosphere"
                      />
                    </label>

                    <label>
                      Action

                      <input
                        value={current.action}
                        onChange={(event) =>
                          updateScene({
                            action: event.target.value,
                          })
                        }
                        placeholder="What happens in this scene"
                      />
                    </label>

                    <label>
                      Camera

                      <input
                        value={current.camera}
                        onChange={(event) =>
                          updateScene({
                            camera: event.target.value,
                          })
                        }
                        placeholder="Lens, movement, framing"
                      />
                    </label>

                    <label>
                      Lighting

                      <input
                        value={current.lighting}
                        onChange={(event) =>
                          updateScene({
                            lighting: event.target.value,
                          })
                        }
                        placeholder="Lighting direction and mood"
                      />
                    </label>
                  </div>

                  <label>
                    Prompt

                    <textarea
                      value={current.prompt}
                      onChange={(event) =>
                        updateScene({
                          prompt: event.target.value,
                        })
                      }
                      placeholder="Write the exact generation prompt for this 10-second scene..."
                    />
                  </label>

                  <label>
                    Dialogue

                    <textarea
                      value={current.dialogue}
                      onChange={(event) =>
                        updateScene({
                          dialogue: event.target.value,
                        })
                      }
                    />
                  </label>

                  <label>
                    Sound

                    <textarea
                      value={current.sound}
                      onChange={(event) =>
                        updateScene({
                          sound: event.target.value,
                        })
                      }
                    />
                  </label>

                  <div className="row">
                    <button
                      onClick={() => demoRender(selected)}
                    >
                      Render Scene
                    </button>

                    <button
                      onClick={() =>
                        updateScene({ status: 'queued' })
                      }
                    >
                      Reset
                    </button>

                    <button
                      className="primary"
                      onClick={() =>
                        setSelected(
                          Math.min(
                            selected + 1,
                            scenes.length - 1,
                          ),
                        )
                      }
                    >
                      Next Scene →
                    </button>
                  </div>
                </section>
              )}
            </>
          )}
        </section>
      </div>

      <footer>
        DAVITECH AI CINEMA • FREE APPLICATION • NO SUBSCRIPTION
        • NO IN-APP PURCHASE • NO FEATURE PAYWALL
      </footer>
    </main>
  )
                    }
