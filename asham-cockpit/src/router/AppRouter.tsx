import { Navigate, Route, Routes } from 'react-router-dom';
import { CockpitLayout } from '../components/CockpitLayout';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { CaseDetailPage } from '../pages/CaseDetailPage';
import { CasesPage } from '../pages/CasesPage';
import { LoginPage } from '../pages/LoginPage';
import { SettingsPage } from '../pages/SettingsPage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <CockpitLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/inbox" replace />} />
        <Route path="inbox" element={<CasesPage status="neu" title="Inbox · Neue Fälle" />} />
        <Route path="aktiv" element={<CasesPage status="aktiv" title="Aktive Fälle" />} />
        <Route path="archiv" element={<CasesPage status="archiv" title="Archiv" />} />
        <Route path="fall/:caseId" element={<CaseDetailPage />} />
        <Route path="einstellungen" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
