import { customElement, html } from 'lit-element';
import '!style-loader!css-loader!./language-select-view.css';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field';

import { View } from '../../views/view';

import './select-language-component/select-language-component';

@customElement('language-select-view')
export class LanguageSelectView extends View {

  render() {
    return html`
      <h3>Select the language</h3>
      <select-language-component>
      </select-language-component>
      
    `;
  }

}
