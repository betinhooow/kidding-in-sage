import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import multi from 'redux-multi';
import thunk from 'redux-thunk';

import Reducers from './reducers';

const middlewares = [thunk, multi, promise];

export default createStore(Reducers, applyMiddleware(...middlewares));