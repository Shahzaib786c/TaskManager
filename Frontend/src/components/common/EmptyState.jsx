import "./EmptyState.css";

export default function EmptyState({ message }) {
  return (
    <div className="empty-state">
      <p className="empty-state-message">{message}</p>
    </div>
  );
}
