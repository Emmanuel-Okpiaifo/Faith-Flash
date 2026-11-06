import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { site } from '../content/site'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const isConnected = Boolean(
  site.notifyForm.action &&
    site.notifyForm.firstName &&
    site.notifyForm.lastName &&
    site.notifyForm.email,
)

export function NotifyForm() {
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const titleId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const firstField = useRef<HTMLInputElement>(null)
  const closeTimer = useRef<number | null>(null)

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstField.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  function openModal() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    setStatus('idle')
    setClosing(false)
    setOpen(true)
  }

  function closeModal() {
    setClosing(true)
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => {
      setOpen(false)
      setClosing(false)
      triggerRef.current?.focus()
    }, 260)
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const firstName = String(data.get('firstName') ?? '').trim()
    const lastName = String(data.get('lastName') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    if (!firstName || !lastName || !email) return

    if (!isConnected) {
      setStatus('error')
      return
    }

    const body = new FormData()
    body.append(site.notifyForm.firstName, firstName)
    body.append(site.notifyForm.lastName, lastName)
    body.append(site.notifyForm.email, email)

    setStatus('sending')
    try {
      await fetch(site.notifyForm.action, {
        method: 'POST',
        mode: 'no-cors',
        body,
      })
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <button ref={triggerRef} type="button" className="btn btn--gold notify-form__trigger" onClick={openModal}>
        Notify Me When Live
      </button>
      {open
        ? createPortal(
            <div className={`notify-modal${closing ? ' notify-modal--closing' : ''}`}>
              <button type="button" className="notify-modal__backdrop" aria-label="Close" onClick={closeModal} />
              <div
                className="notify-modal__panel"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
              >
                <button type="button" className="notify-modal__close" onClick={closeModal} aria-label="Close">
                  ×
                </button>
                <p className="notify-modal__eyebrow">Podcasts</p>
                <h2 id={titleId} className="notify-modal__title">Notify Me When Live</h2>
                {status === 'sent' ? (
                  <p className="notify-form__note">You’re on the list. We’ll let you know when we go live.</p>
                ) : (
                  <>
                    <p className="notify-modal__lede">Leave your name and email. We’ll write when the series is ready.</p>
                    <form className="notify-form" onSubmit={onSubmit}>
                      <div className="notify-form__row">
                        <label className="field">
                          <span className="field__label">First name</span>
                          <input ref={firstField} className="field__input" name="firstName" autoComplete="given-name" required />
                        </label>
                        <label className="field">
                          <span className="field__label">Last name</span>
                          <input className="field__input" name="lastName" autoComplete="family-name" required />
                        </label>
                      </div>
                      <label className="field">
                        <span className="field__label">Email address</span>
                        <input className="field__input" type="email" name="email" autoComplete="email" required />
                      </label>
                      <button className="btn btn--gold" type="submit" disabled={status === 'sending'}>
                        {status === 'sending' ? 'Sending…' : 'Send'}
                      </button>
                      {status === 'error' ? (
                        <p className="notify-form__note" role="alert">
                          {isConnected
                            ? 'That didn’t go through. Please try again.'
                            : 'This signup isn’t connected to a Google Form yet.'}
                        </p>
                      ) : null}
                    </form>
                  </>
                )}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
