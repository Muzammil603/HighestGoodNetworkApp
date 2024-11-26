import notificationReducer from '../notificationReducer';
import * as actionTypes from '../../constants/notification';

describe('Notification Reducer', () => {
  const initialState = {
    notifications: [],
    unreadNotifications: [],
    sentNotifications: [],
    loading: false,
    error: null,
  };

  it('should return the initial state', () => {
    expect(notificationReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_USER_NOTIFICATIONS_REQUEST and set loading to true', () => {
    const action = { type: actionTypes.FETCH_USER_NOTIFICATIONS_REQUEST };
    const expectedState = { ...initialState, loading: true, error: null };
    expect(notificationReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_USER_NOTIFICATIONS_SUCCESS and update notifications', () => {
    const action = {
      type: actionTypes.FETCH_USER_NOTIFICATIONS_SUCCESS,
      payload: [{ id: 1, message: 'Test notification' }],
    };
    const expectedState = {
      ...initialState,
      notifications: action.payload,
      loading: false,
      error: null,
    };
    expect(notificationReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_USER_NOTIFICATIONS_FAILURE and set error', () => {
    const action = {
      type: actionTypes.FETCH_USER_NOTIFICATIONS_FAILURE,
      payload: 'Error fetching notifications',
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: action.payload,
    };
    expect(notificationReducer(initialState, action)).toEqual(expectedState);
  });
});
