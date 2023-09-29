import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux'; 
import configureMockStore from 'redux-mock-store';
import FoundUser from './FoundUser';

const mockStore = configureMockStore();

describe('FoundUser Component', () => {
  const sampleUser = {
    index: 0,
    uid: 'user123',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    assigned: false,
    projectId: 'project123',
  };

  it('renders user data correctly', () => {
    const initialState = {}; 
    const store = mockStore(initialState);

    const { getByText, getByRole } = render(
      <Provider store={store}> 
        <FoundUser {...sampleUser} />
      </Provider>
    );
    
    // Verify that user data is displayed correctly
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('John Smith')).toBeInTheDocument();
    expect(getByText('john.smith@example.com')).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('does not render the assign button if user is already assigned', () => {
    const assignedUser = {
      ...sampleUser,
      assigned: true,
    }

    const initialState = {};
    const store = mockStore(initialState);

    const { queryByRole } = render(
      <Provider store={store}>
        <FoundUser {...assignedUser} />
      </Provider>
    );

    //verify that button is not rendered
    const assignButton = queryByRole('button');
    expect(assignButton).toBeNull();
  });

  //  it('calls assignProject function when the assign button is clicked', () => {
  //   const assignProject = jest.fn();
     
  //   const initialState = {};
  //   const store = mockStore(initialState);

  //   const { getByRole } = render(
  //     <Provider store={store}>
  //       <FoundUser {...sampleUser} assignProject={assignProject} />
  //     </Provider>
  //   );
  //   const assignButton = getByRole('button');

  //   // Simulate a button click
  //   fireEvent.click(assignButton);

  //   // Verify that the assignProject function is called with the expected arguments
  //   expect(assignProject).toHaveBeenCalledWith(
  //     'project123',
  //     'user123',
  //     'Assign',
  //     'John',
  //     'Smith'
  //   );
  // });

  it('generates the correct user profile link', () => {


    const initialState = {};
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <FoundUser {...sampleUser} />
      </Provider>
    );
    
    // Verify that the user profile link is generated correctly
    const profileLink = getByText('John Smith');
    expect(profileLink).toHaveAttribute('href', '/userprofile/user123');
  });
});
