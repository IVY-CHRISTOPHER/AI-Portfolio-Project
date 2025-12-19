function TopBar({ isAdmin, onAdminToggle }) {
  return (
    <div className="top-bar">
      {isAdmin && <span className="admin-pill">Admin mode</span>}
      <button className="btn ghost admin-btn" type="button" onClick={onAdminToggle}>
        {isAdmin ? 'Log out' : 'Admin Login'}
      </button>
    </div>
  )
}

export default TopBar
