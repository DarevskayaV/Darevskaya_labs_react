// Данные для меню
const professionData = {
    developer: {
      title: "Разработчик ПО",
      links: [
        { name: "Stack Overflow", url: "https://stackoverflow.com", desc: "Вопросы и ответы для программистов" },
        { name: "GitHub", url: "https://github.com", desc: "Хостинг кода и совместная разработка" },
        { name: "MDN Web Docs", url: "https://developer.mozilla.org", desc: "Документация по веб-технологиям" },
        { name: "LeetCode", url: "https://leetcode.com", desc: "Практика алгоритмов и задач" },
        { name: "Dev.to", url: "https://dev.to", desc: "Сообщество разработчиков" },
        { name: "CSS-Tricks", url: "https://css-tricks.com", desc: "Советы и трюки по CSS" },
        { name: "Codepen", url: "https://codepen.io", desc: "Песочница для фронтенд-разработки" }
      ]
    },
    designer: {
      title: "Дизайнер",
      links: [
        { name: "Behance", url: "https://www.behance.net", desc: "Портфолио дизайнеров" },
        { name: "Dribbble", url: "https://dribbble.com", desc: "Дизайн-сообщество" },
        { name: "Figma", url: "https://www.figma.com", desc: "Инструмент для дизайна" },
        { name: "Adobe Color", url: "https://color.adobe.com", desc: "Подбор цветовых схем" },
        { name: "UI Movement", url: "https://uimovement.com", desc: "Лучшие UI-анимации" },
        { name: "Awwwards", url: "https://www.awwwards.com", desc: "Лучшие веб-сайты" },
        { name: "Canva", url: "https://www.canva.com", desc: "Графический дизайн для всех" }
      ]
    },
    marketer: {
      title: "Маркетолог",
      links: [
        { name: "Google Trends", url: "https://trends.google.com", desc: "Анализ поисковых трендов" },
        { name: "HubSpot", url: "https://www.hubspot.com", desc: "Инструменты для маркетинга" },
        { name: "Moz", url: "https://moz.com", desc: "SEO инструменты и обучение" },
        { name: "SEMrush", url: "https://www.semrush.com", desc: "Анализ конкурентов" },
        { name: "Buffer", url: "https://buffer.com", desc: "Управление соцсетями" },
        { name: "Mailchimp", url: "https://mailchimp.com", desc: "Email-маркетинг" },
        { name: "Ahrefs", url: "https://ahrefs.com", desc: "SEO и анализ ссылок" }
      ]
    },
    teacher: {
      title: "Преподаватель",
      links: [
        { name: "Edutopia", url: "https://www.edutopia.org", desc: "Ресурсы для педагогов" },
        { name: "Khan Academy", url: "https://www.khanacademy.org", desc: "Бесплатное обучение" },
        { name: "Coursera", url: "https://www.coursera.org", desc: "Онлайн-курсы" },
        { name: "Quizlet", url: "https://quizlet.com", desc: "Инструменты для обучения" },
        { name: "Google for Education", url: "https://edu.google.com", desc: "Ресурсы от Google" },
        { name: "TED-Ed", url: "https://ed.ted.com", desc: "Образовательные видео" },
        { name: "National Geographic Education", url: "https://www.nationalgeographic.org/education", desc: "Ресурсы по географии и науке" }
      ]
    },
    doctor: {
      title: "Врач",
      links: [
        { name: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov", desc: "Медицинские публикации" },
        { name: "UpToDate", url: "https://www.uptodate.com", desc: "Медицинская информация" },
        { name: "Medscape", url: "https://www.medscape.com", desc: "Ресурс для врачей" },
        { name: "WHO", url: "https://www.who.int", desc: "Всемирная организация здравоохранения" },
        { name: "CDC", url: "https://www.cdc.gov", desc: "Центры по контролю заболеваний" },
        { name: "Mayo Clinic", url: "https://www.mayoclinic.org", desc: "Медицинская информация" },
        { name: "WebMD", url: "https://www.webmd.com", desc: "Ресурс о здоровье" }
      ]
    }
  };
  
  // Компонент для выбора профессии
  function ProfessionSelector({ selectedProfession, onSelect }) {
    const professions = Object.keys(professionData);
    
    return (
      <div className="profession-selector">
        <h2>Выберите вашу профессию:</h2>
        <div className="profession-options">
          {professions.map(profession => (
            <div
              key={profession}
              className={`profession-option ${selectedProfession === profession ? 'selected' : ''}`}
              onClick={() => onSelect(profession)}
            >
              {professionData[profession].title}
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Компонент меню для профессии
  function JobMenu({ profession }) {
    if (!profession) return <div>Пожалуйста, выберите профессию</div>;
    
    const { title, links } = professionData[profession];
    
    return (
      <div className="job-menu">
        <div className="menu-header">Полезные ресурсы для {title}</div>
        <ul className="menu-links">
          {links.map((link, index) => (
            <li key={index} className="menu-link">
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.name}
                <div className="menu-description">{link.desc}</div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  // Основной компонент приложения
  function App() {
    const [selectedProfession, setSelectedProfession] = React.useState(null);
    
    return (
      <div className="app-container">
        <h1>Профессиональное меню ресурсов</h1>
        <ProfessionSelector 
          selectedProfession={selectedProfession}
          onSelect={setSelectedProfession}
        />
        <JobMenu profession={selectedProfession} />
      </div>
    );
  }
  
  // Рендеринг приложения
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);