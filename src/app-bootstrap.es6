/* app-bootstrap.es6 */
/**
 * @author Sean Wood (WoodyWoodsta)
 */

import './resources/babel-external-helpers';

import debug from 'debug';
debug.enable('rsvp*');

const log = debug('rsvp-client:bootstrap');

// // Setup Polymer options
// window.Polymer = { lazyRegister: true, dom: 'shadow' };
//
// // NOTE: CustomEvent is polyfilled in webcomponents-lite.js for IE 9/10/11
// // are web components supported
// const webComponentsSupported = ('registerElement' in document
//   && 'import' in document.createElement('link')
//   && 'content' in document.createElement('template'));
// // make this global
// window.webComponentsSupported = webComponentsSupported;
// log(`Webcomponents are${webComponentsSupported ? ' ' : ' not '}supported`);
//
// // if not then we need polyfills
// if (!webComponentsSupported) {
//   const script = document.createElement('script');
//   script.async = false;
//   // if (process.env.NODE_ENV === PRODUCTION) {
//     // script.src = 'bower_components/webcomponentsjs/webcomponents-lite.min.js';
//   // } else {
//   script.src = 'bower_components/webcomponentsjs/webcomponents-lite.js';
//   // }
//   document.head.appendChild(script);
// }
