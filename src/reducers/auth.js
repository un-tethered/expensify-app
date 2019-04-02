export default (state = {}, { type, payload }) => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        uid: payload.uid
      };
    
    case 'LOGOUT':
      return {}

    default:
      return state;
  }
};
