import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from 'highsoft-ui'
import 'highsoft-ui/css'
import './ProductPicker.css'

const base = '/highsoft-shop-prototype'

const coreIcon = `${base}/picker-svg/core.svg`
const coreSelectedIcon = `${base}/picker-svg/core-selected.svg`

export const addonPrices = { stock: 185, maps: 65, gantt: 37, python: 109.8 }
export const corePrice = 185

export const moduleMeta = [
  {
    key: 'stock',
    name: 'Stock',
    icon: `${base}/picker-svg/stock.svg`,
    iconSelected: `${base}/picker-svg/stock-selected.svg`,
  },
  {
    key: 'maps',
    name: 'Maps',
    icon: `${base}/picker-svg/maps.svg`,
    iconSelected: `${base}/picker-svg/maps-selected.svg`,
  },
  {
    key: 'gantt',
    name: 'Gantt',
    icon: `${base}/picker-svg/gantt.svg`,
    iconSelected: `${base}/picker-svg/gantt-selected.svg`,
  },
  {
    key: 'python',
    name: 'Highcharts for Python',
    icon: `${base}/picker-svg/python.svg`,
    iconSelected: `${base}/picker-svg/python-selected.svg`,
  },
]

export const standaloneMeta = [
  {
    key: 'dashboard',
    name: 'Dashboard',
    icon: `${base}/picker-svg/dashboard.svg`,
    iconSelected: `${base}/picker-svg/dashboard-selected.svg`,
    originalPrice: 527,
    salePrice: 263,
    promo: 'Save 50% during the introductory period.',
  },
  {
    key: 'gridpro',
    name: 'Grid Pro',
    icon: `${base}/picker-svg/gridpro.svg`,
    iconSelected: `${base}/picker-svg/gridpro-selected.svg`,
    originalPrice: 264,
    salePrice: 264,
    promo: 'Save 50% during the introductory period.',
  },
]

export function getStandalonePrice(product, useDiscounts = true) {
  if (useDiscounts) return product.salePrice
  return product.originalPrice ?? product.salePrice
}

function SeatDropdown({ count, onSelect, triggerUnit = 'seat' }) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const close = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <div ref={wrapperRef} className="seat-dropdown">
      {count === 0 ? (
        <Button variant="success" size={200} onClick={() => setOpen((v) => !v)}>
          Add +
        </Button>
      ) : (
        <button className="seat-dropdown__trigger" onClick={() => setOpen((v) => !v)}>
          {count} {count === 1 ? triggerUnit : `${triggerUnit}s`}
          <svg viewBox="0 0 10 6" width="10" height="6" fill="none" aria-hidden="true">
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      {open && (
        <div className="seat-dropdown__menu">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              className={`seat-dropdown__option${count === n ? ' seat-dropdown__option--active' : ''}`}
              onClick={() => { onSelect(n); setOpen(false) }}
            >
              {n} {n === 1 ? 'seat' : 'seats'}
            </button>
          ))}
          <div className="seat-dropdown__divider" />
          <button
            className="seat-dropdown__option seat-dropdown__option--remove"
            onClick={() => { onSelect(0); setOpen(false) }}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  )
}

