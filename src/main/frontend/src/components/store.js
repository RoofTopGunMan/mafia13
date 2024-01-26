// store.js
const initialState = {
  userId: localStorage.getItem('userId') || 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      console.log(action.userId);
      // 로그인 성공 시 userId를 localStorage에 저장
      localStorage.setItem('userId', action.userId);
      return { ...state, userId: action.userId };
    default:
      return state;
  }
};

export default reducer;
