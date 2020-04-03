const initialState = {};

type InitialStateType = typeof initialState;

export const sidebarReducer = (state = initialState, action: any): InitialStateType => ({state});