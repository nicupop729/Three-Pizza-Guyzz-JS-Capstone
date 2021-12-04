import '../style.css';
import { getPizza } from './api-calls/forkifyAPI.js';
import { getLikes } from './api-calls/involvementAPI';

import loadSpinner from './home-folder/spinner.js';

window.onload = () => {
  getLikes();
  getPizza();
  loadSpinner();
};
