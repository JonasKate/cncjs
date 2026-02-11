import { Download, Eye, Trash2 } from 'lucide-react';
import type { Asset } from '../types/models';

interface AssetsSectionProps {
  assets: Asset[];
  onDelete: (assetId: string) => Promise<void>;
}

export const AssetsSection = ({ assets, onDelete }: AssetsSectionProps) => {
  if (assets.length === 0) {
    return (
      <section className="kachel">
        <h3>Assets</h3>
        <p className="muted">Keine Assets vorhanden.</p>
      </section>
    );
  }

  return (
    <section className="kachel">
      <h3>Assets</h3>
      <div className="asset-grid">
        {assets.map((asset) => (
          <article key={asset.assetId} className="asset-card">
            {asset.mimeType.startsWith('image/') ? <img src={asset.url} alt={asset.fileName} className="asset-preview" /> : null}
            <h4>{asset.fileName}</h4>
            <p className="muted">Typ: {asset.type}</p>
            <p className="muted">Größe: {(asset.size / 1024).toFixed(1)} KB</p>
            <div className="asset-actions">
              <a className="luci-button luci-button-ghost" href={asset.url} target="_blank" rel="noreferrer">
                <Eye size={16} /> Öffnen
              </a>
              <a className="luci-button luci-button-ghost" href={asset.url} download>
                <Download size={16} /> Download
              </a>
              {asset.canDelete ? (
                <button className="luci-button luci-button-danger" onClick={() => void onDelete(asset.assetId)}>
                  <Trash2 size={16} /> Löschen
                </button>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
