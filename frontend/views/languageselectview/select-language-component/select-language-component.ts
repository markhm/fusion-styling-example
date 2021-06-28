import {LitElement, html, internalProperty, property, eventOptions, PropertyValues} from 'lit-element';
import { render } from 'lit-html';
import '@vaadin/vaadin-select/vaadin-select.js';
import '@vaadin/vaadin-list-box/vaadin-list-box.js';
import '@vaadin/vaadin-item/vaadin-item.js';

import {showNotification} from '@vaadin/flow-frontend/a-notification';
import {EndpointError} from '@vaadin/flow-frontend/Connect';
import componentStyles from "./select-language-component.css";

const languages : Array<{label: string; value: string}> = [
	{ value: 'nl', label: 'Nederlands' },
	{ value: 'en', label: 'English' },
	{ value: 'da', label: 'Dansk' },
	{ value: 'fi', label: 'suomi' },
];

class SelectLanguageComponent extends LitElement {

	static styles = [ componentStyles];

	private _boundSelectRenderer = this._selectRenderer.bind(this);

	@internalProperty()
	hasLoadedTranslations;

	@property()
	language: string = 'nl';

	render() {
		return html`
      <vaadin-select theme="my-styled-select" label="" value="nl" 
                     .renderer=${this._boundSelectRenderer}>
      </vaadin-select>
    `;
	}

	constructor () {
		super();
		this.hasLoadedTranslations = true;
	}

	// // Defer the first update of the component until the strings have been loaded to avoid empty strings being shown
	shouldUpdate (changedProperties: PropertyValues) {
		return this.hasLoadedTranslations && super.shouldUpdate(changedProperties);
	}

	_selectRenderer(root: HTMLElement) {
		// only render list-box element once
		let listBox = root.firstElementChild;
		if (!listBox) {
			render(html`
					<vaadin-list-box @selected-changed="${this.onSelectedChanged}"></vaadin-list-box>
			`, root);
			listBox = root.firstElementChild;
		}
		render(
			html`
        ${languages.map(({ label, value }) => {
				return html`
						<vaadin-item value="${value}">
            	<div style="display: flex; align-items: center; justify-content: flex-start">
		            <img class="header-logo" height="15px" width="20px" alt="Country" src="./images/language/${value}.svg"/>
								<span style="margin-left: 8px">${label}</span>
            	</div>
						</vaadin-item>`;
			})}
      `,
			listBox!
		);
	}

	async connectedCallback() {
		super.connectedCallback();

		await this.getLanguagePreference();
		await this.loadTranslations();
		this.hasLoadedTranslations = true;
	}

	async loadTranslations() {
	  let language = localStorage.getItem('language') || 'nl';
	  localStorage.setItem('language', language);
	}

	@eventOptions({capture: true})
	private async onSelectedChanged (e: CustomEvent<{ value: number }>) {

		this.language = languages[e.detail.value].value;
		localStorage.setItem('language', this.language);

		// this.saveLanguagePreference();
	}

	private getOktaUserId() {

		let oktaTokenStorage = localStorage.getItem('okta-token-storage') || '';
		let oktaUserId = JSON.parse(oktaTokenStorage).accessToken.claims.uid;
		return oktaUserId;
	}

	// @ts-ignore
	private saveLanguagePreference() {
		let oktaUserId = this.getOktaUserId();
		if (oktaUserId.length < 1 ) return;

		try {
			// UserEndpoint.savePreferredLanguage(oktaUserId, this.language);

		} catch (error) {
			if (error instanceof EndpointError) {
				showNotification('Server error. ' + error.message, {position: 'bottom-start'});
			} else {
				throw error;
			}
		}
	}

	private async getLanguagePreference() {

		let oktaUserId = this.getOktaUserId();
		if (oktaUserId.length < 1 ) return;

		try {
			// this.language = await UserEndpoint.getPreferredLanguage(oktaUserId) || 'nl';

			console.log('this.language: '+this.language);

		} catch (error) {
			if (error instanceof EndpointError) {
				showNotification('Server error. ' + error.message, {position: 'bottom-start'});
			} else {
				throw error;
			}
		}
	}

}

customElements.define('select-language-component', SelectLanguageComponent);
