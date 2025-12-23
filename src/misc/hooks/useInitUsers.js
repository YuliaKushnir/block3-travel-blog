import { useEffect } from "react";
import storage, { keys } from "misc/storage";

const MOCK_USERS = [
    {
        id: 1, 
        name: "Marusia",
        email: "marusia@example.com",
        password: "12345678",
        posts: []
    },
    {
        id: 2, 
        name: "Natalochka",
        email: "natalochka@example.com",
        password: "12345678",
        posts: []
    },
    {
        id: 3, 
        name: "Alex",
        email: "alex@example.com",
        password: "12345678",
        posts: []
    },
    {
        id: 4, 
        name: "Адмінич",
        email: "adminMail@gmail.com",
        password: "admin",
        posts: []
    },
]


export const useInitUsers = () => {
  useEffect(() => {
    const stored = storage.getItem(keys.USERS);
    if (!stored || stored === "[]") {
      storage.setItem(keys.USERS, JSON.stringify(MOCK_USERS));
    }
    //storage.setItem(keys.USERS, JSON.stringify(MOCK_USERS));

  }, []);
};