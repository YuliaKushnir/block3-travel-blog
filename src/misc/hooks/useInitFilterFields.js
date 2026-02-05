// import { useEffect } from "react";
// import storage, { keys } from "misc/storage";

export const useInitFilters = () => {
  // useEffect(() => {
  //   const storedPosts = storage.getItem(keys.POSTS);
  //   if (storedPosts) {
  //     const posts = JSON.parse(storedPosts);

  //     const countries = [...new Set(posts.map(p => p.country).filter(Boolean))];
  //     storage.setItem(keys.COUNTRIES, JSON.stringify(countries));

  //     const categories = [...new Set(posts.flatMap(p => p.categories || []))];
  //     storage.setItem(keys.CATEGORIES, JSON.stringify(categories));
  //   }
  // }, []);
};