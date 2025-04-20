const { useState } = React;
const { Provider, useSelector, useDispatch } = ReactRedux;
const { createStore } = Redux;

// Начальное состояние
const initialState = {
  products: [
    {
      id: 1,
      name: "Смарт-часы SuperWatch",
      price: 9999,
      discountPrice: 7990,
      stock: 25,
      weight: 0.15, // кг
      image: "https://via.placeholder.com/200x200?text=SuperWatch",
      description: "Водонепроницаемые спортивные часы с Android 4.42...",
      isNew: true,
      discount: 20
    },
    {
      id: 2,
      name: "Смарт-часы AirBlade",
      price: 11990,
      discountPrice: 10999,
      stock: 11,
      weight: 0.18, // кг
      image: "https://via.placeholder.com/200x200?text=AirBlade",
      description: "Смарт-часы с функцией телефона! Солидный дизайн...",
      isNew: false,
      discount: 8
    }
  ],
  cart: [],
  order: {
    currentPage: 1,
    deliveryMethod: 'courier',
    deliveryAddress: '',
    paymentMethod: 'card'
  }
};

// Редуктор
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, { ...action.product, quantity: 1, inOrder: true }]
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.productId)
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item => 
          item.id === action.productId 
            ? { ...item, quantity: action.quantity } 
            : item
        )
      };
    case 'TOGGLE_IN_ORDER':
      return {
        ...state,
        cart: state.cart.map(item => 
          item.id === action.productId 
            ? { ...item, inOrder: !item.inOrder } 
            : item
        )
      };
    case 'SET_DELIVERY_METHOD':
      return {
        ...state,
        order: { ...state.order, deliveryMethod: action.method }
      };
    case 'SET_DELIVERY_ADDRESS':
      return {
        ...state,
        order: { ...state.order, deliveryAddress: action.address }
      };
    case 'SET_PAYMENT_METHOD':
      return {
        ...state,
        order: { ...state.order, paymentMethod: action.method }
      };
    case 'SET_ORDER_PAGE':
      return {
        ...state,
        order: { ...state.order, currentPage: action.page }
      };
    default:
      return state;
  }
}

// Создаем хранилище Redux
const store = createStore(reducer);

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

// Компонент Catalog с массой товара
const Catalog = ({ products, addToCart }) => {
  return (
    <div className="catalog">
      {products.map(product => (
        <div key={product.id} className={`product-card ${product.isNew ? 'new' : ''}`}>
          {product.isNew && <span className="new-badge">Новинка</span>}
          <img src={product.image} alt={product.name} className="product-image" />
          <h3 className="product-title">{product.name}</h3>
          <div className="product-weight">Вес: {product.weight} кг</div>
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
          <button 
            onClick={() => addToCart(product)}
            className="add-to-cart-btn"
          >
            В корзину
          </button>
        </div>
      ))}
    </div>
  );
};

