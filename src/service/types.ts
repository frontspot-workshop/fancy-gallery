export type Image = {
  id: string;
  alt_description: string;
  color: string;
  height: number,
  width: number,
  likes: number,
  urls: {
    small: string;
    thumb: string;
    regular: string;
    full: string;
  };
};
