import { useState } from 'react'
import './LayoutV4.css'
import './LayoutV5Extra.css'

export default function LayoutV5() {
  const [licenseType, setLicenseType] = useState('subscription') // 'subscription' | 'lifetime'
  const [premiumSupport, setPremiumSupport] = useState(false)
  const [showCompare, setShowCompare] = useState(false)

  const isLifetime = licenseType === 'lifetime'
  // Lifetime always includes Premium Support
  const hasPremium = isLifetime || premiumSupport

  const handleLicenseChange = (type) => {
    setLicenseType(type)
    if (type === 'lifetime') {
      setPremiumSupport(true)
    }
  }

  // Derive cart values
  const cart = (() => {
    if (!isLifetime) {
      const base = 366
      const advPlus = hasPremium ? 146 : 0
      return {
        productName: 'Product1',
        licenseType: 'Annual License',
        planTitle: 'Subscription',
        seatPrice: base,
        subscription: hasPremium ? 'Premium Support' : 'Support',
        subscriptionNote: hasPremium ? '146.00 USD yearly' : 'Included in license',
        total: base + advPlus,
        totalPeriod: '/year',
      }
    }
    return {
      productName: 'Product1',
      licenseType: 'Perpetual License',
      planTitle: 'Lifetime',
      seatPrice: 839,
      subscription: 'Premium Support',
      subscriptionNote: 'Included in first year',
      total: 839,
      totalPeriod: 'one-time',
    }
  })()

  // Price display
  const displayPrice = isLifetime ? '$839' : (hasPremium ? '$512' : '$366')
  const displayPeriod = isLifetime ? 'one-time' : '/year'

  return (
    <div className="v2">
      <div className="v2-hero">
        <div className="v2-hero-inner">
          <h1 className="v2-hero-title">Choose your plan</h1>
          <p className="v2-hero-subtitle">
            Flexible licensing to match how you build. Subscribe for continuous access, or own it forever.
          </p>
        </div>
      </div>

      <div className="v2-content smaller">
        <div className="v2-main">
          {/* ── Plan card ── */}
          <div className="v2-card">
            <div className="v2-card-top">
              <h2 className="v2-card-title">Product1</h2>
              <p className="v2-card-tagline">{isLifetime ? 'Lifetime license for one developer' : 'Annual subscription for one developer'}</p>
            </div>

            <div className="v2-card-price-block">
              <span className="v2-card-price">{displayPrice}</span>
              <span className="v2-card-price-period">{displayPeriod}</span>
            </div>

            <ul className="v2-card-features">
              <li className="v2-feature-row">
                <svg className="v2-feature-icon" viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="v2-feature-label">
                    {isLifetime ? 'Permanent access to your version' : 'Always the latest version'}
                  </span>
                </div>
              </li>
              <li className="v2-feature-row">
                <svg className="v2-feature-icon" viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="v2-feature-label">
                    {hasPremium ? 'Premium Support' : 'Support'}
                    {isLifetime && ' — 1 year included'}
                  </span>
                </div>
              </li>
            </ul>

            {/* Premium Support add-on */}
            <label className={`v2-addon ${isLifetime ? 'v5-addon--locked' : ''}`} onClick={(e) => e.stopPropagation()}>
              <div className="v2-addon-check">
                <input
                  type="checkbox"
                  checked={hasPremium}
                  onChange={(e) => !isLifetime && setPremiumSupport(e.target.checked)}
                  disabled={isLifetime}
                  className="v2-addon-input"
                />
              </div>
              <div className="v2-addon-content">
                <div className="v2-addon-header">
                  <span className="v2-addon-title">Upgrade to Premium Support</span>
                  {isLifetime
                    ? <span className="v5-addon-included">Included in first year</span>
                    : <span className="v2-addon-price">+$146/year</span>
                  }
                </div>
                <span className="v2-addon-desc">Priority support with faster response times and dedicated assistance.</span>
              </div>
            </label>
            {/* Lifetime license option */}
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
                  <span className="v2-addon-title">Lifetime License</span>
                  <span className="v2-addon-price">$839 one-time</span>
                </div>
                <span className="v2-addon-desc">Own the software forever instead of subscribing. Includes Premium Support for the first year.</span>
                {isLifetime && (
                  <span className="v5-addon-renewal">Premium Support renews at $336/year after the first year.</span>
                )}
              </div>
            </label>

            <button className="v2-compare-link" onClick={() => setShowCompare(true)}>
              Compare Support vs Premium Support
            </button>
          </div>

          {/* ── Cart ── */}
          <aside className="v2-cart">
            <div className="v2-cart-inner">
              <h3 className="v2-cart-heading">Order Summary</h3>

              <div className="v2-cart-product-row">
                <span className="v2-cart-product-name">{cart.productName}</span>
                <span className="v2-cart-license-badge">{cart.licenseType}</span>
              </div>

              <div className="v2-cart-line-items">
                <div className="v2-cart-line">
                  <span className="v2-cart-line-label">{cart.planTitle}</span>
                  <span className="v2-cart-line-value">${cart.seatPrice.toFixed(2)}</span>
                </div>
                <div className="v2-cart-line">
                  <span className="v2-cart-line-label">{cart.subscription}</span>
                  <span className="v2-cart-line-value-sub">{cart.subscriptionNote}</span>
                </div>
              </div>

              <div className="v2-cart-total">
                <span className="v2-cart-total-label">Total</span>
                <div className="v2-cart-total-amount">
                  <span className="v2-cart-total-number">${cart.total.toFixed(2)}</span>
                  <span className="v2-cart-total-suffix">USD {cart.totalPeriod}</span>
                </div>
              </div>

              <button className="v2-cart-checkout">Proceed to Checkout</button>
              <p className="v2-cart-secure">Secure checkout</p>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Compare modal ── */}
      {showCompare && (
        <div className="v2-modal-overlay" onClick={() => setShowCompare(false)}>
          <div className="v2-modal" onClick={(e) => e.stopPropagation()}>
            <div className="v2-modal-header">
              <h2 className="v2-modal-title">Compare plans</h2>
              <button className="v2-modal-close" onClick={() => setShowCompare(false)}>&times;</button>
            </div>

            <div className="v2-compare-table">
              <div className="v2-compare-row v2-compare-row--header">
                <div className="v2-compare-cell v2-compare-cell--label"></div>
                <div className="v2-compare-cell v2-compare-cell--adv">Support</div>
                <div className="v2-compare-cell v2-compare-cell--advplus">Premium Support</div>
              </div>

              <div className="v2-compare-section-label">Support</div>

              <div className="v2-compare-row">
                <div className="v2-compare-cell v2-compare-cell--label">Tech support hours</div>
                <div className="v2-compare-cell v2-compare-cell--adv">10 hrs / developer</div>
                <div className="v2-compare-cell v2-compare-cell--advplus v2-compare-cell--bold">20 hrs / developer</div>
              </div>
              <div className="v2-compare-row">
                <div className="v2-compare-cell v2-compare-cell--label">Initial response time</div>
                <div className="v2-compare-cell v2-compare-cell--adv">36 hours</div>
                <div className="v2-compare-cell v2-compare-cell--advplus v2-compare-cell--bold">17 hours</div>
              </div>
              <div className="v2-compare-row">
                <div className="v2-compare-cell v2-compare-cell--label">Dedicated Support Engineer</div>
                <div className="v2-compare-cell v2-compare-cell--adv"><span className="v2-compare-dash">&mdash;</span></div>
                <div className="v2-compare-cell v2-compare-cell--advplus">
                  <svg className="v2-compare-check" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
              </div>
              <div className="v2-compare-row">
                <div className="v2-compare-cell v2-compare-cell--label">Video calls</div>
                <div className="v2-compare-cell v2-compare-cell--adv"><span className="v2-compare-dash">&mdash;</span></div>
                <div className="v2-compare-cell v2-compare-cell--advplus">
                  <svg className="v2-compare-check" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
              </div>

              <div className="v2-compare-section-label">Access</div>

              <div className="v2-compare-row">
                <div className="v2-compare-cell v2-compare-cell--label">All new releases</div>
                <div className="v2-compare-cell v2-compare-cell--adv">
                  <svg className="v2-compare-check" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
                <div className="v2-compare-cell v2-compare-cell--advplus">
                  <svg className="v2-compare-check" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
              </div>
              <div className="v2-compare-row">
                <div className="v2-compare-cell v2-compare-cell--label">Emergency hotfixes</div>
                <div className="v2-compare-cell v2-compare-cell--adv">
                  <svg className="v2-compare-check" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
                <div className="v2-compare-cell v2-compare-cell--advplus">
                  <svg className="v2-compare-check" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
              </div>
              <div className="v2-compare-row">
                <div className="v2-compare-cell v2-compare-cell--label">2nd line support by core devs</div>
                <div className="v2-compare-cell v2-compare-cell--adv">
                  <svg className="v2-compare-check" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
                <div className="v2-compare-cell v2-compare-cell--advplus">
                  <svg className="v2-compare-check" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
              </div>
              <div className="v2-compare-row">
                <div className="v2-compare-cell v2-compare-cell--label">Online chat support</div>
                <div className="v2-compare-cell v2-compare-cell--adv">
                  <svg className="v2-compare-check" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
                <div className="v2-compare-cell v2-compare-cell--advplus">
                  <svg className="v2-compare-check" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
              </div>

              <div className="v2-compare-section-label">Guidance</div>

              <div className="v2-compare-row">
                <div className="v2-compare-cell v2-compare-cell--label">Implementation guidance</div>
                <div className="v2-compare-cell v2-compare-cell--adv"><span className="v2-compare-dash">&mdash;</span></div>
                <div className="v2-compare-cell v2-compare-cell--advplus">
                  <svg className="v2-compare-check" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
              </div>
              <div className="v2-compare-row">
                <div className="v2-compare-cell v2-compare-cell--label">Code reviews & best practices</div>
                <div className="v2-compare-cell v2-compare-cell--adv"><span className="v2-compare-dash">&mdash;</span></div>
                <div className="v2-compare-cell v2-compare-cell--advplus">
                  <svg className="v2-compare-check" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
