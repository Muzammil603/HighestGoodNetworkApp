import React, { useState } from 'react';
import { SEARCH, SHOW, CREATE_NEW_USER, SEND_SETUP_LINK } from '../../languages/en/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { boxStyle, boxStyleDark } from 'styles';
import hasPermission from 'utils/permissions';
import { connect } from 'react-redux';
import { Tooltip as ReactstrapTooltip } from 'reactstrap';

const setupHistoryTooltip = (
  <Tooltip id="tooltip">
    Setup History Modal
  </Tooltip>
)

/**
 * The search panel stateless component for user management grid
 */

const UserSearchPanel = ({ hasPermission, handleNewUserSetupPopup, handleSetupHistoryPopup, onNewUserClick, searchText, onSearch, onActiveFiter, darkMode }) => {
  const canCreateUsers = hasPermission('postUserProfile');
  const [tooltipCreateNewUserOpen, setTooltipCreateNewUserOpen] = useState(false);
  const toggleCreateNewUserTooltip = () => setTooltipCreateNewUserOpen(!tooltipCreateNewUserOpen);
  
  return (
    <div className="input-group mt-3" id="new_usermanagement">
      <button type="button" disabled={!canCreateUsers} className="btn btn-info mr-2" onClick={handleNewUserSetupPopup} style={darkMode ? boxStyleDark : boxStyle}>
        {SEND_SETUP_LINK}
      </button>
      <OverlayTrigger placement="bottom" overlay={setupHistoryTooltip}>
        <button type="button" className="btn btn-info mr-2" onClick={handleSetupHistoryPopup} style={darkMode ? boxStyleDark : boxStyle}>
          <FontAwesomeIcon
            className="bell_icon"
            icon={faBell}
          />
        </button>
      </OverlayTrigger>


      <>
        {
          !canCreateUsers ? 
          <ReactstrapTooltip
            placement="bottom"
            isOpen={tooltipCreateNewUserOpen}
            target={"btn-create-new-user"}
            toggle={toggleCreateNewUserTooltip}
          >
            You don't have permission to create a new user
          </ReactstrapTooltip>
          : ""
        }
        
        <button
          type="button"
          disabled={!canCreateUsers}
          className="btn btn-info mr-2"
          onClick={e => {
            onNewUserClick();
          }}
          style={darkMode ? boxStyleDark : boxStyle}
          id={"btn-create-new-user"}
        >
          {CREATE_NEW_USER}
        </button>
      </>
      <div className="input-group-prepend">
        <span className="input-group-text">{SEARCH}</span>
      </div>
      <input
        autoFocus
        type="text"
        className="form-control"
        aria-label="Search"
        placeholder="Search Text"
        id="user-profiles-wild-card-search"
        value={searchText}
        onChange={e => {
          onSearch(e.target.value);
        }}
      />
      <div className="input-group-prepend ml-2">
        <span className="input-group-text">{SHOW}</span>
        <select
          id="active-filter-dropdown"
          onChange={e => {
            onActiveFiter(e.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="paused">Paused</option>
        </select>
      </div>

      <div className="input-group-append"></div>
    </div>
  );
};

export default connect(null, { hasPermission })(UserSearchPanel);
