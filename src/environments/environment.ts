/* eslint-disable @typescript-eslint/naming-convention */
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.



export const environment = {
  origin: 'http://hvtekshop.com/wp',
  wcEndpoint: '/wp-json/wc/v2',
  wpEndpoint: '/wp-json/wp/v2',
  jwtEndpoint: '/simple-jwt-login/v1',
  woocommerce: {
    consumer_key:  'ck_af6b6351feae0d2f8ec1947ef792713cc1a4aefb',
    consumer_secret: 'cs_b10649c0cad55bef7b930d65c162d4ffc69f3f59'
  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
