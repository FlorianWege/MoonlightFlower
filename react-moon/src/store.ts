import { createStore, applyMiddleware, AnyAction, Store } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';

const middleware = applyMiddleware(thunk);

const rootReducer = () => {};

export type TAppState = ReturnType<typeof rootReducer>;
export type TDispatch = ThunkDispatch<TAppState, void, AnyAction>;
export type TStore = Store<TAppState, AnyAction> & { dispatch: TDispatch };
export type TGetState = () => TAppState;

const store: TStore = createStore(rootReducer, middleware);

export type State = {};

export default store;
