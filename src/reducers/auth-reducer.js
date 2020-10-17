const initialState = {
  token: null,
  status: 'idle',
};

export default function authReducer(state = initialState, action) {
  switch (action.type){
    default: {
      return state;
    }
  }
}