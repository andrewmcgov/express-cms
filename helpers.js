exports.dump = obj => JSON.stringify(obj, null, 2);

exports.adminMenu = [
  { slug: '/admin', title: 'Admin' },
  { slug: '/admin/new-post', title: 'New Post' },
  { slug: '/', title: 'Blog Home' },
  { slug: '/admin/menus', title: 'Menus' }
];
exports.frontMenu = [
  { slug: '/', title: 'Home' },
  { slug: '/admin', title: 'Admin' },
  { slug: '/admin/login', title: 'Admin Login' }
];
