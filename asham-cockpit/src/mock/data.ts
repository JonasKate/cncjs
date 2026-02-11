import type {
  Asset,
  Branch,
  BrandProfile,
  CaseDetail,
  CaseModule,
  CaseStatus,
  ExportJobStatus,
  MeResponse,
  TimelineEvent
} from '../types/models';

export const mockMe: MeResponse = {
  tenantId: 'tenant-meyer',
  plan: 'enterprise',
  brandId: 'brand-asham',
  defaultBranchId: 'br-berlin'
};

export const mockBrand: BrandProfile = {
  displayName: 'Bestattungshaus Meyer & Partner',
  primaryColor: '#6C7764',
  impressumUrl: 'https://example.org/impressum',
  datenschutzUrl: 'https://example.org/datenschutz',
  contactEmail: 'kontakt@meyer-bestattung.de',
  phone: '+49 30 123 456 78'
};

export const mockBranches: Branch[] = [
  {
    branchId: 'br-berlin',
    name: 'Filiale Berlin-Mitte',
    address: 'Musterstraße 12, 10115 Berlin',
    phone: '+49 30 111 222',
    email: 'berlin@meyer-bestattung.de'
  },
  {
    branchId: 'br-potsdam',
    name: 'Filiale Potsdam',
    address: 'Lindenweg 3, 14467 Potsdam',
    phone: '+49 331 999 111',
    email: 'potsdam@meyer-bestattung.de'
  }
];

export const mockCases: CaseDetail[] = [
  {
    caseId: 'C-2026-001',
    fullName: 'Maria Hoffmann',
    status: 'neu',
    branchId: 'br-berlin',
    lastUpdateAt: '2026-02-10T11:30:00.000Z',
    moduleKeys: ['profil', 'bestattung', 'trauerfeier', 'familie', 'dokumente']
  },
  {
    caseId: 'C-2026-002',
    fullName: 'Karl Brenner',
    status: 'aktiv',
    branchId: 'br-potsdam',
    lastUpdateAt: '2026-02-09T08:10:00.000Z',
    moduleKeys: ['profil', 'bestattung', 'glaube', 'familie', 'dokumente']
  },
  {
    caseId: 'C-2025-114',
    fullName: 'Helene Schuster',
    status: 'archiv',
    branchId: 'br-berlin',
    lastUpdateAt: '2025-12-01T10:00:00.000Z',
    moduleKeys: ['profil', 'bestattung', 'trauerfeier', 'familie', 'dokumente']
  }
];

const modulePayloads: Record<string, Record<string, Record<string, unknown>>> = {
  'C-2026-001': {
    profil: { Vorname: 'Maria', Nachname: 'Hoffmann', Geburtsdatum: '1940-04-14' },
    bestattung: { Art: 'Urnenbeisetzung', Friedhof: 'Waldfriedhof Berlin', Termin: '2026-02-19 11:00' },
    trauerfeier: { Ort: 'Trauerhalle Mitte', Musik: 'Air on G String', Redner: 'Pfarrer Schulte' },
    familie: { Ansprechpartner: 'Claudia Hoffmann', Telefon: '+49 171 123456' },
    dokumente: { Sterbeurkunde: 'vorhanden', Vollmacht: 'eingereicht' }
  },
  'C-2026-002': {
    profil: { Vorname: 'Karl', Nachname: 'Brenner', Geburtsdatum: '1957-08-03' },
    bestattung: { Art: 'Erdbestattung', Friedhof: 'Neuer Friedhof Potsdam', Termin: '2026-02-20 13:30' },
    glaube: { Konfession: 'evangelisch', Rituale: 'Abendgebet gewünscht' },
    familie: { Ansprechpartner: 'Maja Brenner', Telefon: '+49 172 776655' },
    dokumente: { Sterbeurkunde: 'in Prüfung', Versicherungsunterlagen: 'offen' }
  },
  'C-2025-114': {
    profil: { Vorname: 'Helene', Nachname: 'Schuster', Geburtsdatum: '1933-02-09' },
    bestattung: { Art: 'Urnenbeisetzung', Friedhof: 'Südwestkirchhof', Termin: '2025-11-24 10:15' },
    trauerfeier: { Ort: 'Kapelle Süd', Musik: 'Ave Maria', Redner: 'Freier Redner Krause' },
    familie: { Ansprechpartner: 'Thomas Schuster', Telefon: '+49 176 908070' },
    dokumente: { Abschlussbericht: 'fertig', Rechnung: 'versendet' }
  }
};

export const getMockModule = (caseId: string, moduleKey: string): CaseModule => {
  const payload = modulePayloads[caseId]?.[moduleKey] ?? { Hinweis: 'Keine Daten verfügbar' };
  return {
    moduleKey,
    revision: 1,
    payload,
    updatedAt: new Date().toISOString()
  };
};

export const mockAssets: Record<string, Asset[]> = {
  'C-2026-001': [
    {
      assetId: 'A-100',
      fileName: 'portrait_maria.jpg',
      type: 'portrait',
      mimeType: 'image/jpeg',
      size: 521111,
      createdAt: '2026-02-10T09:00:00.000Z',
      url: 'https://picsum.photos/seed/maria/400/300',
      canDelete: true
    }
  ],
  'C-2026-002': [
    {
      assetId: 'A-200',
      fileName: 'scan_auftrag.pdf',
      type: 'scan',
      mimeType: 'application/pdf',
      size: 200312,
      createdAt: '2026-02-09T07:00:00.000Z',
      url: 'https://example.org/documents/scan_auftrag.pdf',
      canDelete: false
    }
  ],
  'C-2025-114': []
};

export const mockTimeline: Record<string, TimelineEvent[]> = {
  'C-2026-001': [
    { eventId: 't1', title: 'Fall angelegt', date: '2026-02-10T08:00:00.000Z', detail: 'Auftrag telefonisch erfasst.' },
    { eventId: 't2', title: 'Dokumente ergänzt', date: '2026-02-10T10:45:00.000Z', detail: 'Sterbeurkunde hochgeladen.' }
  ],
  'C-2026-002': [
    { eventId: 't3', title: 'Trauergespräch', date: '2026-02-09T12:30:00.000Z', detail: 'Ablauf der Feier abgestimmt.' }
  ],
  'C-2025-114': [
    { eventId: 't4', title: 'Fall abgeschlossen', date: '2025-12-01T10:00:00.000Z', detail: 'Exportpaket erstellt und versendet.' }
  ]
};

export const filterCases = (status: CaseStatus, query: string, branchId?: string): CaseDetail[] => {
  const q = query.trim().toLowerCase();
  return mockCases.filter((item) => {
    const matchesStatus = item.status === status;
    const matchesBranch = branchId ? item.branchId === branchId : true;
    const matchesQuery = q.length === 0 || item.fullName.toLowerCase().includes(q) || item.caseId.toLowerCase().includes(q);
    return matchesStatus && matchesBranch && matchesQuery;
  });
};

const exportJobs = new Map<string, ExportJobStatus>();

export const createMockExport = (caseId: string) => {
  const jobId = `EXP-${caseId}-${Date.now()}`;
  exportJobs.set(jobId, { status: 'processing' });
  setTimeout(() => {
    exportJobs.set(jobId, {
      status: 'done',
      downloadUrl: `https://example.org/exports/${jobId}.zip`
    });
  }, 1000);
  return { jobId };
};

export const getMockExport = (jobId: string): ExportJobStatus => {
  return exportJobs.get(jobId) ?? { status: 'pending' };
};
