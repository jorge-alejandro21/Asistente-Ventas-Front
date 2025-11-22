import './StatCard.css'

function StatCard({ title, value, icon, gradient, trend, description }) {
  return (
    <div className="stat-card">
      <div className="stat-card-background" style={{ background: gradient }}></div>
      <div className="stat-card-content">
        <div className="stat-card-header">
          <div className="stat-card-icon-wrapper">
            <div className="stat-card-icon">{icon}</div>
          </div>
          {trend && (
            <span className="stat-card-trend positive">
              <span className="trend-arrow">↑</span>
              {trend}
            </span>
          )}
        </div>
        <div className="stat-card-body">
          <h3 className="stat-card-title">{title}</h3>
          <p className="stat-card-value">{value}</p>
          {description && (
            <p className="stat-card-description">{description}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default StatCard

