import { Children, SetStateAction, ChangeEvent, Dispatch } from 'react'
import { formatCount } from '../helpers'
import { ItemValue } from './ItemValue';
import { ItemInterface   } from '../helpers/interfaces';
interface PropItem {
  currency: string;
  items: ItemInterface[];
  total: number;
  title: string;
  subtitles: string[];
  saveData: {[key: string]: ItemInterface[]};
  setSaveData: Dispatch<SetStateAction<{[key: string]: ItemInterface[]}>>;
}

export const Item = ({currency, items, total, title, subtitles, setSaveData, saveData}:PropItem) => {

  const handleChange = (event:ChangeEvent<HTMLInputElement>, i:number) => {
    const objectKey = title.toLocaleLowerCase();
    const newData = saveData[objectKey].map((itemData: ItemInterface, index: number) => {
      if (index === i) {
        const newItemData = itemData;
        newItemData.value = Number(event.target.value)
        return newItemData;
      }

      return itemData;
    })
    setSaveData({
      ...saveData, 
      [objectKey]: newData
    })
  }
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
          {Children.toArray(items.map((item,i) => (
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
                    <ItemValue
                      index={i}
                      currency={currency}
                      value={item.value}
                      handleChange={handleChange}
                    />
                  </div>
                ): (
                  <div className="row-info">
                    <div className="col">
                      <p>{item.name}</p>
                    </div>
                    <ItemValue
                      index={i}
                      currency={currency}
                      value={item.value}
                      handleChange={handleChange}
                    />
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
