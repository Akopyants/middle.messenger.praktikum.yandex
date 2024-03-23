import Handlebars from 'handlebars';
import './profile.scss';
export { default as Profile } from './profile.hbs?raw';
import { profileUserData } from './data';

Handlebars.registerHelper('profile-user-data', () => {
  return profileUserData;
});
