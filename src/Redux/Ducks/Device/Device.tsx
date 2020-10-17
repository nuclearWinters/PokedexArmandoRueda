interface IState {
  hasInternet: boolean;
}

const initialState: IState = {
  hasInternet: true,
};

const SET_INTERNET = 'SET_INTERNET';

interface SetInternet {
  type: typeof SET_INTERNET;
  payload: boolean;
}

export const setInternet = (payload: boolean): SetInternet => ({
  type: SET_INTERNET,
  payload,
});

export type DeviceTypes = SetInternet;

export const reducer = (state = initialState, action: DeviceTypes): IState => {
  switch (action.type) {
    case SET_INTERNET:
      return {
        ...state,
        hasInternet: action.payload,
      };
    default:
      return state;
  }
};
