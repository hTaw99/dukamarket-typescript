export type TReview = {
  title: string;
  comment: string;
  createdAt: string;
  isRecommended: boolean;
  product: {
    _id: string;
    name: string;
    price: number;
  };
  rating: number;
  updatedAt: string;
  user: { _id: string; name: string };
  _id: string;
};
