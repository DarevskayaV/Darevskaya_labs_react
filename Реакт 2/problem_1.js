class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        time: new Date()
      };
      
      // Поддерживаемые часовые пояса
      this.timeZones = {
        '+0:00': 0, '+1:00': 1, '+2:00': 2, '+3:00': 3, '+4:00': 4,
        '+5:00': 5, '+6:00': 6, '+7:00': 7, '+8:00': 8, '+9:00': 9,
        '+10:00': 10, '+11:00': 11, '+12:00': 12,
        '-1:00': -1, '-2:00': -2, '-3:00': -3, '-4:00': -4, '-5:00': -5,
        '-6:00': -6, '-7:00': -7, '-8:00': -8, '-9:00': -9, '-10:00': -10,
        '-11:00': -11, '-12:00': -12
      };
    }
  
    componentDidMount() {
      this.timerID = setInterval(() => this.tick(), 1000);
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({ time: new Date() });
    }
  
    formatTime() {
      const { format = '24', timezone } = this.props;
      let hours = this.state.time.getUTCHours();
      const minutes = this.state.time.getUTCMinutes();
      const seconds = this.state.time.getUTCSeconds();
  
      // Применяем часовой пояс
      if (timezone && this.timeZones[timezone] !== undefined) {
        hours += this.timeZones[timezone];
        if (hours >= 24) hours -= 24;
        if (hours < 0) hours += 24;
      }
  
      // Форматирование времени
      if (format === '12') {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours || 12; // 0 становится 12
        return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)} ${ampm}`;
      }
      
      return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
    }
  
    padZero(num) {
      return num < 10 ? `0${num}` : num;
    }
  
    render() {
      return (
        <div className="clock-container">
          <h2 className="clock-title">Настраиваемые часы</h2>
          <div className="clock-display">{this.formatTime()}</div>
          <div className="clock-info">Формат: {this.props.format || '24'}-часовой</div>
          {this.props.timezone && 
            <div className="clock-info">Часовой пояс: UTC{this.props.timezone}</div>}
        </div>
      );
    }
  }
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <div>
      <Clock />
      <Clock format="24" timezone="+3:00" />
      <Clock format="12" timezone="-4:00" />
    </div>
  );