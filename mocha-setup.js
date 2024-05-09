import { JSDOM } from 'jsdom';

const dom = new JSDOM('<div id="app"></div>', { url: 'http://localhost:3000' });

global.window = dom.window;
global.document = window.document;
