import { Search, RefreshCw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { apiClient } from '../api/ApiClient';
import { CaseCard } from '../components/CaseCard';
import { useBrand } from '../providers/BrandProvider';
import type { CaseDetail, CaseStatus } from '../types/models';

interface CasesPageProps {
  status: CaseStatus;
  title: string;
}

export const CasesPage = ({ status, title }: CasesPageProps) => {
  const { me, branches, selectedBranchId, setSelectedBranchId } = useBrand();
  const [query, setQuery] = useState('');
  const [cases, setCases] = useState<CaseDetail[]>([]);
  const [loading, setLoading] = useState(false);

  const loadCases = async () => {
    setLoading(true);
    const items = await apiClient.getCases(status, query, me?.plan === 'enterprise' ? selectedBranchId : undefined);
    setCases(items);
    setLoading(false);
  };

  useEffect(() => {
    void loadCases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, selectedBranchId]);

  const branchMap = useMemo(() => new Map(branches.map((branch) => [branch.branchId, branch.name])), [branches]);

  return (
    <section>
      <header className="section-header">
        <h2>{title}</h2>
        <div className="toolbar">
          <div className="input-icon">
            <Search size={16} />
            <input
              placeholder="Suche nach Name oder CaseId"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          {me?.plan === 'enterprise' ? (
            <select value={selectedBranchId ?? ''} onChange={(event) => setSelectedBranchId(event.target.value || undefined)}>
              {branches.map((branch) => (
                <option key={branch.branchId} value={branch.branchId}>
                  {branch.name}
                </option>
              ))}
            </select>
          ) : null}

          <button className="luci-button" onClick={() => void loadCases()}>
            <RefreshCw size={16} /> Neu laden
          </button>
        </div>
      </header>

      {loading ? <p className="muted">Fälle werden geladen…</p> : null}

      <div className="grid-auto-kacheln">
        {cases.map((item) => (
          <CaseCard key={item.caseId} item={item} branchName={item.branchId ? branchMap.get(item.branchId) : undefined} />
        ))}
      </div>

      {!loading && cases.length === 0 ? <p className="muted">Keine Fälle für diese Ansicht vorhanden.</p> : null}
    </section>
  );
};
