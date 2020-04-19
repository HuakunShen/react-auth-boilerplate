export const LOAD_AUTH = 'LOAD_AUTH';
export const CLEAR_AUTH = 'CLEAR_AUTH';
export type authStateType = null | object;
interface LoadAuthAction {
  type: typeof LOAD_AUTH;
  auth: authStateType;
}

interface ClearAuthAction {
  type: typeof CLEAR_AUTH;
  auth: authStateType;
}

export type AuthActionType = LoadAuthAction | ClearAuthAction | undefined;

export interface reduxStateType {
  auth: object | null;
}
