import React, {Children} from 'react'
import { formatCount } from '../helpers'

interface Item {
  name: string;
  type: string;
  value: number;
  monthly?: number;
}

interface PropItem {
  currency: string;
  items: Item[];
  total: number;
  title: string;
  subtitles: string[]
}

export const Item = ({currency, items, total, title, subtitles}:PropItem) => {
  return (
    <div className="assets">
      <div className="row-info">
        <div className="col">
          <p>{title}</p>
        </div>
      </div>
      {subtitles.map(subtitle => (
        <>
          {items[0]?.monthly ? (
            <div className="row-extension subtitle">
              <div className="col">
                <p>{subtitle}</p>
              </div>
              <div className="col">
                <p>Monthly</p>
              </div>
            </div>
          ) : (
            <div className="row-info subtitle">
              <div className="col">
                <p>{subtitle}</p>
              </div>
            </div>
          )}
          {Children.toArray(items.map(item => (
            <>
              {item.type === subtitle && (
                <>
                {item?.monthly ? (
                  <div className="row-extension">
                    <div className="col">
                      <p>{item.name}</p>
                    </div>
                    <div className="col">
                      <p>{formatCount(item.monthly, currency)}</p>
                    </div>
                    <div className="col">
                      <p>{formatCount(item.value, currency)}</p>
                    </div>
                  </div>
                ): (
                  <div className="row-info">
                    <div className="col">
                      <p>{item.name}</p>
                    </div>
                    <div className="col">
                      <p>{formatCount(item.value, currency)}</p>
                    </div>
                  </div>
                )}
                </>
              )}
            </>
          )))}
        </>
      ))}

      <div className="row-info total">
        <div className="col">
          <p>Total {title}</p>
        </div>
        <div className="col">
          <p>{formatCount(total, currency)}</p>
        </div>
      </div>
    </div>
  )
}
