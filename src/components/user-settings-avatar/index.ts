import Block from '../../utils/Block';
import template from './user-settings-avatar.hbs?raw';
import './user-settings-avatar.scss';

interface InterfaceUserSettingsAvatar {
  name: string;
  icon?: string;
  events?: {
    click: (e: Event) => void;
  };
}

export default class userSettingsAvatar extends Block {
  constructor(props: InterfaceUserSettingsAvatar) {
    super({
      ...props,
    });
  }

  render() {
    return template;
  }
}
