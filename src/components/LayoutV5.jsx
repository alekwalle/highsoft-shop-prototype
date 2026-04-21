import { useState } from 'react'
import './LayoutV4.css'
import './LayoutV5Extra.css'

export default function LayoutV5() {
  const [licenseType, setLicenseType] = useState('subscription') // 'subscription' | 'lifetime'
  const [premiumSupport, setPremiumSupport] = useState(false)

  const isLifetime = licenseType === 'lifetime'
  const hasPremium = premiumSupport

  // Pricing pieces (kept static)
  const baseYearly = 350
  const premiumYearly = 50
  const lifetimeOnetime = 400
  const yearlyTotal = baseYearly + (hasPremium ? premiumYearly : 0)
  const onetimeTotal = isLifetime ? lifetimeOnetime : 0
  const payToday = yearlyTotal + onetimeTotal

  const handleLicenseChange = (type) => {
    setLicenseType(type)
  }

  // Price display
  const displayPrice = '$350'
  const displayPeriod = '/year'
  const renewalAmount = baseYearly + (hasPremium ? premiumYearly : 0)

  return (
    <div className="v2">
      <div className="v2-hero">
        <div className="v2-hero-inner">
          <h1 className="v2-hero-title">Configure your license</h1>
          {/* <p className="v2-hero-subtitle">
            Flexible licensing to match how you build. Subscribe for continuous access, or own it forever.
          </p> */}
        </div>
      </div>

      <div className="v2-content smaller">
        <div className="v2-main v5-single">
          {/* ── Plan card ── */}
          <div className="v2-card">
            <div className="v2-card-top v5-card-top">
              <div className="v5-title-price-row">
                <h2 className="v2-card-title">Subscription</h2>
                <div className="v2-card-price-block v5-price-over">
                  <span className="v2-card-price">{displayPrice}</span>
                  <span className="v2-card-price-period">{displayPeriod}</span>
                </div>
              </div>
              <p>Gives you access to use the software as long as you subscribe</p>
            </div>

            <ul className="v2-card-features">
              <li className="v2-feature-row">
                <svg className="v2-feature-icon" viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="v2-feature-label">Always the latest version</span>
                </div>
              </li>
              <li className="v2-feature-row">
                <svg className="v2-feature-icon" viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="v2-feature-label">Support</span>
                </div>
              </li>
            </ul>

            <div className="v5-upgrade-header">Extras</div>

            {/* Premium Support add-on (checkbox) */}
            <label className={`v2-addon ${isLifetime ? '' : ''}`} onClick={(e) => e.stopPropagation()}>
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
                  <span className="v2-addon-title">Premium Support</span>
                  <span className="v2-addon-price">+$50/year</span>
                </div>
                <span className="v2-addon-desc">Priority support with faster response times and dedicated assistance.</span>
              </div>
            </label>

            {/* Lifetime license option (checkbox) */}
            <label className="v2-addon v5-addon-lifetime" onClick={(e) => e.stopPropagation()}>
              <div className="v2-addon-check">
                <input
                  type="checkbox"
                  checked={isLifetime}
                  onChange={(e) => handleLicenseChange(e.target.checked ? 'lifetime' : 'subscription')}
                  className="v2-addon-input"
                />
              </div>
              <div className="v2-addon-content">
                <div className="v2-addon-header">
                  <span className="v2-addon-title">Lifetime access to current version</span>
                  <span className="v2-addon-price">+$400 one-time</span>
                </div>
                <span className="v2-addon-desc">Gives you a fallback to the current version when subsciption ends</span>
              </div>
            </label>
          </div>
          <div className="v5-total">
            <div className="v5-total-row v5-total-row--pay">
              <span>Total: </span>
              <span>${payToday}</span>
            </div>
            <div className="v5-total-row v5-total-row--renewal">
              <span>Then ${renewalAmount} /year</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
