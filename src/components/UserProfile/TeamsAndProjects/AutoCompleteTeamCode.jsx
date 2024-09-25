import React, { useEffect } from 'react';
import { Spinner, Input, ListGroup, ListGroupItem } from 'reactstrap';
import { IoReload } from 'react-icons/io5';
import './autoComplete.css';

export const AutoCompleteTeamCode = props => {
  const {
    refDropdown,
    teamCode,
    handleCodeChange,
    setShowDropdown,
    showDropdown,
    arrayInputAutoComplete,
    inputAutoStatus,
    isLoading,
    fetchTeamCodeAllUsers,
    darkMode,
    isMobile,
    refInput,
    autoCompleteUpdateMessage,
  } = props;

  useEffect(() => {
    if (showDropdown) {
      const handleClickOutside = event =>
        refDropdown.current && !refDropdown.current.contains(event.target)
          ? (setShowDropdown(false), document.getElementById('teamCode').blur())
          : null;
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [refDropdown, showDropdown]);

  const classNameStyleP = `m-0 p-1 d-flex justify-content-center align-items-center list-group-item-action`;

  const getWidth = () => {
    if (isLoading || arrayInputAutoComplete.length <= 3) {
      return 'auto';
    } else if (window.innerWidth > 1200) {
      // Desktop
      return '34rem';
    } else if (window.innerWidth > 1024) {
      // Tablet
      return '28rem';
    } else {
      // Mobile
      return '22rem';
    }
  };

  const getRightPosition = () => {
    if (isMobile) {
      return '22rem';
    } else if (window.innerWidth > 1200) {
      // Desktop
      return '34.3rem';
    } else if (window.innerWidth > 1024) {
      // Tablet
      return '28.3rem';
    }
  };

  const styleP = {
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    width:
      arrayInputAutoComplete && arrayInputAutoComplete.length <= 3
        ? '100%'
        : arrayInputAutoComplete && arrayInputAutoComplete.length <= 30
        ? '102px'
        : '100px',
  };

  const borderBottomRadius = {
    borderBottomRightRadius: '10px',
    borderBottomLeftRadius: '10px',
  };

  const styleSpinner = { ...styleP, ...borderBottomRadius, width: 'auto' };
  const styleReload = { fontSize: '1.5rem', color: '#0780eb', cursor: 'pointer' };
  const colordarkWithBorder = {
    backgroundColor: '#1c2541',
    color: '#fff',
    border: '2px solid #1c5b87',
  };
  const colordark = {
    backgroundColor: '#1c2541',
    color: '#fff',
    outline: 'none',
    border: 'none',
  };

  let autoComplete = false;

  return (
    <>
      <Input
        id="teamCode"
        value={teamCode}
        onChange={handleCodeChange}
        style={darkMode ? colordark : null}
        ref={refInput}
        placeholder="X-XXX"
        onFocus={() => !showDropdown && setShowDropdown(true)}
      />
      <section>
        {showDropdown && (
          <section
            ref={refDropdown}
            className={`overflow-auto mb-2 scrollAutoComplete`}
            style={{
              height: isLoading ? '7rem' : arrayInputAutoComplete.length <= 30 ? 'auto' : '23rem',
              width: getWidth(),
              position: arrayInputAutoComplete.length <= 3 || isLoading ? '' : 'relative',
              right: getRightPosition(),
            }}
          >
            {!isLoading ? (
              arrayInputAutoComplete.length === 0 ? (
                <p
                  className={classNameStyleP}
                  style={
                    darkMode
                      ? { ...styleP, ...colordarkWithBorder, width: 'auto' }
                      : { ...styleP, width: 'auto' }
                  }
                >
                  {autoCompleteUpdateMessage ? 'Updating' : 'No options'}
                </p>
              ) : inputAutoStatus !== 200 ? (
                <ListGroup>
                  <ListGroupItem
                    className="d-flex justify-content-center align-items-center"
                    onClick={fetchTeamCodeAllUsers}
                    style={darkMode ? colordarkWithBorder : null}
                  >
                    <IoReload style={styleReload} />
                  </ListGroupItem>
                </ListGroup>
              ) : (
                <div
                  className={`${arrayInputAutoComplete.length > 3 &&
                    'row row-cols-lg-5 row-cols-sm-4'}`}
                >
                  {arrayInputAutoComplete.map(item => (
                    <div
                      key={item}
                      className={`${arrayInputAutoComplete.length <= 3 ? '' : 'col col-cols-3'}`}
                    >
                      <p
                        className={classNameStyleP}
                        style={
                          darkMode
                            ? { ...styleP, ...colordarkWithBorder, cursor: 'pointer' }
                            : { ...styleP, cursor: 'pointer' }
                        }
                        onClick={() => handleCodeChange(item, (autoComplete = true))}
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <section
                className="h-100 d-flex justify-content-center align-items-center"
                style={darkMode ? { ...styleSpinner, ...colordarkWithBorder } : styleSpinner}
              >
                <Spinner color="primary"></Spinner>
              </section>
            )}
          </section>
        )}
      </section>
    </>
  );
};