// Компонент OrderForm (многостраничная форма)
const OrderForm = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const order = useSelector(state => state.order);
  
  const [quantityErrors, setQuantityErrors] = useState({});

  const handleQuantityChange = (productId, newQuantity) => {
    const product = cart.find(item => item.id === productId);
    
    if (newQuantity < 1) {
      setQuantityErrors({ ...quantityErrors, [productId]: "Количество должно быть не менее 1" });
      return;
    }
    
    if (newQuantity > product.stock) {
      setQuantityErrors({ ...quantityErrors, [productId]: "Недостаточно товара на складе" });
      return;
    }
    
    setQuantityErrors({ ...quantityErrors, [productId]: "" });
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity: parseInt(newQuantity) });
  };

  const handleToggleInOrder = (productId) => {
    dispatch({ type: 'TOGGLE_IN_ORDER', productId });
  };

  const handleRemoveItem = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  };

  const calculateTotal = () => {
    return cart
      .filter(item => item.inOrder)
      .reduce((sum, item) => sum + (item.discountPrice || item.price) * item.quantity, 0);
  };

  const calculateDeliveryCost = () => {
    const total = calculateTotal();
    
    switch (order.deliveryMethod) {
      case 'courier':
        return total < 200 ? 10 : 0;
      case 'post':
        const totalWeight = cart
          .filter(item => item.inOrder)
          .reduce((sum, item) => sum + item.weight * item.quantity, 0);
        return totalWeight * 5;
      case 'pickup':
        return 0;
      default:
        return 0;
    }
  };

  const nextPage = () => {
    dispatch({ type: 'SET_ORDER_PAGE', page: order.currentPage + 1 });
  };

  const prevPage = () => {
    dispatch({ type: 'SET_ORDER_PAGE', page: order.currentPage - 1 });
  };

  return (
    <div className="order-form">
      {/* Страница 1: Корзина */}
      <div className={`order-page ${order.currentPage === 1 ? 'active' : ''}`}>
        <h2>Корзина</h2>
        {cart.length === 0 ? (
          <p>Ваша корзина пуста</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <input
                  type="checkbox"
                  className="cart-item-checkbox"
                  checked={item.inOrder}
                  onChange={() => handleToggleInOrder(item.id)}
                />
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <div>Вес: {item.weight} кг</div>
                  {quantityErrors[item.id] && (
                    <div style={{ color: 'red' }}>{quantityErrors[item.id]}</div>
                  )}
                </div>
                <input
                  type="number"
                  className="cart-item-quantity"
                  value={item.quantity}
                  min="1"
                  max={item.stock}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                />
                <div>{(item.discountPrice || item.price) * item.quantity} руб</div>
                <button 
                  className="remove-item-btn"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Удалить
                </button>
              </div>
            ))}
            
            <div className="navigation-buttons">
              <button className="nav-btn prev-btn" disabled>Назад</button>
              <button className="nav-btn next-btn" onClick={nextPage}>Далее</button>
            </div>
          </>
        )}
      </div>

      {/* Страница 2: Доставка и оплата */}
      <div className={`order-page ${order.currentPage === 2 ? 'active' : ''}`}>
        <h2>Доставка и оплата</h2>
        
        <h3>Способ доставки</h3>
        <div className="delivery-option">
          <input
            type="radio"
            id="courier"
            name="delivery"
            value="courier"
            checked={order.deliveryMethod === 'courier'}
            onChange={() => dispatch({ type: 'SET_DELIVERY_METHOD', method: 'courier' })}
          />
          <label htmlFor="courier">Курьером ({calculateTotal() < 200 ? '10 руб' : 'бесплатно'})</label>
        </div>
        
        <div className="delivery-option">
          <input
            type="radio"
            id="post"
            name="delivery"
            value="post"
            checked={order.deliveryMethod === 'post'}
            onChange={() => dispatch({ type: 'SET_DELIVERY_METHOD', method: 'post' })}
          />
          <label htmlFor="post">Почтой (5 руб/кг)</label>
        </div>
        
        <div className="delivery-option">
          <input
            type="radio"
            id="pickup"
            name="delivery"
            value="pickup"
            checked={order.deliveryMethod === 'pickup'}
            onChange={() => dispatch({ type: 'SET_DELIVERY_METHOD', method: 'pickup' })}
          />
          <label htmlFor="pickup">Самовывоз (бесплатно)</label>
        </div>
        
        {order.deliveryMethod !== 'pickup' && (
          <div>
            <h3>Адрес доставки</h3>
            <input
              type="text"
              className="delivery-address"
              value={order.deliveryAddress}
              onChange={(e) => dispatch({ type: 'SET_DELIVERY_ADDRESS', address: e.target.value })}
              placeholder="Введите адрес доставки"
              required
            />
          </div>
        )}
        
        <h3>Способ оплаты</h3>
        <div className="payment-option">
          <input
            type="radio"
            id="cash"
            name="payment"
            value="cash"
            checked={order.paymentMethod === 'cash'}
            onChange={() => dispatch({ type: 'SET_PAYMENT_METHOD', method: 'cash' })}
          />
          <label htmlFor="cash">Наличными</label>
        </div>
        
        <div className="payment-option">
          <input
            type="radio"
            id="card"
            name="payment"
            value="card"
            checked={order.paymentMethod === 'card'}
            onChange={() => dispatch({ type: 'SET_PAYMENT_METHOD', method: 'card' })}
          />
          <label htmlFor="card">Банковской картой</label>
        </div>
        
        <div className="payment-option">
          <input
            type="radio"
            id="transfer"
            name="payment"
            value="transfer"
            checked={order.paymentMethod === 'transfer'}
            onChange={() => dispatch({ type: 'SET_PAYMENT_METHOD', method: 'transfer' })}
          />
          <label htmlFor="transfer">Банковским переводом</label>
        </div>
        
        <div className="order-summary">
          <h3>Итого</h3>
          <p>Товары: {calculateTotal()} руб</p>
          <p>Доставка: {calculateDeliveryCost()} руб</p>
          <p><strong>Всего: {calculateTotal() + calculateDeliveryCost()} руб</strong></p>
        </div>
        
        <div className="navigation-buttons">
          <button className="nav-btn prev-btn" onClick={prevPage}>Назад</button>
          <button className="nav-btn next-btn">Оформить заказ</button>
        </div>
      </div>
    </div>
  );
};

// Главный компонент приложения
const App = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const cart = useSelector(state => state.cart);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', product });
  };

  return (
    <div className="app">
      <h1>Каталог товаров</h1>
      
      <button 
        onClick={() => setShowOrderForm(!showOrderForm)}
        className="cart-toggle-btn"
      >
        {showOrderForm ? 'Вернуться в каталог' : `Корзина (${cart.length})`}
      </button>
      
      {showOrderForm ? (
        <OrderForm />
      ) : (
        <Catalog products={products} addToCart={addToCart} />
      )}
    </div>
  );
};

// Оборачиваем приложение в Provider
const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);