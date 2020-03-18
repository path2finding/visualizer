import { StateType, ActionType } from 'typesafe-actions';

declare module 'typesafe-actions' {
  export type Store = StateType<typeof import('../').store>;

  export type RootState = StateType<
    ReturnType<typeof import('../reducers/rootReducer').default>
  >;

  export type RootAction = ActionType<
    typeof import('../actions/rootActions').default
  >;

  interface Types {
    RootAction: RootAction;
  }
}
