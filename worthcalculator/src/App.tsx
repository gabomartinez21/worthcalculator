import { useState, useEffect } from 'react';
import axios from 'axios';
import data from './data.json';
import {formatCount} from './helpers';
import { Item } from './components/Item';

function App() {
  const [saveData, setSaveData] = useState(data)
  const [totalAssets, setTotalAssets] = useState(0)
  const [totalLiabilities, setTotalLiabilities] = useState(0)
  const [currency, setCurrency] = useState('USD')

  useEffect(() => {
    const getAmounts = async () => {
      console.log(saveData)
      const {data} = await axios.post('http://localhost:5000/calculate', saveData)
      setTotalAssets(data.assetsAmount)
      setTotalLiabilities(data.liabilitiesAmount)
    }
    getAmounts()
  }, [saveData])

  return (
    <div className="container">
      <h1>Tracking your Networth</h1>
      <div className="box-calculator">
        <div className="selector">
          <select 
            className="select-currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="CAD">CAD</option>
            <option value="PEN">PEN</option>
          </select>
        </div>
        <div className="row-info">
          <div className="col">
            <p>Net Worth</p>
          </div>
          <div className="col">
            <p>{formatCount(totalAssets - totalLiabilities, currency)}</p>
          </div>
        </div>

        <Item 
          currency={currency} 
          items={data.assets}
          total={totalAssets}
          title="Assets"
          subtitles={['Cash and Investments', 'Long Term Assets']}
        />
        <Item 
          currency={currency} 
          items={data.liabilities}
          total={totalLiabilities}
          title="Liabilities"
          subtitles={['Short Term Liabilities', 'Long Term Debt']}
        />


      </div>
    </div>
  )
}

export default App
