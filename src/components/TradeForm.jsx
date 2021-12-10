import React from 'react'

const TradeForm = () => {
  return (
    //uid to pass trades to firestore
    <div>
      <form>
        <input type="number" />
        <button>Buy</button>
        <button>Sell</button>
      </form>
    </div>
  )
}

export default TradeForm
