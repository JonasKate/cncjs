import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiClient } from '../api/ApiClient';
import type { Branch, BrandProfile, MeResponse } from '../types/models';

interface BrandContextValue {
  me: MeResponse | null;
  brand: BrandProfile | null;
  branches: Branch[];
  selectedBranchId?: string;
  setSelectedBranchId: (branchId?: string) => void;
  isLoading: boolean;
  reload: () => Promise<void>;
}

const BrandContext = createContext<BrandContextValue | null>(null);

export const BrandProvider = ({ children }: { children: React.ReactNode }) => {
  const [me, setMe] = useState<MeResponse | null>(null);
  const [brand, setBrand] = useState<BrandProfile | null>(null);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const load = async () => {
    setIsLoading(true);
    const meResponse = await apiClient.getMe();
    const brandResponse = await apiClient.getBrand();
    setMe(meResponse);
    setBrand(brandResponse);

    if (meResponse.plan === 'enterprise') {
      const branchResponse = await apiClient.getBranches();
      setBranches(branchResponse);
      setSelectedBranchId((prev) => prev ?? meResponse.defaultBranchId ?? branchResponse[0]?.branchId);
    } else {
      setBranches([]);
      setSelectedBranchId(undefined);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  useEffect(() => {
    if (brand?.primaryColor) {
      document.documentElement.style.setProperty('--brand-primary', brand.primaryColor);
    }
  }, [brand]);

  const value = useMemo(
    () => ({ me, brand, branches, selectedBranchId, setSelectedBranchId, isLoading, reload: load }),
    [me, brand, branches, selectedBranchId, isLoading]
  );

  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>;
};

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand muss innerhalb von BrandProvider verwendet werden');
  }
  return context;
};
