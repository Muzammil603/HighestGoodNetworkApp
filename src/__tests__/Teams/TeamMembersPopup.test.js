import React from 'react';
import { Provider } from 'react-redux';
import TeamMembersPopup from 'components/Teams/TeamMembersPopup';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import thunk from 'redux-thunk';
import { authMock, userProfileMock, rolesMock } from '../../__tests__/mockStates';

const mockStore = configureStore([thunk]);

const initialProps = {
  open: true,
  selectedTeamName: 'Test Team',
  hasPermission: jest.fn(),
  members: {
    teamMembers: {
      toSorted: jest.fn(() => []),
    },
  },
  roles: [{}],
  auth: {
    user: {
      role: 'Owner',
      permissions: {
        frontPermissions: ['assignTeamToUsers'],
      },
    },
  },
  requestorRole: '',
  userPermissions: [],
  onClose: jest.fn(),
  onDeleteClick: jest.fn(),
};

let store;

beforeEach(() => {
  store = mockStore({
    auth: authMock,
    userProfile: userProfileMock,
    role: rolesMock.role,
    ...initialProps,
  });
});

describe('TeamMembersPopup', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TeamMembersPopup {...initialProps} />
      </Provider>,
    );

    const addButton = getByText('Add');
    expect(addButton).toBeInTheDocument();
  });
});
