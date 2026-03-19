import { useState } from 'react'
import './LayoutV4.css'
import './LayoutV2Extra.css'

export default function LayoutV3() {
  const [selectedPlan, setSelectedPlan] = useState('subscription')
  const [advantagePlus, setAdvantagePlus] = useState(false)
  const [showCompare, setShowCompare] = useState(false)

  const subTotal = advantagePlus ? 400 : 350

  const cartData = selectedPlan === 'subscription'
    ? {
        licenseType: 'Annual License',
        productName: 'Product1',
        planTitle: 'Subscription',
        seatPrice: 350,
        subscription: advantagePlus ? 'Premium Support' : 'Support',
        subscriptionNote: advantagePlus ? '50.00 USD yearly' : 'Included in license',
        total: subTotal,
        totalPeriod: '/year',
      }
    : {
        licenseType: 'Perpetual License',
        productName: 'Product1',
        planTitle: 'Lifetime',
        seatPrice: 800,
        subscription: 'Premium Support',
        subscriptionNote: 'First year included, then 350.00 USD yearly',
        total: 800,
        totalPeriod: 'one-time',
      }

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

      <div className="v2-content">
        <div className="v2x-main">
          {/* ── 2 Plan cards ── */}
          <div className="v2x-cards-grid v2x-cards-grid--2">
            {/* Subscription card */}
            <div
              className={`v2-card v2x-card--selectable ${selectedPlan === 'subscription' ? 'v2x-card--selected' : ''}`}
              onClick={() => setSelectedPlan('subscription')}
            >
              <div className="v2-card-top">
                <div className="v2x-card-title-row">
                  <input
                    type="radio"
                    name="plan-v3"
                    value="subscription"
                    checked={selectedPlan === 'subscription'}
                    onChange={() => setSelectedPlan('subscription')}
                    className="v2-radio"
                  />
                  <h2 className="v2-card-title">Subscription</h2>
                </div>
                <p className="v2-card-tagline">Use our software as long as you subscribe.</p>
              </div>

              <div className="v2-card-price-block">
                <span className="v2-card-price">${advantagePlus ? '400' : '350'}</span>
                <span className="v2-card-price-period">/year</span>
              </div>

              <ul className="v2-card-features">
                <li className="v2-feature-row">
                  <svg className="v2-feature-icon" viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="v2-feature-label">Latest version</span>
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

              {/* Advantage+ add-on */}
              <label className="v2-addon" onClick={(e) => e.stopPropagation()}>
                <div className="v2-addon-check">
                  <input
                    type="checkbox"
                    checked={advantagePlus}
                    onChange={(e) => setAdvantagePlus(e.target.checked)}
                    className="v2-addon-input"
                  />
                </div>
                <div className="v2-addon-content">
                  <div className="v2-addon-header">
                    <span className="v2-addon-title">Upgrade to Premium Support</span>
                    <span className="v2-addon-price">+$50/year</span>
                  </div>
                  
                </div>
              </label>
            </div>

            {/* Lifetime card */}
            <div
              className={`v2-card v2x-card--selectable ${selectedPlan === 'lifetime' ? 'v2x-card--selected' : ''}`}
              onClick={() => setSelectedPlan('lifetime')}
            >
              <div className="v2-card-top">
                <div className="v2x-card-title-row">
                  <input
                    type="radio"
                    name="plan-v3"
                    value="lifetime"
                    checked={selectedPlan === 'lifetime'}
                    onChange={() => setSelectedPlan('lifetime')}
                    className="v2-radio"
                  />
                  <h2 className="v2-card-title">Lifetime</h2>
                </div>
                <p className="v2-card-tagline">Use the software forever with a one-time purchase.</p>
              </div>

              <div className="v2-card-price-block">
                <span className="v2-card-price">$800</span>
                <span className="v2-card-price-period">one-time</span>
              </div>

              <ul className="v2-card-features">
                <li className="v2-feature-row">
                  <svg className="v2-feature-icon" viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="v2-feature-label">Lifetime access to current version</span>
                  </div>
                </li>
                <li className="v2-feature-header" style={{marginTop: '12px', fontWeight: 'bold', color: '#3b2d5c'}}>
                  First year included, then $350/yearly:
                </li>
                <li className="v2-feature-row v2-feature-indent">
                  <svg className="v2-feature-icon" viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="v2-feature-label">Premium support</span>
                  </div>
                </li>
                <li className="v2-feature-row v2-feature-indent">
                  <svg className="v2-feature-icon" viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="v2-feature-label">Latest version</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* ── Compare modal (reused from V4) ── */}
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
              <div className="v2-compare-row"><div className="v2-compare-cell v2-compare-cell--label">Tech support hours</div><div className="v2-compare-cell v2-compare-cell--adv">10 hrs / developer</div><div className="v2-compare-cell v2-compare-cell--advplus v2-compare-cell--bold">20 hrs / developer</div></div>
              <div className="v2-compare-row"><div className="v2-compare-cell v2-compare-cell--label">Initial response time</div><div className="v2-compare-cell v2-compare-cell--adv">36 hours</div><div className="v2-compare-cell v2-compare-cell--advplus v2-compare-cell--bold">17 hours</div></div>
              <div className="v2-compare-row"><div className="v2-compare-cell v2-compare-cell--label">Dedicated Support Engineer</div><div className="v2-compare-cell v2-compare-cell--adv"><span className="v2-compare-dash">&mdash;</span></div><div className="v2-compare-cell v2-compare-cell--advplus"><svg className="v2-compare-check" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div></div>
              <div className="v2-compare-row"><div className="v2-compare-cell v2-compare-cell--label">Video calls</div><div className="v2-compare-cell v2-compare-cell--adv"><span className="v2-compare-dash">&mdash;</span></div><div className="v2-compare-cell v2-compare-cell--advplus"><svg className="v2-compare-check" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div></div>
              <div className="v2-compare-section-label">Access</div>
              <div className="v2-compare-row"><div className="v2-compare-cell v2-compare-cell--label">All new releases</div><div className="v2-compare-cell v2-compare-cell--adv"><svg className="v2-compare-check" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div><div className="v2-compare-cell v2-compare-cell--advplus"><svg className="v2-compare-check" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div></div>
              <div className="v2-compare-row"><div className="v2-compare-cell v2-compare-cell--label">Emergency hotfixes</div><div className="v2-compare-cell v2-compare-cell--adv"><svg className="v2-compare-check" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div><div className="v2-compare-cell v2-compare-cell--advplus"><svg className="v2-compare-check" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div></div>
              <div className="v2-compare-row"><div className="v2-compare-cell v2-compare-cell--label">2nd line support by core devs</div><div className="v2-compare-cell v2-compare-cell--adv"><svg className="v2-compare-check" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div><div className="v2-compare-cell v2-compare-cell--advplus"><svg className="v2-compare-check" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div></div>
              <div className="v2-compare-row"><div className="v2-compare-cell v2-compare-cell--label">Online chat support</div><div className="v2-compare-cell v2-compare-cell--adv"><svg className="v2-compare-check" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div><div className="v2-compare-cell v2-compare-cell--advplus"><svg className="v2-compare-check" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div></div>
              <div className="v2-compare-section-label">Guidance</div>
              <div className="v2-compare-row"><div className="v2-compare-cell v2-compare-cell--label">Implementation guidance</div><div className="v2-compare-cell v2-compare-cell--adv"><span className="v2-compare-dash">&mdash;</span></div><div className="v2-compare-cell v2-compare-cell--advplus"><svg className="v2-compare-check" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div></div>
              <div className="v2-compare-row"><div className="v2-compare-cell v2-compare-cell--label">Code reviews & best practices</div><div className="v2-compare-cell v2-compare-cell--adv"><span className="v2-compare-dash">&mdash;</span></div><div className="v2-compare-cell v2-compare-cell--advplus"><svg className="v2-compare-check" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
