# generic
## Modules
Comments, Images, Ratings, Referrals


## routes
``` javascript

  {
    path: '/referrals',
    name: 'referrals',
    component: resolve => require(['component/increment/generic/referral/Referrals.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  },
  {
    path: '/images',
    name: 'images',
    component: resolve => require(['components/increment/generic/image/Images.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  },
```