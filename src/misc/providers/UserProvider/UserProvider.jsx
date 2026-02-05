import React, { createContext, useEffect, useState } from 'react';
// import { api } from 'misc/requests';
// import { useSelector } from 'react-redux';

export const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   api.get('/api/profile')
  //     .then(res => setUser(res.data))
  //     .catch(() => setUser(null));
  // }, []);

  return (
    <UserContext.Provider value={ user } >
      {children}
    </UserContext.Provider>
  );
};
// const UserProvider = ({ children }) => {
//   const user = useSelector(({ user }) => user);
//   return (
//     <UserContext.Provider
//       value={{
//         email: user.email,
//         firstName: user.firstName,
//         id: user.id,
//         lastName: user.lastName,
//         login: user.login,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

export default UserProvider;
