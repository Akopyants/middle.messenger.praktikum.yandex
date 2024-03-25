import Component from '../../utils/Component';
import template from './user-settings-avatar.hbs?raw';
import './user-settings-avatar.scss';

interface InterfaceUserSettingsAvatar {
  name: string;
  icon?: string
}

export default class userSettingsAvatar extends Component {
  constructor(props: InterfaceUserSettingsAvatar) {
    super(props);
  }


  render() {

    return `${template}`;
  }
}
