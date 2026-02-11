import { RefreshCw, UploadCloud } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiClient } from '../api/ApiClient';
import { AccordionSection } from '../components/AccordionSection';
import { AssetsSection } from '../components/AssetsSection';
import { TimelineSection } from '../components/TimelineSection';
import { useBrand } from '../providers/BrandProvider';
import type { Asset, CaseDetail, CaseModule, ExportJobStatus, TimelineEvent } from '../types/models';

export const CaseDetailPage = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const { branches } = useBrand();
  const [detail, setDetail] = useState<CaseDetail | null>(null);
  const [modules, setModules] = useState<CaseModule[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [exportStatus, setExportStatus] = useState<ExportJobStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadAll = async () => {
    if (!caseId) {
      return;
    }
    setIsLoading(true);
    const loadedDetail = await apiClient.getCase(caseId);
    const loadedModules = await Promise.all(loadedDetail.moduleKeys.map((key) => apiClient.getModule(caseId, key)));
    const [loadedAssets, loadedTimeline] = await Promise.all([apiClient.getAssets(caseId), apiClient.getTimeline(caseId)]);
    setDetail(loadedDetail);
    setModules(loadedModules);
    setAssets(loadedAssets);
    setTimeline(loadedTimeline);
    setIsLoading(false);
  };

  const synchronize = async () => {
    if (!caseId) {
      return;
    }
    await apiClient.syncCase(caseId);
    await loadAll();
  };

  const startExport = async () => {
    if (!caseId) {
      return;
    }
    const { jobId } = await apiClient.startExport(caseId);
    const status = await apiClient.getExportStatus(jobId);
    setExportStatus(status);
    if (status.status !== 'done') {
      setTimeout(async () => {
        const next = await apiClient.getExportStatus(jobId);
        setExportStatus(next);
      }, 1500);
    }
  };

  const deleteAsset = async (assetId: string) => {
    if (!caseId) {
      return;
    }
    await apiClient.deleteAsset(caseId, assetId);
    const nextAssets = await apiClient.getAssets(caseId);
    setAssets(nextAssets);
  };

  useEffect(() => {
    void loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseId]);

  if (isLoading || !detail) {
    return <p className="muted">Fallakte wird geladen…</p>;
  }

  const branchName = branches.find((branch) => branch.branchId === detail.branchId)?.name;

  return (
    <section className="detail-layout">
      <header className="kachel detail-header">
        <h2>{detail.fullName}</h2>
        <p>CaseId: {detail.caseId}</p>
        <p>Status: {detail.status}</p>
        {branchName ? <p>Filiale: {branchName}</p> : null}
        <p>Letzte Änderung: {new Date(detail.lastUpdateAt).toLocaleString('de-DE')}</p>

        <div className="detail-actions">
          <button className="luci-button" onClick={() => void loadAll()}>
            <RefreshCw size={16} /> Neu laden
          </button>
          <button className="luci-button" onClick={() => void synchronize()}>
            <UploadCloud size={16} /> Jetzt synchronisieren
          </button>
          <button className="luci-button" onClick={() => void startExport()}>
            Export anstoßen
          </button>
        </div>

        {exportStatus ? (
          <p className="muted">
            Export-Status: <strong>{exportStatus.status}</strong>
            {exportStatus.downloadUrl ? (
              <>
                {' '}
                – <a href={exportStatus.downloadUrl}>Download bereit</a>
              </>
            ) : null}
          </p>
        ) : null}
      </header>

      <div className="detail-grid">
        <div>
          {modules.map((module) => (
            <AccordionSection key={module.moduleKey} module={module} />
          ))}
        </div>
        <div>
          <AssetsSection assets={assets} onDelete={deleteAsset} />
          <TimelineSection events={timeline} />
        </div>
      </div>
    </section>
  );
};
