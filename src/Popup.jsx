import './Popup.css'; // For styling the popup

export function Popup({ content, handleClose }) {
  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={handleClose}>X</button>
        {content}
      </div>
    </div>
  );
}