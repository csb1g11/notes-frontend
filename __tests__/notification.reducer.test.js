import notificationReducer from '../client/redux/reducers/notificationReducer'
import * as types from '../client/redux/actions/types'
jest.mock('config');

describe('login reducer', () => {
  it('should return the initial state', () => {
    expect(notificationReducer(undefined, {})).toEqual(
      {
        text: '',
        type: ''
      }
    )
  })

  it('should handle SUCCESSFUL_ACTION', () => {
    expect(
      notificationReducer([], {
        type: types.SUCCESSFUL_ACTION,
        text: "Good job" 
      })
    ).toEqual(
      {
        text: "Good job",
        type: types.SUCCESS
      }
    )
  })

  it('should handle REJECTED_ACTION', () => {
    expect(
      notificationReducer([], {
        type: types.REJECTED_ACTION,
        text: "Poor job" 
      })
    ).toEqual(
      {
        text: "Poor job",
        type: types.WARNING
      }
    )
  })

  it('should handle INFO_ACTION', () => {
    expect(
      notificationReducer([], {
        type: types.INFO_ACTION,
        text: "Ok job" 
      })
    ).toEqual(
      {
        text: "Ok job"
      }
    )
  })

})