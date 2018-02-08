exports.dump = (obj) => JSON.stringify(obj, null, 2);

exports.adminMenu = [
  { slug: '/admin', title: 'Admin' },
  { slug: '/admin/new-post', title: 'New Post' },
  { slug: '/admin/login', title: 'Login' },
  { slug: '/admin/logout', title: 'Logout' },
  { slug: '/admin/register', title: 'Register' },
  { slug: '/', title: 'Blog Home' }
];
exports.frontMenu = [
  { slug: '/', title: 'Home' },
  { slug: '/admin', title: 'Admin' },
  { slug: '/admin/login', title: 'Admin Login' }
];
