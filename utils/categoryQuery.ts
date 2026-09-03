interface CategoryMapping {
  slug: string;    
  queryValue: string;
}

const categoryOverrides: Record<string, CategoryMapping> = {
  'Coffee / Tea': { slug: 'coffee-tea', queryValue: 'Coffee_/_Tea' },
  'Other / Unknown': { slug: 'other-unknown', queryValue: 'Other_/_Unknown' },
  'Punch / Party Drink': { slug: 'punch-party-drink', queryValue: 'Punch_/_Party_Drink' },
};

export const toCategorySlug = (strCategory: string): string => {
  const override = categoryOverrides[strCategory];
  if (override) return override.slug;
  return strCategory.replace(/ /g, '_');
};

export const fromSlugToQueryValue = (slug: string): string => {
  const match = Object.values(categoryOverrides).find((o) => o.slug === slug);
  if (match) return match.queryValue;
  return slug.replace(/_/g, ' ');
};