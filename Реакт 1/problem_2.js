const stockData = [
  {
    stock_name: "EFX",
    company_name: "Equifax Inc",
    price: 163.55,
    currency: "USD",
    change: "+9.03"
  }, 
  {
    stock_name: "IRM",
    company_name: "Iron Mountain Inc",
    price: 33.21,
    currency: "USD",
    change: "+1.42"
  }, 
  {
    stock_name: "NTAP",
    company_name: "NetApp Inc",
    price: 54.81,
    currency: "USD",
    change: "-6.01"
  }, 
  {
    stock_name: "CTL",
    company_name: "Centurylink Inc",
    price: 13.79,
    currency: "USD",
    change: "-1.37"
  }
];

function StockRow({ stock }) {
  const isPositive = stock.change.startsWith('+');
  const changeClass = isPositive ? 'positive' : 'negative';
  
  return (
    <tr>
      <td>{stock.stock_name}</td>
      <td>{stock.company_name}</td>
      <td>{stock.price.toFixed(2)} {stock.currency}</td>
      <td className={changeClass}>{stock.change}</td>
    </tr>
  );
}

function StockTable() {
  return (
    <div className="container">
      <h1 className="header">Stock Market Overview</h1>
      <table className="stock-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Company</th>
            <th>Price</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((stock, index) => (
            <StockRow key={`${stock.stock_name}-${index}`} stock={stock} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

ReactDOM.render(
  <StockTable />,
  document.getElementById('root')
);