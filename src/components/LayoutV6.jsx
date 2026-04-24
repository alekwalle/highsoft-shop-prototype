import { useState, useEffect, useRef } from 'react'
import './LayoutV4.css'
import './LayoutV5Extra.css'
import ProductPicker, { addonPrices, corePrice, getStandalonePrice, moduleMeta, standaloneMeta } from './ProductPicker.jsx'

const initialAddons = { stock: false, maps: false, gantt: false, python: false }
const initialStandalone = Object.fromEntries(standaloneMeta.map((p) => [p.key, 0]))

const baseYearly = 350
const premiumYearly = 50
const lifetimeOnetime = 400

function formatUSD(value) {
  return `${value.toFixed(2)} USD`
}

function AppDropdown({ count, onSelect }) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const close = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <div ref={wrapperRef} className="seat-dropdown">
      <button className="seat-dropdown__trigger" onClick={() => setOpen((v) => !v)}>
        {count}
        <svg viewBox="0 0 10 6" width="10" height="6" fill="none" aria-hidden="true">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div className="seat-dropdown__menu">
          {[1, 2].map((n) => (
            <button
              key={n}
              className={`seat-dropdown__option${count === n ? ' seat-dropdown__option--active' : ''}`}
              onClick={() => { onSelect(n); setOpen(false) }}
            >
              {n}
            </button>
          ))}
          <div className="seat-dropdown__divider" />
          <button className="seat-dropdown__option seat-dropdown__option--contact" onClick={() => setOpen(false)}>
            Need 3 or more? Contact Sales
          </button>
        </div>
      )}
    </div>
  )
}

