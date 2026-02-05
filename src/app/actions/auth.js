import config from 'config';

export async function login() {
    window.location.href = `${config.BLOG_GATEWAY}/oauth2/authorization/google`;
}

// export async function logout() {
//   await api.post('/auth/logout');
//   window.location.reload();
// }
