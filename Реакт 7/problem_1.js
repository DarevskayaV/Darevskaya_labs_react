const { useState } = React;

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    avatar: '',
    email: '',
    message: '',
    secretWord: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [currentComment, setCurrentComment] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [secretInput, setSecretInput] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.message || !formData.secretWord) {
      setError('Please fill all required fields');
      return;
    }

    if (editingId !== null) {
      // Редактирование существующего комментария
      setComments(comments.map(comment => 
        comment.id === editingId ? { ...formData, id: editingId, date: new Date().toISOString() } : comment
      ));
      setEditingId(null);
    } else {
      // Добавление нового комментария
      const newComment = {
        ...formData,
        id: Date.now(),
        date: new Date().toISOString()
      };
      setComments([...comments, newComment]);
    }

    // Очистка формы
    setFormData({
      username: '',
      avatar: '',
      email: '',
      message: '',
      secretWord: ''
    });
    setError('');
  };

  const handleEdit = (comment) => {
    setFormData({
      username: comment.username,
      avatar: comment.avatar,
      email: comment.email,
      message: comment.message,
      secretWord: comment.secretWord
    });
    setEditingId(comment.id);
  };

  const handleDeleteClick = (comment) => {
    setCurrentComment(comment);
    setDeleteModal(true);
    setSecretInput('');
    setError('');
  };

  const confirmDelete = () => {
    if (secretInput === currentComment.secretWord) {
      setComments(comments.filter(comment => comment.id !== currentComment.id));
      setDeleteModal(false);
    } else {
      setError('Incorrect secret word');
    }
  };

  const showCommentInfo = (comment) => {
    setCurrentComment(comment);
    setShowInfoModal(true);
  };

  return (
    <div className="comments-app">
      <h1>Comments</h1>
      
      <form className="comment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username *</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="avatar">Avatar URL</label>
          <input
            type="url"
            id="avatar"
            name="avatar"
            value={formData.avatar}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="secretWord">Secret Word *</label>
          <input
            type="text"
            id="secretWord"
            name="secretWord"
            value={formData.secretWord}
            onChange={handleInputChange}
            required
          />
          <small>Remember this word to edit/delete your comment later</small>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" className="submit-btn">
          {editingId !== null ? 'Update Comment' : 'Add Comment'}
        </button>
      </form>
      
      <div className="comment-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              {comment.avatar && (
                <img src={comment.avatar} alt={comment.username} className="avatar" />
              )}
              <span className="username">{comment.username}</span>
            </div>
            
            <p>{comment.message}</p>
            
            <div className="comment-actions">
              <button 
                className="action-btn edit-btn" 
                onClick={() => handleEdit(comment)}
              >
                Edit
              </button>
              <button 
                className="action-btn delete-btn" 
                onClick={() => handleDeleteClick(comment)}
              >
                Delete
              </button>
              <button 
                className="action-btn info-btn" 
                onClick={() => showCommentInfo(comment)}
              >
                Info
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Модальное окно информации */}
      {showInfoModal && currentComment && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Comment Info</h2>
              <button className="close-btn" onClick={() => setShowInfoModal(false)}>×</button>
            </div>
            <p><strong>Username:</strong> {currentComment.username}</p>
            <p><strong>Email:</strong> {currentComment.email || 'Not specified'}</p>
            <p><strong>Posted:</strong> {new Date(currentComment.date).toLocaleString()}</p>
          </div>
        </div>
      )}
      
      {/* Модальное окно удаления */}
      {deleteModal && currentComment && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Delete Comment</h2>
              <button className="close-btn" onClick={() => setDeleteModal(false)}>×</button>
            </div>
            <p>Are you sure you want to delete this comment?</p>
            <p>Enter the secret word to confirm:</p>
            <input
              type="text"
              className="secret-input"
              value={secretInput}
              onChange={(e) => setSecretInput(e.target.value)}
              placeholder="Secret word"
            />
            {error && <div className="error-message">{error}</div>}
            <button 
              className="action-btn delete-btn" 
              onClick={confirmDelete}
            >
              Confirm Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Comments />);