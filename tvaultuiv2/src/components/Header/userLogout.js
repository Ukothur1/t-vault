import React, { useEffect, useState } from 'react';
import * as msal from '@azure/msal-browser';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import userIcon from '../../assets/icon-profile.svg';
import vectorIcon from '../../assets/vector.svg';
import { revokeToken } from '../../views/public/HomePage/utils';
import configData from '../../config/config';
import mediaBreakpoints from '../../breakpoints';
import configUrl from '../../config/index';

const LogoutWrapper = styled.div`
  position: relative;
`;

const UserWrap = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  ${mediaBreakpoints.smallAndMedium} {
    margin-top: 2rem;
  }
`;

const UserName = styled.div`
  max-width: 10rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-left: 0.3rem;
`;

const UserIcon = styled.img`
  margin: 0 0.5rem;
`;

const VectorIcon = styled.img`
  margin-left: 0.4rem;
`;

const AdminLabel = styled.div`
  display: flex;
  font-weight: bold;
`;

const LogoutPaper = styled.div`
  display: ${(props) => (props.logoutClicked ? 'block' : 'none')};
  position: absolute;
  background-color: ${(props) => props.theme.palette.background.paper};
  padding: 1rem 2rem;
  right: 0;
  cursor: pointer;
  ${mediaBreakpoints.smallAndMedium} {
    right: 50%;
  }
`;

const UserLogout = (props) => {
  const { userName, checkToken } = props;

  const [isAdmin, setIsAdmin] = useState(false);
  const [logoutClicked, setLogoutClicked] = useState(false);

  const handleClick = () => {
    setLogoutClicked(!logoutClicked);
  };

  const config = {
    auth: {
      clientId: localStorage.getItem('clientId'),
      redirectUri: configUrl.redirectUrl, // defaults to application start page
      postLogoutRedirectUri: configUrl.redirectUrl,
    },
  };

  const myMsal = new msal.PublicClientApplication(config);
  const onLogoutClicked = async () => {
    setLogoutClicked(false);
    myMsal.logout();
    if (configData.AUTH_TYPE === 'oidc') {
      await revokeToken();
    }
    localStorage.clear();
    checkToken();
  };

  useEffect(() => {
    const admin = localStorage.getItem('isAdmin');
    if (admin) {
      setIsAdmin(JSON.parse(admin));
    }
  }, []);

  return (
    <LogoutWrapper>
      <UserWrap onClick={() => handleClick()}>
        <UserIcon src={userIcon} alt="usericon" />
        <AdminLabel>
          {isAdmin && <>(Admin) </>}
          <UserName>{userName}</UserName>
        </AdminLabel>
        <VectorIcon src={vectorIcon} alt="vectoricon" />
      </UserWrap>

      <LogoutPaper
        logoutClicked={logoutClicked}
        onClick={() => onLogoutClicked()}
      >
        Logout
      </LogoutPaper>
    </LogoutWrapper>
  );
};

UserLogout.propTypes = {
  userName: PropTypes.string.isRequired,
  checkToken: PropTypes.func.isRequired,
};

export default UserLogout;
