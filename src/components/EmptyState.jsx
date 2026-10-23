function EmptyState({ icon, title, children, actionLabel, onAction }) {
  return (
    <div className="card empty-cart">
      <div className="empty-icon">{icon}</div>
      <h2>{title}</h2>
      <p>{children}</p>
      <button type="button" className="btn btn-primary" onClick={onAction}>
        {actionLabel}
      </button>
    </div>
  )
}

export default EmptyState
