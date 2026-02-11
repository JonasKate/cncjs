import { useBrand } from '../providers/BrandProvider';

export const SettingsPage = () => {
  const { me, brand, branches, selectedBranchId, setSelectedBranchId } = useBrand();

  return (
    <section className="grid-auto-kacheln">
      <article className="kachel">
        <h2>Branding (Read-Only)</h2>
        <p><strong>Name:</strong> {brand?.displayName}</p>
        <p><strong>Primärfarbe:</strong> {brand?.primaryColor}</p>
        <p><strong>E-Mail:</strong> {brand?.contactEmail}</p>
        <p><strong>Telefon:</strong> {brand?.phone}</p>
        {brand?.impressumUrl ? (
          <p>
            <a href={brand.impressumUrl} target="_blank" rel="noreferrer">
              Impressum öffnen
            </a>
          </p>
        ) : null}
        {brand?.datenschutzUrl ? (
          <p>
            <a href={brand.datenschutzUrl} target="_blank" rel="noreferrer">
              Datenschutz öffnen
            </a>
          </p>
        ) : null}
        <a className="luci-button" href="mailto:support@asham.example?subject=Branding%20%C3%84nderung%20anfragen">
          Änderung anfragen
        </a>
      </article>

      <article className="kachel">
        <h2>Konto</h2>
        <p><strong>Tenant:</strong> {me?.tenantId}</p>
        <p><strong>Tarif:</strong> {me?.plan}</p>
        <p><strong>Brand-ID:</strong> {me?.brandId}</p>
      </article>

      {me?.plan === 'enterprise' ? (
        <article className="kachel">
          <h2>Filiale auswählen</h2>
          <select value={selectedBranchId ?? ''} onChange={(event) => setSelectedBranchId(event.target.value)}>
            {branches.map((branch) => (
              <option key={branch.branchId} value={branch.branchId}>
                {branch.name}
              </option>
            ))}
          </select>
          {branches
            .filter((branch) => branch.branchId === selectedBranchId)
            .map((branch) => (
              <div key={branch.branchId} className="branch-box">
                <p>{branch.address}</p>
                <p>{branch.phone}</p>
                <p>{branch.email}</p>
              </div>
            ))}
        </article>
      ) : null}
    </section>
  );
};