export default function LayoutV6() {
  const [seats, setSeats] = useState(0)
  const [addons, setAddons] = useState(initialAddons)
  const [standaloneItems, setStandaloneItems] = useState(initialStandalone)

  const [licenseType, setLicenseType] = useState('subscription')
  const [premiumSupport, setPremiumSupport] = useState(false)
  const [usageType, setUsageType] = useState(null)
  const [usageAppCount, setUsageAppCount] = useState(1)

  const hasSeats = seats > 0
  const isLifetime = licenseType === 'lifetime'
  const hasPremium = premiumSupport

  const handleSeatChange = (count) => {
    if (count === 0) setAddons(initialAddons)
    setSeats(count)
  }

  const handleAddonToggle = (key) => {
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleStandaloneChange = (key, count) => {
    setStandaloneItems((prev) => ({ ...prev, [key]: count }))
  }

  const handleClear = () => {
    setSeats(0)
    setAddons(initialAddons)
    setStandaloneItems(initialStandalone)
    setLicenseType('subscription')
    setPremiumSupport(false)
    setUsageType(null)
    setUsageAppCount(1)
  }

  // Cart items
  const pickerItems = hasSeats
    ? [
        { key: 'core', label: `Highcharts Core × ${seats}`, amount: corePrice * seats },
        ...moduleMeta
          .filter((m) => addons[m.key])
          .map((m) => ({ key: m.key, label: `${m.name} × ${seats}`, amount: addonPrices[m.key] * seats })),
      ]
    : []

  const standaloneCartItems = standaloneMeta
    .filter((p) => standaloneItems[p.key] > 0)
    .map((p) => {
      const count = standaloneItems[p.key]
      return { key: p.key, label: `${p.name} × ${count}`, amount: getStandalonePrice(p, false) * count }
    })

  const licenseItems = [
    { key: 'sub', label: 'Subscription', amount: baseYearly, period: '/year' },
    ...(hasPremium ? [{ key: 'premium', label: 'Premium Support', amount: premiumYearly, period: '/year' }] : []),
    ...(isLifetime ? [{ key: 'lifetime', label: 'Lifetime access', amount: lifetimeOnetime, period: 'one-time' }] : []),
  ]

  const allItems = [...pickerItems, ...standaloneCartItems, ...licenseItems]
  const total = allItems.reduce((sum, item) => sum + item.amount, 0)

  const renewalAmount = baseYearly + (hasPremium ? premiumYearly : 0)

  return (
    <div className="v2">
      <div className="v2-hero">
        <div className="v2-hero-inner">
          <h1 className="v2-hero-title">Configure your license</h1>
        </div>
      </div>

      <div className="v2-content">
        <div className="v6-layout">

          {/* ── Left column ── */}
          <div className="v6-left">
            <ProductPicker
              seats={seats}
              addons={addons}
              onSeatChange={handleSeatChange}
              onAddonToggle={handleAddonToggle}
              standaloneItems={standaloneItems}
              onStandaloneChange={handleStandaloneChange}
              useStandaloneDiscounts={false}
            />

            <div className="v2-card">
              <div className="v2-card-top v5-card-top">
                <div className="v5-title-price-row">
                  <h2 className="v2-card-title">Subscription</h2>
                  <div className="v2-card-price-block v5-price-over">
                    <span className="v2-card-price">$350</span>
                    <span className="v2-card-price-period">/year</span>
                  </div>
                </div>
                <p>Gives you access to use the software as long as you subscribe</p>
              </div>

              <ul className="v2-card-features">
                <li className="v2-feature-row">
                  <svg className="v2-feature-icon" viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="v2-feature-label">Always the latest version</span>
                </li>
                <li className="v2-feature-row">
                  <svg className="v2-feature-icon" viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="v2-feature-label">Advantage</span>
                </li>
              </ul>

              <div className="v5-upgrade-header">Extras</div>

              <label className="v2-addon" onClick={(e) => e.stopPropagation()}>
                <div className="v2-addon-check">
                  <input
                    type="checkbox"
                    checked={hasPremium}
                    onChange={(e) => setPremiumSupport(e.target.checked)}
                    className="v2-addon-input"
                  />
                </div>
                <div className="v2-addon-content">
                  <div className="v2-addon-header">
                    <span className="v2-addon-title">Advantage Plus</span>
                    <span className="v2-addon-price">+$50/year</span>
                  </div>
                  <span className="v2-addon-desc">Priority support with faster response times and dedicated assistance.</span>
                </div>
              </label>

              <label className="v2-addon v5-addon-lifetime" onClick={(e) => e.stopPropagation()}>
                <div className="v2-addon-check">
                  <input
                    type="checkbox"
                    checked={isLifetime}
                    onChange={(e) => setLicenseType(e.target.checked ? 'lifetime' : 'subscription')}
                    className="v2-addon-input"
                  />
                </div>
                <div className="v2-addon-content">
                  <div className="v2-addon-header">
                    <span className="v2-addon-title">Lifetime access to current version</span>
                    <span className="v2-addon-price">+$400 one-time</span>
                  </div>
                  <span className="v2-addon-desc">Gives you a fallback to the current version when subscription ends</span>
                </div>
              </label>
            </div>

            <div className="v2-card v6-usage-card">
              <div className="v6-internal-heading">
                <h2 className="hc-picker__title">Who will use this software?</h2>
                <p className="hc-picker__subtitle">This determines which license type applies.</p>
              </div>

              <button
                className={`v6-usage-option${usageType === 'internal' ? ' v6-usage-option--selected' : ''}`}
                onClick={() => setUsageType('internal')}
              >
                <div className="v6-usage-left">
                  <div className={`v6-usage-radio${usageType === 'internal' ? ' v6-usage-radio--selected' : ''}`} />
                  <span className="v6-internal-label">Internal only</span>
                </div>
                <span className="v6-internal-desc">Users within your organisation</span>
              </button>

              <button
                className={`v6-usage-option${usageType === 'saas' ? ' v6-usage-option--selected' : ''}`}
                onClick={() => setUsageType('saas')}
              >
                <div className="v6-usage-left">
                  <div className={`v6-usage-radio${usageType === 'saas' ? ' v6-usage-radio--selected' : ''}`} />
                  <span className="v6-internal-label">SaaS / External</span>
                </div>
                <span className="v6-internal-desc">Customers, clients, or the public</span>
              </button>

              {usageType === 'saas' && (
                <div className="v6-usage-apps">
                  <span className="v6-apps-desc">Number of applications</span>
                  <AppDropdown count={usageAppCount} onSelect={setUsageAppCount} />
                </div>
              )}
            </div>
          </div>

          {/* ── Right column: cart ── */}
          <div className="picker-cart v6-cart">
            <h2 className="picker-cart__title">Cart</h2>
            <ul className="picker-cart__items">
              {allItems.map((item) => (
                <li key={item.key} className="picker-cart__item">
                  <span>{item.label}</span>
                  <span>{formatUSD(item.amount)}</span>
                </li>
              ))}
            </ul>
            <div className="picker-cart__divider" />
            <div className="picker-cart__total">
              <span>Total today</span>
              <span>${total.toLocaleString('en-US')}</span>
            </div>
            {renewalAmount > 0 && (
              <div className="v6-cart-renewal">Then ${renewalAmount}/year</div>
            )}
            <button className="picker-cart__clear" onClick={handleClear}>
              Clear selection
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
