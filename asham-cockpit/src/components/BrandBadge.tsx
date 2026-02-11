import { useBrand } from '../providers/BrandProvider';

export const BrandBadge = () => {
  const { brand } = useBrand();
  const displayName = brand?.displayName ?? 'ASHAM';
  const initials = displayName
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  if (brand?.logoUrl) {
    return <img src={brand.logoUrl} alt={`Logo ${displayName}`} className="brand-logo" />;
  }

  return <div className="brand-initials">{initials}</div>;
};
