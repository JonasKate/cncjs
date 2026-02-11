import {
  createMockExport,
  filterCases,
  getMockExport,
  getMockModule,
  mockAssets,
  mockBrand,
  mockBranches,
  mockCases,
  mockMe,
  mockTimeline
} from '../mock/data';
import type {
  Asset,
  Branch,
  BrandProfile,
  CaseDetail,
  CaseModule,
  CaseStatus,
  ExportJobResponse,
  ExportJobStatus,
  LoginResponse,
  MeResponse,
  TimelineEvent
} from '../types/models';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const useMock = !apiBaseUrl;

class ApiClient {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    if (useMock) {
      return { token: `mock-token-${email}-${password.length}` };
    }
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  }

  async logout(): Promise<void> {
    if (useMock) {
      return;
    }
    await this.request('/auth/logout', { method: 'POST' });
  }

  async getMe(): Promise<MeResponse> {
    if (useMock) {
      return mockMe;
    }
    return this.request('/me');
  }

  async getBrand(): Promise<BrandProfile> {
    if (useMock) {
      return mockBrand;
    }
    return this.request('/brand');
  }

  async getBranches(): Promise<Branch[]> {
    if (useMock) {
      return mockBranches;
    }
    return this.request('/branches');
  }

  async getCases(status: CaseStatus, q = '', branchId?: string): Promise<CaseDetail[]> {
    if (useMock) {
      return filterCases(status, q, branchId);
    }
    const params = new URLSearchParams({ status, q });
    if (branchId) {
      params.set('branchId', branchId);
    }
    return this.request(`/cases?${params.toString()}`);
  }

  async getCase(caseId: string): Promise<CaseDetail> {
    if (useMock) {
      const found = mockCases.find((item) => item.caseId === caseId);
      if (!found) {
        throw new Error('Fall nicht gefunden');
      }
      return found;
    }
    return this.request(`/cases/${caseId}`);
  }

  async getModule(caseId: string, moduleKey: string): Promise<CaseModule> {
    if (useMock) {
      return getMockModule(caseId, moduleKey);
    }
    return this.request(`/cases/${caseId}/modules/${moduleKey}`);
  }

  async updateModule(caseId: string, moduleKey: string, payload: Record<string, unknown>): Promise<void> {
    if (useMock) {
      return;
    }
    await this.request(`/cases/${caseId}/modules/${moduleKey}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  }

  async getAssets(caseId: string): Promise<Asset[]> {
    if (useMock) {
      return mockAssets[caseId] ?? [];
    }
    return this.request(`/cases/${caseId}/assets`);
  }

  async deleteAsset(caseId: string, assetId: string): Promise<void> {
    if (useMock) {
      const assets = mockAssets[caseId] ?? [];
      const next = assets.filter((asset) => asset.assetId !== assetId);
      mockAssets[caseId] = next;
      return;
    }
    await this.request(`/cases/${caseId}/assets/${assetId}`, { method: 'DELETE' });
  }

  async startExport(caseId: string): Promise<ExportJobResponse> {
    if (useMock) {
      return createMockExport(caseId);
    }
    return this.request(`/cases/${caseId}/export`, { method: 'POST' });
  }

  async getExportStatus(jobId: string): Promise<ExportJobStatus> {
    if (useMock) {
      return getMockExport(jobId);
    }
    return this.request(`/exports/${jobId}`);
  }

  async syncCase(caseId: string): Promise<CaseDetail> {
    if (useMock) {
      return this.getCase(caseId);
    }
    try {
      await this.request(`/cases/${caseId}/sync`, { method: 'POST' });
    } catch {
      return this.getCase(caseId);
    }
    return this.getCase(caseId);
  }

  async getTimeline(caseId: string): Promise<TimelineEvent[]> {
    if (useMock) {
      return mockTimeline[caseId] ?? [];
    }
    return this.request(`/cases/${caseId}/timeline`);
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    if (!apiBaseUrl) {
      throw new Error('API Basis URL fehlt');
    }
    const headers = new Headers(init?.headers);
    headers.set('Content-Type', 'application/json');
    if (this.token) {
      headers.set('Authorization', `Bearer ${this.token}`);
    }

    const response = await fetch(`${apiBaseUrl}${path}`, { ...init, headers });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || `API Fehler ${response.status}`);
    }

    if (response.status === 204) {
      return undefined as T;
    }
    return response.json() as Promise<T>;
  }
}

export const apiClient = new ApiClient();
export const isMockMode = useMock;
