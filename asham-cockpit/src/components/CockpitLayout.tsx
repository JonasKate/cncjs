import { Archive, Inbox, PlayCircle, Settings, RefreshCw } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { BrandBadge } from './BrandBadge';
import { useBrand } from '../providers/BrandProvider';

const navItems = [
  { to: '/inbox', label: 'Inbox', icon: Inbox },
  { to: '/aktiv', label: 'Aktiv', icon: PlayCircle },
  { to: '/archiv', label: 'Archiv', icon: Archive },
  { to: '/einstellungen', label: 'Einstellungen', icon: Settings }
];

export const CockpitLayout = () => {
  const { logout } = useAuth();
  const { brand, reload, isLoading } = useBrand();

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-brand">
          <BrandBadge />
          <div>
            <h1>{brand?.displayName ?? 'ASHAM Cockpit'}</h1>
            <p>Cockpit für Fallakten und Module</p>
          </div>
        </div>
        <div className="topbar-actions">
          <button className="luci-button" onClick={() => void reload()} disabled={isLoading}>
            <RefreshCw size={16} />
            Neu laden
          </button>
          <button className="luci-button luci-button-ghost" onClick={() => void logout()}>
            Abmelden
          </button>
        </div>
      </header>

      <nav className="tab-nav" aria-label="Cockpit Navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `tab-link ${isActive ? 'active' : ''}`}
          >
            <item.icon className="tile-icon-large" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
};
