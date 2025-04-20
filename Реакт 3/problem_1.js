// Компонент формы email
function EmailForm() {
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [isError, setIsError] = React.useState(false);
  
    // Функция валидации email
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };
  
    // Обработчик отправки формы
    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (!email) {
        setMessage('Пожалуйста, введите email');
        setIsError(true);
        return;
      }
      
      if (!validateEmail(email)) {
        setMessage('Пожалуйста, введите корректный email');
        setIsError(true);
        return;
      }
      
      setMessage(`Форма успешно отправлена на адрес: ${email}`);
      setIsError(false);
      setEmail('');
    };
  
    return (
      <div className="email-form-container">
        <h1>Форма обратной связи</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите ваш email"
            />
          </div>
          <button type="submit">Отправить</button>
        </form>
        
        {message && (
          <div className={`message ${isError ? 'error' : 'success'}`}>
            {message}
          </div>
        )}
      </div>
    );
  }
  
  // Рендеринг приложения
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<EmailForm />);