export const normalizeImageUrl = (image) => {
  return typeof image === 'string' ? image : image?.url;
};
