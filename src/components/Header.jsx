export default function Header({ onToggleTheme }) {
  return (
    <header>
      <div className="container">
        <div className="header-block">
          <div className="ellipse-btn-block">
            <button
              type="button"
              className="btn-darkTheme"
              id="btn-switch-theme"
              onClick={onToggleTheme}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
