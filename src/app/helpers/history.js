import { createBrowserHistory } from 'history';

export var history = createBrowserHistory();

//set internal history browser to use programmatically
export function setHistoryFromInternal(_history){
    history = _history;
}