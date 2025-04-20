const { useState } = React;

const productsData = [
  {
    id: 1,
    name: "Смарт-часы SuperWatch",
    price: 9999,
    discountPrice: 7990,
    stock: 25,
    image: "https://via.placeholder.com/200x200?text=SuperWatch",
    description: "Водонепроницаемые спортивные часы с Android 4.42 на борту, который поддерживает большинство популярных приложений. Мощный MTK6572 двухъядерный процессор, с высокой скоростью подключения к интернет. Смартфон, MP3 плеер, камера, медиаплеера, GPS, акселерометр, шагомер, пульсометр – все в одном!",
    isNew: true,
    discount: 20
  },
  {
    id: 2,
    name: "Смарт-часы AirBlade",
    price: 11990,
    discountPrice: 10999,
    stock: 11,
    image: "https://via.placeholder.com/200x200?text=AirBlade",
    description: "Смарт-часы с функцией телефона! Солидный дизайн. 2 Гб оперативной памяти и мощный процессор позволит вам запускать несколько приложений одновременно – браузер, пульсометр, таймер и, конечно, часы. Совместимы с Android и iOS.",
    isNew: false,
    discount: 8
  }
];

const SortTable = ({ products, sortConfig, requestSort }) => {
  return (
    <table className="sort-table">
      <thead>
        <tr>
          <th onClick={() => requestSort('name')}>
            Наименование {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </th>
          <th onClick={() => requestSort('price')}>
            Стоимость {sortConfig.key === 'price' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </th>
          <th onClick={() => requestSort('stock')}>
            Количество {sortConfig.key === 'stock' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </th>
          <th>Изображение</th>
          <th>Описание</th>
          <th onClick={() => requestSort('isNew')}>
            Новинка {sortConfig.key === 'isNew' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </th>
          <th onClick={() => requestSort('discount')}>
            Скидка {sortConfig.key === 'discount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>
              {product.discount > 0 ? (
                <>
                  <span className="original-price">{product.price} руб</span>
                  <span className="discount">{product.discountPrice} руб</span>
                </>
              ) : (
                <span>{product.price} руб</span>
              )}
            </td>
            <td>{product.stock} шт.</td>
            <td><img src={product.image} alt={product.name} className="thumbnail" /></td>
            <td>{product.description.substring(0, 100)}...</td>
            <td>{product.isNew ? <span className="new-badge">Да</span> : 'Нет'}</td>
            <td>{product.discount > 0 ? <span className="discount">{product.discount}%</span> : '0%'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Catalog = ({ products }) => {
  return (
    <div className="catalog">
      {products.map((product) => (
        <div key={product.id} className={`product-card ${product.isNew ? 'new' : ''}`}>
          {product.isNew && <span className="new-badge">Новинка</span>}
          <img src={product.image} alt={product.name} className="product-image" />
          <h3 className="product-title">{product.name}</h3>
          <div className="product-price">
            {product.discount > 0 ? (
              <>
                <span className="original-price">{product.price} руб</span>
                <span className="discount-price">{product.discountPrice} руб</span>
                <span className="discount-badge">-{product.discount}%</span>
              </>
            ) : (
              <span>{product.price} руб</span>
            )}
          </div>
          <div className="product-stock">В наличии: {product.stock} шт.</div>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [products, setProducts] = useState(productsData);
  const [sortConfig, setSortConfig] = useState({ key: 'isNew', direction: 'desc' });
  const [viewMode, setViewMode] = useState('catalog');

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = [...products].sort((a, b) => {
    // Новинки всегда первые
    if (sortConfig.key === 'isNew') {
      if (a.isNew === b.isNew) return 0;
      if (sortConfig.direction === 'desc') {
        return a.isNew ? -1 : 1;
      } else {
        return a.isNew ? 1 : -1;
      }
    }

    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="app">
      <h1>Каталог товаров</h1>
      
      <div className="sort-controls">
        <span>Сортировать по:</span>
        <select 
          value={sortConfig.key} 
          onChange={(e) => requestSort(e.target.value)}
        >
          <option value="name">Названию</option>
          <option value="price">Цене</option>
          <option value="stock">Количеству</option>
          <option value="discount">Скидке</option>
          <option value="isNew">Новинкам</option>
        </select>
        <button onClick={() => requestSort(sortConfig.key)}>
          {sortConfig.direction === 'asc' ? 'По возрастанию' : 'По убыванию'}
        </button>
      </div>

      <div className="view-toggle">
        <button 
          className={viewMode === 'catalog' ? 'active' : ''}
          onClick={() => setViewMode('catalog')}
        >
          Каталог
        </button>
        <button 
          className={viewMode === 'table' ? 'active' : ''}
          onClick={() => setViewMode('table')}
        >
          Таблица
        </button>
      </div>

      {viewMode === 'table' ? (
        <SortTable 
          products={sortedProducts} 
          sortConfig={sortConfig} 
          requestSort={requestSort} 
        />
      ) : (
        <Catalog products={sortedProducts} />
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);