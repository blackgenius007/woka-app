 /* eslint-disable */

import SvgColor from 'src/components/svg-color';
 

// ----------------------------------------------------------------------
 
const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'human resources',
    path: '/employee',
    icon: icon('ic_user'),
  },
  {
    title: 'procurement',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'accounts',
    path: '/salary',
    icon: icon('ic_money'),
  },
  // {
  //   title: 'accounts',
  //   path: '/blog',
  //   icon: icon('ic_blog'),
  // },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