export default function ProductPicker({
  seats, addons, onSeatChange, onAddonToggle,
  standaloneItems = {}, onStandaloneChange,
  useStandaloneDiscounts = true,
}) {
  const hasSeats = seats > 0

  const activeModules = useMemo(
    () => moduleMeta.map((m) => ({ ...m, active: addons[m.key] })),
    [addons]
  )
  const libraryModules = useMemo(
    () => activeModules.filter((m) => m.key !== 'python'),
    [activeModules]
  )
  const integrationModule = useMemo(
    () => activeModules.find((m) => m.key === 'python') ?? null,
    [activeModules]
  )

  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0 })
  const tooltipRef = useRef(null)

  const handleTooltipMove = useCallback(
    (e) => {
      if (hasSeats) return
      setTooltip({ visible: true, x: e.clientX, y: e.clientY })
    },
    [hasSeats]
  )

  const handleTooltipLeave = useCallback(() => {
    setTooltip((prev) => ({ ...prev, visible: false }))
  }, [])

  const standaloneBeforeCoreKeys = ['dashboard', 'gridpro']
  const standaloneBeforeCore = standaloneBeforeCoreKeys
    .map((key) => standaloneMeta.find((product) => product.key === key))
    .filter(Boolean)
  const standaloneAfterCore = standaloneMeta.filter((product) => !standaloneBeforeCoreKeys.includes(product.key))

  const renderStandalone = (product) => {
    const count = standaloneItems[product.key] ?? 0
    const isActive = count > 0
    const price = getStandalonePrice(product, useStandaloneDiscounts)
    const showDiscount =
      useStandaloneDiscounts &&
      product.originalPrice != null &&
      product.originalPrice > price

    return (
      <section
        key={product.key}
        className={`picker-standalone${isActive ? ' picker-standalone--selected' : ''}`}
      >
        <div className="picker-standalone__body">
          <div className="picker-card__title-group">
            <span className="picker-avatar">
              <img src={isActive ? product.iconSelected : product.icon} alt="" width={32} height={32} />
            </span>
            <h1 className="picker-card__title">{product.name}</h1>
          </div>
          <div className="picker-header__pricing">
            <div className="picker-standalone__prices">
              {showDiscount && (
                <span className="picker-standalone__original">{product.originalPrice.toFixed(2)} USD</span>
              )}
              <span className="picker-price">{price.toFixed(2)} USD</span>
              <span className="picker-price-per">per seat</span>
            </div>
            <SeatDropdown count={count} onSelect={(n) => onStandaloneChange(product.key, n)} />
          </div>
        </div>
        {useStandaloneDiscounts && product.promo && (
          <div className="picker-standalone__promo">{product.promo}</div>
        )}
      </section>
    )
  }

  const renderAddonRow = (module, unit) => (
    <article
      key={module.key}
      className={`picker-addon-row${module.active ? ' picker-addon-row--active' : ''}${!hasSeats ? ' picker-addon-row--disabled' : ''}`}
    >
      <div className="picker-addon-main">
        <div className="picker-module__icon">
          <img src={module.active ? module.iconSelected : module.icon} alt="" width={32} height={32} />
        </div>
        <h2 className="picker-addon-name">{module.name}</h2>
      </div>

      <div className="picker-addon-right">
        <div className="picker-addon-price-wrap">
          <span className="picker-addon-price">{`+ ${addonPrices[module.key].toFixed(2)} USD`}</span>
          <span className="picker-addon-unit">{unit}</span>
        </div>
        <span
          onMouseMove={!hasSeats ? handleTooltipMove : undefined}
          onMouseLeave={!hasSeats ? handleTooltipLeave : undefined}
        >
          <button
            type="button"
            className={`picker-addon-btn${module.active ? ' picker-addon-btn--active' : ''}`}
            onClick={() => onAddonToggle(module.key)}
            disabled={!hasSeats}
          >
            {module.active ? 'Added' : 'Add'}
          </button>
        </span>
      </div>
    </article>
  )

  return (
    <>
      <div className="hc-picker">
        <div className="hc-picker__heading">
          <h2 className="hc-picker__title">Products</h2>
          <p className="hc-picker__subtitle">Select the products you want to include in your license.</p>
        </div>

        <div className="hc-picker__products">
          {standaloneBeforeCore.map((product) => renderStandalone(product))}

          {/* Core card */}
          <section className={`picker-card${hasSeats ? ' picker-card--selected' : ''}`}>
            <div className="picker-card__header">
              <div className="picker-card__title-group">
                <span className="picker-avatar">
                  <img src={hasSeats ? coreSelectedIcon : coreIcon} alt="" width={32} height={32} />
                </span>
                <h1 className="picker-card__title">Highcharts Core</h1>
              </div>
              <div className="picker-header__pricing">
                <div className="picker-price-block">
                  <div className="picker-price">{`${corePrice} USD`}</div>
                  <div className="picker-price-per">per seat</div>
                </div>
                <SeatDropdown count={seats} onSelect={onSeatChange} triggerUnit="Dev seat" />
              </div>
            </div>

            <div className="picker-core-addons-panel">
              <div className="picker-divider-row picker-divider-row--addons">
                <span className="picker-divider" />
                <span>Libraries</span>
                <span className="picker-divider" />
              </div>

              <div className="picker-addon-list">
                {libraryModules.map((module) => renderAddonRow(module, '/seat'))}
              </div>

              {integrationModule && (
                <>
                  <div className="picker-divider-row picker-divider-row--addons picker-divider-row--integration">
                    <span className="picker-divider" />
                    <span>Integration</span>
                    <span className="picker-divider" />
                  </div>
                  <div className="picker-addon-list">
                    {renderAddonRow(integrationModule, '/yearly')}
                  </div>
                </>
              )}
            </div>
          </section>

          {standaloneAfterCore.map((product) => renderStandalone(product))}
        </div>
      </div>

      {tooltip.visible && (
        <div
          ref={tooltipRef}
          className="picker-cursor-tooltip"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          Select Core first
        </div>
      )}
    </>
  )
}
