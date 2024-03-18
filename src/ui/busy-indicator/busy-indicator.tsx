export const ChatBusyIndicator = ({ text = 'Typing'}) => {
  return (
    <div className="typing-busy-indicator">
      <span className="typing-text">{text}</span>
      <span className="dot-1">.</span>
      <span className="dot-2">.</span>
      <span className="dot-3">.</span>
    </div>
  );
};