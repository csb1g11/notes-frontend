import loginReducer from '../client/redux/reducers/loginReducer';
import { SET_CURRENT_USER } from '../client/redux/actions/types';

jest.mock('config');

describe('login reducer', () => {
  it('should return the initial state', () => {
    expect(loginReducer(undefined, {})).toEqual(
      {
        token: '',
        isAuthenticated: false,
        user: {},
        auth: {},
        text: ''
      }
    )
  })

  it('should handle SET_CURRENT_USER', () => {
    let user = { 'username': 'user1', 'password': 'pass1'};
    let emptyUser = {};

    expect(
      loginReducer([], {
        type: SET_CURRENT_USER,
        user: user
      })
    ).toEqual(
      {
        user: user,
        isAuthenticated: true
      }
    )
    expect(
      loginReducer([],
          {
            type: SET_CURRENT_USER,
            user: emptyUser
          }
      )
    ).toEqual(
      {
        user: emptyUser,
        isAuthenticated: false
      }
    )
  })

})