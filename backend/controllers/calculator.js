const { response, request } = require('express');

const calculate = async (req , res = response) => {
  const { assets, liabilities } = req.body;

  const calcAssets =  assets.reduce((acc, asset) => acc + asset.value, 0)
  const calcLiabilities = liabilities.reduce((acc, asset) => acc + asset.value, 0)

  res.json({
    assetsAmount: calcAssets,
    liabilitiesAmount: calcLiabilities
  })

}

module.exports = {
  calculate,
}