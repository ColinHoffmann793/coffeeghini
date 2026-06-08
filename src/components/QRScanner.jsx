import { useEffect, useRef, useState } from 'react'
import { Icon } from '../icons.jsx'

const READER_ID = 'qr-reader'

export default function QRScanner({ onResult, onClose }) {
  const [status, setStatus] = useState('starting') // starting | scanning | nocam | done
  const scannerRef = useRef(null)
  const startedRef = useRef(false)
  const handledRef = useRef(false)

  // Resolve a scan into a result exactly once, then close.
  const finish = (text) => {
    if (handledRef.current) return
    handledRef.current = true
    setStatus('done')
    stop().finally(() => {
      onResult(text)
      setTimeout(onClose, 450)
    })
  }

  const stop = async () => {
    const inst = scannerRef.current
    if (inst && startedRef.current) {
      startedRef.current = false
      try {
        await inst.stop()
        await inst.clear()
      } catch {
        /* already stopped */
      }
    }
  }

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const { Html5Qrcode } = await import('html5-qrcode')
        if (cancelled) return
        const inst = new Html5Qrcode(READER_ID, { verbose: false })
        scannerRef.current = inst
        await inst.start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: { width: 220, height: 220 } },
          (decodedText) => finish(decodedText),
          () => {},
        )
        if (cancelled) {
          await stop()
          return
        }
        startedRef.current = true
        setStatus('scanning')
      } catch (err) {
        if (!cancelled) setStatus('nocam')
      }
    })()

    return () => {
      cancelled = true
      stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="scanner-overlay" role="dialog" aria-label="QR scanner">
      <div className="scanner-top">
        <span className="scanner-title">Scan a café QR code</span>
        <button className="scanner-close" onClick={onClose} aria-label="Close scanner">
          <Icon.Close width="22" height="22" />
        </button>
      </div>

      <div className="scanner-stage">
        <div id={READER_ID} className="qr-reader" />
        <div className={`scan-frame ${status === 'done' ? 'success' : ''}`}>
          <span className="corner tl" /><span className="corner tr" />
          <span className="corner bl" /><span className="corner br" />
          {status === 'scanning' && <span className="scan-line" />}
          {status === 'done' && (
            <div className="scan-success"><Icon.Check width="46" height="46" /></div>
          )}
          {status === 'starting' && <div className="scan-hint">Starting camera…</div>}
          {status === 'nocam' && (
            <div className="scan-hint">
              <Icon.Camera width="30" height="30" />
              <span>Camera unavailable here</span>
            </div>
          )}
        </div>
      </div>

      <div className="scanner-bottom">
        <p className="scanner-help">
          {status === 'scanning'
            ? 'Point your camera at the code on the counter.'
            : status === 'done'
              ? 'Stamp collected!'
              : 'No camera? Use the demo button below.'}
        </p>
        <button className="btn-simulate" onClick={() => finish(null)} disabled={status === 'done'}>
          <Icon.Sparkle width="16" height="16" /> Simulate scan
        </button>
      </div>
    </div>
  )
}
