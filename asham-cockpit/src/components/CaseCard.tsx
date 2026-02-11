import { Link } from 'react-router-dom';
import type { CaseDetail } from '../types/models';

interface CaseCardProps {
  item: CaseDetail;
  branchName?: string;
}

export const CaseCard = ({ item, branchName }: CaseCardProps) => {
  return (
    <article className="tile-card">
      <div className="tile-card-header">
        <h3>{item.fullName}</h3>
        <span className={`status-pill status-${item.status}`}>{item.status}</span>
      </div>
      <p className="muted">Fall-ID: {item.caseId}</p>
      {branchName ? <p className="muted">Filiale: {branchName}</p> : null}
      <p className="muted">Letzte Änderung: {new Date(item.lastUpdateAt).toLocaleString('de-DE')}</p>
      <Link className="luci-button" to={`/fall/${item.caseId}`}>
        Fallakte öffnen
      </Link>
    </article>
  );
};
