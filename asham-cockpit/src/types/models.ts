export type PlanType = 'basic' | 'pro' | 'enterprise';
export type CaseStatus = 'neu' | 'aktiv' | 'archiv';

export interface LoginResponse {
  token: string;
  refreshToken?: string;
}

export interface MeResponse {
  tenantId: string;
  plan: PlanType;
  brandId: string;
  defaultBranchId?: string;
}

export interface BrandProfile {
  displayName: string;
  logoUrl?: string;
  primaryColor: string;
  impressumUrl?: string;
  datenschutzUrl?: string;
  contactEmail?: string;
  phone?: string;
}

export interface Branch {
  branchId: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
}

export interface CaseSummary {
  caseId: string;
  fullName: string;
  status: CaseStatus;
  branchId?: string;
  lastUpdateAt: string;
}

export interface CaseDetail extends CaseSummary {
  moduleKeys: string[];
}

export interface CaseModule {
  moduleKey: string;
  revision: number;
  payload: Record<string, unknown>;
  updatedAt: string;
}

export interface Asset {
  assetId: string;
  fileName: string;
  type: 'portrait' | 'scan' | 'foto' | 'video';
  mimeType: string;
  size: number;
  createdAt: string;
  url: string;
  canDelete: boolean;
}

export interface ExportJobResponse {
  jobId: string;
}

export interface ExportJobStatus {
  status: 'pending' | 'processing' | 'done' | 'failed';
  downloadUrl?: string;
}

export interface TimelineEvent {
  eventId: string;
  title: string;
  date: string;
  detail: string;
}
