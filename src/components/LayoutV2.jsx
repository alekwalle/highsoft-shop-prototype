import { useState } from 'react'
import './LayoutV4.css'
import './LayoutV2Extra.css'

export default function LayoutV2() {
  const [selectedPlan, setSelectedPlan] = useState('yearly-subscription')

  const plans = [
    {
      id: 'basic-subscription',
      title: 'Subscription',
      tagline: 'Flexible access',
      description: 'Use our software and updates as long as you subscribe, with Support.',
      price: '$366',
      pricePeriod: '/year',
      features: [
        { label: 'Latest versions', desc: 'Access to all updates during your subscription' },
        { label: 'Support', desc: 'Standard support included with your license' },
      ],
      cart: {
        licenseType: 'Annual License',
        productName: 'Product1',
        seatPrice: 366,
        subscription: 'Support',
        subscriptionNote: 'Included in license',
        total: 366,
        totalPeriod: '/year'
      }
    },
    {
      id: 'yearly-subscription',
      title: 'Subscription+',
      tagline: 'Best value',
      recommended: true,
      description: 'Use our software and updates as long as you subscribe, with Premium Support.',
      price: '$512',
      pricePeriod: '/year',
      features: [
        { label: 'Latest versions', desc: 'Access to all updates during your subscription' },
        { label: 'Premium Support', desc: 'Priority support with faster response times' },
      ],
      cart: {
        licenseType: 'Annual License',
        productName: 'Product1',
        seatPrice: 366,
        subscription: 'Premium Support',
        subscriptionNote: '146.00 USD yearly',
        total: 512,
        totalPeriod: '/year'
      }
    },
    {
      id: 'lifetime-license',
      title: 'Lifetime',
      tagline: 'Permanent license',
      description: 'Own the software forever. Includes one year of updates and Premium Support.',
      price: '$839',
      pricePeriod: 'one-time',
      renewalNote: '$336 yearly for updates after first year',
      features: [
        { label: 'Lifetime access', desc: 'Permanent access to the version at purchase' },
        { label: 'Premium Support', desc: '1 year included, then 335.60 USD yearly' },
      ],
      cart: {
        licenseType: 'Perpetual License',
        productName: 'Product1',
        seatPrice: 839,
        subscription: 'Premium Support',
        subscriptionNote: 'First year included, then 335.60 USD yearly',
        total: 839,
        totalPeriod: 'one-time'
      }
    }
  ]

  const selectedPlanData = plans.find(p => p.id === selectedPlan)

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

      <div className="v2-content v2-content--wide">
        <div className="v2x-main">
          {/* ── 3 Plan cards ── */}
          <div className="v2x-cards-grid v2x-cards-grid--3">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.id
              return (
                <div
                  key={plan.id}
                  className={`v2-card v2x-card--selectable ${isSelected ? 'v2x-card--selected' : ''} ${plan.recommended ? 'v2x-card--has-ribbon' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.recommended && (
                    <div className="v2x-card-ribbon-floating">Recommended</div>
                  )}
                  <div className="v2-card-top">
                    <div className="v2x-card-title-row">
                      <input
                        type="radio"
                        name="plan-v2"
                        value={plan.id}
                        checked={isSelected}
                        onChange={() => setSelectedPlan(plan.id)}
                        className="v2-radio"
                      />
                      <h2 className="v2-card-title">{plan.title}</h2>
                    </div>
                    <p className="v2-card-description">{plan.description}</p>
                  </div>

                  <div className="v2-card-price-block">
                    <span className="v2-card-price">{plan.price}</span>
                    <span className="v2-card-price-period">{plan.pricePeriod}</span>
                  </div>

                  <ul className="v2-card-features">
                    {plan.features.map((f, i) => (
                      <li key={i} className="v2-feature-row">
                        <svg className="v2-feature-icon" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="v2-feature-label">{f.label}</span>
                      </li>
                    ))}
                  </ul>

                </div>
              )
            })}
          </div>

          {/* ── Cart ── */}
          {selectedPlanData && (
            <aside className="v2-cart">
              <div className="v2-cart-inner">
                <h3 className="v2-cart-heading">Order Summary</h3>

                <div className="v2-cart-product-row">
                  <span className="v2-cart-product-name">{selectedPlanData.cart.productName}</span>
                  <span className="v2-cart-license-badge">{selectedPlanData.cart.licenseType}</span>
                </div>

                <div className="v2-cart-line-items">
                  <div className="v2-cart-line">
                    <span className="v2-cart-line-label">{selectedPlanData.title}</span>
                    <span className="v2-cart-line-value">${selectedPlanData.cart.seatPrice.toFixed(2)}</span>
                  </div>
                  <div className="v2-cart-line">
                    <span className="v2-cart-line-label">{selectedPlanData.cart.subscription}</span>
                    <span className="v2-cart-line-value-sub">{selectedPlanData.cart.subscriptionNote}</span>
                  </div>
                </div>

                <div className="v2-cart-total">
                  <span className="v2-cart-total-label">Total</span>
                  <div className="v2-cart-total-amount">
                    <span className="v2-cart-total-number">${selectedPlanData.cart.total.toFixed(2)}</span>
                    <span className="v2-cart-total-suffix">USD {selectedPlanData.cart.totalPeriod}</span>
                  </div>
                </div>

                <button className="v2-cart-checkout">Proceed to Checkout</button>
                <p className="v2-cart-secure">Secure checkout</p>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}
