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
      description: 'Use our software and updates as long as you subscribe.',
      price: '$350',
      pricePeriod: '/year',
      features: [
        { label: 'Latest version', color: 'green' },
        { label: 'Support', color: 'green' },
      ],
      cart: {
        licenseType: 'Annual License',
        productName: 'Product1',
        seatPrice: 350,
        subscription: 'Support',
        subscriptionNote: 'Included in license',
        total: 350,
        totalPeriod: '/year'
      }
    },
    {
      id: 'yearly-subscription',
      title: 'Subscription+',
      tagline: 'Best value',
      recommended: true,
      description: 'Use our software and updates as long as you subscribe.',
      price: '$400',
      pricePeriod: '/year',
      features: [
        { label: 'Latest version', color: 'green' },
        { label: 'Premium Support', color: 'green' },
      ],
      cart: {
        licenseType: 'Annual License',
        productName: 'Product1',
        seatPrice: 400,
        subscription: 'Premium Support',
        subscriptionNote: '50.00 USD yearly',
        total: 400,
        totalPeriod: '/year'
      }
    },
    {
      id: 'lifetime-license',
      title: 'Lifetime',
      tagline: 'Permanent license',
      description: 'Use the software forever with a one-time purchase.',
      price: '$850',
      pricePeriod: 'one-time',
      features: [
        { label: 'Lifetime access to current version', color: 'purple' },
        { label: 'First year included, then $350/yearly:', isHeader: true, color: 'purple' },
        { label: 'Premium support', indent: true, color: 'green' },
        { label: 'Latest version', indent: true, color: 'green' },
      ],
      cart: {
        licenseType: 'Perpetual License',
        productName: 'Product1',
        seatPrice: 850,
        subscription: 'Premium Support',
        subscriptionNote: 'First year included, then 350.00 USD yearly',
        total: 850,
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
                      <li key={i} className={`v2-feature-row ${f.isHeader ? 'v2-feature-header' : ''} ${f.indent ? 'v2-feature-indent' : ''}`} style={f.isHeader ? {marginTop: '12px', fontWeight: 'bold', color: '#3b2d5c'} : {}}>
                        {!f.isHeader && !f.isDot && (
                          <svg className="v2-feature-icon" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                        {f.isDot && (
                          <span className="v2-feature-dot">•</span>
                        )}
                        <span className="v2-feature-label">{f.label}</span>
                      </li>
                    ))}
                  </ul>

                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
