import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { boxStyle, boxStyleDark } from 'styles';
// eslint-disable-next-line import/no-cycle
import PermissionList from './PermissionList';
import hasPermission from '../../utils/permissions';
import './UserRoleTab.css';

function PermissionListItem(props) {
  const {
    rolePermissions,
    immutablePermissions,
    label,
    permission,
    subperms,
    description,
    editable,
    depth,
    setPermissions,
    darkMode,
  } = props;

  const isCategory = !!subperms;
  const [infoRoleModal, setinfoRoleModal] = useState(false);
  const [modalContent, setContent] = useState(null);
  const hasThisPermission =
    rolePermissions.includes(permission) || immutablePermissions.includes(permission);

  const handleModalOpen = () => {
    setContent(description);
    setinfoRoleModal(true);
  };

  const toggleInfoRoleModal = () => {
    setinfoRoleModal(!infoRoleModal);
  };

  const togglePermission = permissionKey => {
    if (rolePermissions.includes(permissionKey) || immutablePermissions.includes(permissionKey)) {
      setPermissions(previous => previous.filter(perm => perm !== permissionKey));
    } else {
      setPermissions(previous => [...previous, permissionKey]);
    }
    // eslint-disable-next-line react/destructuring-assignment
    props.onChange();
  };

  const setSubpermissions = (recursiveSubperms, adding) => {
    recursiveSubperms.forEach(subperm => {
      if (subperm.subperms) {
        setSubpermissions(subperm.subperms, adding);
      } else if (adding !== rolePermissions.includes(subperm.key)) {
        togglePermission(subperm.key);
      }
    });
  };

  // returns 'All', 'None', or 'Some' depending on if that role has that selection of permissions
  const checkSubperms = () => {
    if (!subperms) {
      return 'None'; // or any other appropriate default value
    }

    let list = [...subperms];
    let all = true;
    let none = true;

    while (list.length > 0) {
      const perm = list.pop();
      if (perm.subperms) {
        list = list.concat(perm.subperms);
      } else if (rolePermissions.includes(perm.key) || immutablePermissions.includes(perm.key)) {
        none = false;
      } else {
        all = false;
      }
    }

    if (all) {
      return 'All';
    }
    if (none) {
      return 'None';
    }
    return 'Some';
  };

  const howManySubpermsInRole = checkSubperms(subperms);

  let color;
  if (isCategory) {
    if (howManySubpermsInRole === 'All') {
      color = darkMode ? 'lightgreen' : 'green';
    } else if (howManySubpermsInRole === 'Some') {
      color = darkMode ? 'white' : 'black';
    } else {
      color = darkMode ? '#f94144' : 'red';
    }
  } else if (darkMode) {
    color = hasThisPermission ? 'lightgreen' : '#f94144';
  } else {
    color = hasThisPermission ? 'green' : 'red';
  }

  const fontSize = isCategory ? '20px' : undefined;
  const paddingLeft = `${50 * depth}px`;
  const textShadow = darkMode ? '0.5px 0.5px 2px black' : '';

  const getColor = () => {
    if (howManySubpermsInRole === 'All') {
      return 'danger';
    }
    if (howManySubpermsInRole === 'Some') {
      return 'secondary';
    }
    return 'success';
  };

  return (
    <>
      <li className="user-role-tab__permissions" key={permission} data-testid={permission}>
        <p
          style={{
            color,
            fontSize,
            paddingLeft,
            textShadow,
          }}
          className="permission-label"
        >
          {label}
        </p>
        <div className="icon-button-container">
          <div className="infos">
            <i
              data-toggle="tooltip"
              data-placement="center"
              title="Click for more information"
              aria-hidden="true"
              className="fa fa-info-circle"
              onClick={() => {
                handleModalOpen(description);
              }}
              style={{ color: darkMode ? 'white' : 'black' }}
            />
          </div>
          {/* eslint-disable-next-line no-nested-ternary */}
          {!editable ? null : isCategory ? (
            <Button
              className="icon-button"
              color={getColor()}
              onClick={() => {
                // eslint-disable-next-line no-debugger
                // const state = howManySubpermsInRole !== 'None';
                setSubpermissions(subperms, howManySubpermsInRole !== 'All');
                // eslint-disable-next-line react/destructuring-assignment
                props.onChange();
              }}
              // eslint-disable-next-line react/destructuring-assignment
              disabled={immutablePermissions.includes(permission)}
              style={darkMode ? boxStyleDark : boxStyle}
            >
              {howManySubpermsInRole === 'All' ? 'Delete' : 'Add'}
            </Button>
          ) : (
            <Button
              className="icon-button"
              color={hasThisPermission ? 'danger' : 'success'}
              onClick={() => {
                togglePermission(permission);
              }}
              disabled={immutablePermissions.includes(permission)}
              style={darkMode ? boxStyleDark : boxStyle}
            >
              {hasThisPermission ? 'Delete' : 'Add'}
            </Button>
          )}
        </div>
      </li>
      {isCategory ? (
        <li
          className="user-role-tab__permissionList"
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <PermissionList
            rolePermissions={rolePermissions}
            permissionsList={subperms}
            immutablePermissions={immutablePermissions}
            editable={editable}
            setPermissions={setPermissions}
            // eslint-disable-next-line react/destructuring-assignment
            onChange={props.onChange}
            depth={depth + 1}
            darkMode={darkMode}
          />
        </li>
      ) : null}
      <Modal
        isOpen={infoRoleModal}
        toggle={toggleInfoRoleModal}
        id="#modal2-body_new-role--padding"
        className={darkMode ? 'text-light dark-mode' : ''}
      >
        <ModalHeader toggle={toggleInfoRoleModal} className={darkMode ? 'bg-space-cadet' : ''}>
          Permission Info
        </ModalHeader>
        <ModalBody className={darkMode ? 'bg-yinmn-blue' : ''}>{modalContent}</ModalBody>
        <ModalFooter className={darkMode ? 'bg-yinmn-blue' : ''}>
          <Button onClick={toggleInfoRoleModal} color="secondary" className="float-left">
            {' '}
            Ok{' '}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

const mapStateToProps = state => ({ roles: state.role.roles });

const mapDispatchToProps = dispatch => ({
  hasPermission: permission => dispatch(hasPermission(permission)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PermissionListItem);
