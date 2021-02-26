import { Route } from '@vaadin/router';
import './views/languageselectview/language-select-view';
import './views/main/main-view';

export type ViewRoute = Route & { title?: string; children?: ViewRoute[] };

export const views: ViewRoute[] = [
  // for client-side, place routes below (more info https://vaadin.com/docs/v18/flow/typescript/creating-routes.html)
  {
    path: '',
    component: 'language-select-view',
    title: '',
  },
  {
    path: 'language-select',
    component: 'language-select-view',
    title: 'language-select-view',
  },
];
export const routes: ViewRoute[] = [
  {
    path: '',
    component: 'main-view',
    children: [...views],
  },
];
