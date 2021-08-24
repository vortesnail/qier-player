import { Trans } from './trans';

export const featureItems = (locale: 'en-US' | 'zh-CN') => [
  {
    id: 0,
    url: '/img/customizable.svg',
    title: Trans[locale].customizable.title,
    des: Trans[locale].customizable.des,
  },
  {
    id: 1,
    url: '/img/responsive.svg',
    title: Trans[locale].responsive.title,
    des: Trans[locale].responsive.des,
  },
  {
    id: 2,
    url: '/img/features.svg',
    title: Trans[locale].features.title,
    des: Trans[locale].features.des,
  },
];
