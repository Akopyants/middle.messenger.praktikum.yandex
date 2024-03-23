import Handlebars from 'handlebars';
import './chat-page.scss';
export { default as ChatPage } from './chat-page.hbs?raw';
import { chatsData } from './data';

Handlebars.registerHelper('chat-page-list', () => {
  return chatsData
});
