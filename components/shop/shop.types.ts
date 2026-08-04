export type ShopSearchParams = {
  category?: string;
  color?: string;
  sort?: string;
  availability?: string;
  page?: string;
};

export type ShopPageProps = {
  searchParams: Promise<ShopSearchParams>;
};