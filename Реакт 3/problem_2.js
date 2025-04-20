const { useState } = React;

const ProductCatalog = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", price: 100, quantity: 5 },
    { id: 2, name: "Product 2", price: 200, quantity: 2 },
    { id: 3, name: "Product 3", price: 150, quantity: 0 },
    { id: 4, name: "Product 4", price: 50, quantity: 10 },
  ]);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);
  const totalPrice = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

  const getRowClass = (quantity) => {
    if (quantity === 0) return "out-of-stock";
    if (quantity < 3) return "low-stock";
    return "";
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort("id")}>#</th>
            <th onClick={() => requestSort("name")}>Name</th>
            <th onClick={() => requestSort("price")}>Price</th>
            <th onClick={() => requestSort("quantity")}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product, index) => (
            <tr key={product.id} className={getRowClass(product.quantity)}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="summary">
        <p>Total Quantity: {totalQuantity}</p>
        <p>Total Price: {totalPrice}</p>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ProductCatalog />);