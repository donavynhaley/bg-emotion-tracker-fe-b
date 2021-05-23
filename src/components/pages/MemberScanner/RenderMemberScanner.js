import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { QRCodeReader } from '../QRCodeReader';
import ManualMemberInput from './ManualMemberInput';
import { LayoutContainer, BackButton } from '../../common';
import { getMember } from '../../../state/actions';
import { Typography } from 'antd';
import { ActivityContext, MemberContext } from '../../../state/contexts/index';

const { Title } = Typography;
const { Text } = Typography;

const StyledMemberScanner = styled.header`
  display: flex;
  margin-left: 34%;
  margin-right: 34%;
  flex-direction: column;
  text-align: center;
  position: absolute;
  top: 120px;
`;

function RenderMemberScanner(props) {
  const [scanStatus, setScanStatus] = useState(false);
  const [scanError, setScanError] = useState(false);
  const [error, setError] = useState('Internal Server Error.');
  const [checkValid, setCheckValid] = useState(false);
  const activityContext = useContext(ActivityContext); //the act context
  const memberContext = useContext(MemberContext);

  const handleError = err => {
    setScanError(true);
    setError(err);
  };

  useEffect(() => {
    memberContext.setExists('');
  }, []);

  useEffect(() => {
    if (memberContext.exists === true) {
      setCheckValid(true);
    } else if (memberContext.exists === false) {
      handleError('This member does not exist.');
    }
  }, [memberContext.exists]);

  const handleScan = data => {
    if (data) {
      getMember(data, memberContext);

      memberContext.setId(data);
      setScanStatus(true);
    }
  };

  return (
    <LayoutContainer>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />

      <Link to="/activity-select">
        <BackButton buttonText="Change Activity" classType="primary" />
      </Link>

      <StyledMemberScanner>
        <h2 className="scannerTitle">Scanner</h2>
        <QRCodeReader handleScan={handleScan} handleError={handleError} />
        {scanError ? (
          <Text className="errorText" type="danger">
            {error}
          </Text>
        ) : null}
        {(() => {
          if (memberContext.id && memberContext.exists && scanStatus) {
            if (checkValid) {
              if (
                activityContext.activity.activityname === 'Club Attendance' ||
                activityContext.activity.activityname === 'Club Checkout'
              ) {
                return <Redirect to="/emoji-selectcheck" />;
              } else {
                return <Redirect to="/emoji-selectactivity" />;
              }
            }
          }
        })()}
        <ManualMemberInput
          handleError={handleError}
          setScanStatus={setScanStatus}
        />
      </StyledMemberScanner>
    </LayoutContainer>
  );
}
export default RenderMemberScanner;
