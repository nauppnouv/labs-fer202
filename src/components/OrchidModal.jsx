import { useEffect } from "react";
import "./OrchidModal.css";

function OrchidModal({ orchid, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const renderStars = (rate) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`modal-star ${i < rate ? "filled" : ""}`}>★</span>
    ));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-image">
          <img src={orchid.image} alt={orchid.name} />
        </div>
        <div className="modal-info">
          <h2 className="modal-name">{orchid.name}</h2>
          <p className="modal-category">{orchid.category}</p>
          <div className="modal-tags">
            {orchid.isSpecial && <span className="tag tag-special">✦ Special</span>}
            {orchid.isNatural && <span className="tag tag-natural">🌿 Natural</span>}
          </div>
          <div className="modal-details">
            <div className="modal-detail-item">
              <span className="label">Origin</span>
              <span className="value">📍 {orchid.origin}</span>
            </div>
            <div className="modal-detail-item">
              <span className="label">Color</span>
              <span className="value" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span className="color-swatch" style={{ backgroundColor: orchid.color }}></span>
                {orchid.color}
              </span>
            </div>
            <div className="modal-detail-item">
              <span className="label">Rating</span>
              <span className="value">{renderStars(orchid.rating)}</span>
            </div>
            <div className="modal-detail-item">
              <span className="label">Likes</span>
              <span className="value">❤️ {orchid.numberOfLike}</span>
            </div>
          </div>
          {orchid.description && (
            <p className="modal-description">{orchid.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrchidModal;
