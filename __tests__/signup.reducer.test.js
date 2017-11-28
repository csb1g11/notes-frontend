import signupReducer from '../client/redux/reducers/signupReducer';
import { CREATE_USER_REQUEST, SIGNUP_REQUEST } from '../client/redux/actions/types';

jest.mock('config');

describe('signup reducer', () => {
  it('should return the initial state', () => {
    expect(signupReducer(undefined, {})).toEqual(
      {
        user: {},
        auth: {},
        isFetching: false,
        isCreating: false
      }
    )
  })

  it('should handle CREATE_USER_REQUEST', () => {
    let user = { 'username': 'user1', 
                'password': 'pass1' };
    let emptyUser = {};

    expect(
      signupReducer([], {
        type: CREATE_USER_REQUEST,
        user: user
      })
    ).toEqual(
      {
        user: user,
        isFetching: false,
        isCreating: true
      }
    )
    expect(
      signupReducer([],
          {
            type: CREATE_USER_REQUEST,
            user: emptyUser
          }
      )
    ).toEqual(
      {
        user: emptyUser,
        isFetching: false,
        isCreating: true
      }
    )
  })

  it('should handle SIGNUP_REQUEST', () => {
    let user = { 'username': 'user1', 
                 'password': 'pass1' };
    let emptyUser = {};

    expect(
      signupReducer([], {
        type: SIGNUP_REQUEST,
        user: user
      })
    ).toEqual(
      {
        user: user,
        isAuthenticated: true,
        isFetching: true
      }
    )
    expect(
      signupReducer([],
          {
            type: SIGNUP_REQUEST,
            user: emptyUser
          }
      )
    ).toEqual(
      {
        isAuthenticated: false,
        user: emptyUser,
        isFetching: true
      }
    )
  })
})