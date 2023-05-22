export const formatCount = (count:Number, currency: string = "USD") =>{
  let conversion = count;
  if(currency === 'CAD') {
    conversion = Number(conversion) / 0.74;
  } else if(currency === 'PEN'){
    conversion = Number(conversion) / 0.27;
  }
  return Number(conversion).toLocaleString('en-US', {
    style:'currency',
    currency
  })
}