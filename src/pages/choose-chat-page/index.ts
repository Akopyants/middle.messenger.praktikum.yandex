import Handlebars from 'handlebars';
import './choose-chat-page.scss';
export { default as chooseChatPage } from './choose-chat-page.hbs?raw';
import { chatsData } from './data';

Handlebars.registerHelper('chat-page-list', () => {
  return chatsData
});
