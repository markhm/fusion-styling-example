import { Route } from '@vaadin/router';
import './views/languageselectview/languageselectview-view';
import './views/main/main-view';

export type ViewRoute = Route & { title?: string; children?: ViewRoute[] };

export const views: ViewRoute[] = [
  // for client-side, place routes below (more info https://vaadin.com/docs/v18/flow/typescript/creating-routes.html)
  {
    path: '',
    component: 'languageselectview-view',
    title: '',
  },
  {
    path: 'language-select',
    component: 'languageselectview-view',
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
