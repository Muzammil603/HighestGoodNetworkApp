/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Dropdown, Input,
} from 'reactstrap';
debugger;
const MemberAutoComplete = (props) => {
  const [searchText, onInputChange] = useState('');
  const [isOpen, toggle] = useState(false);

  return (
    <Dropdown
      isOpen={isOpen}
      toggle={() => { toggle(!isOpen); }}
      style={{ width: '100%', marginRight: '5px' }}
    >
      <Input
        type="text"
        value={searchText}
        onChange={(e) => {
          onInputChange(e.target.value);
          toggle(true);
        }}
      />

      {(searchText !== '' && props.userProfileData && props.userProfileData.userProfiles.length > 0)
        ? (
          <div
            tabIndex="-1"
            role="menu"
            aria-hidden="false"
            className={`dropdown-menu${isOpen ? ' show' : ''}`}
            style={{ marginTop: '0px', width: '100%' }}
          >
            {props.userProfileData.userProfiles.filter((user) => {
              if (user.firstName.toLowerCase().indexOf(searchText.toLowerCase()) > -1
                || user.lastName.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
                return user;
              }
            }).slice(0, 10).map((item) => (
              <div
                className="user-auto-cpmplete"
                onClick={() => {
                  onInputChange(`${item.firstName} ${item.lastName}`);
                  toggle(false);
                  props.onAddUser(item);

                }}
              >
                {`${item.firstName} ${item.lastName}`}
              </div>
            ))}
          </div>
        )
        : <></>}

    </Dropdown>
  );
};

export default MemberAutoComplete;
