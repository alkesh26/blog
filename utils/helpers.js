import { BLOGS_PER_PAGE } from './constants';

export const sortByDate = (posts) => {
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const pageCount = (count) => {
  return Math.round(count / BLOGS_PER_PAGE);
};
