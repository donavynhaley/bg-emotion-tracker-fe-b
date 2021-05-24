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
  margin-left: 30%;
  margin-right: 30%;
  flex-direction: column;
  text-align: center;
`;

function RenderMemberScanner(props) {
  const [scanStatus, setScanStatus] = useState(false);
  const [scanError, setScanError] = useState(false);
  const [error, setError] = useState('Internal Server Error.');
  const [checkValid, setCheckValid] = useState(false);
  const activityContext = useContext(ActivityContext); //the act context
  const memberContext = useContext(MemberContext);

  const handleError = err => {
    if (err.toString().search(/video source/i) >= 0) {
      console.log(err);
      setScanError(true);
      setError('Camera Unavailable');
      return;
    }
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
        <QRCodeReader handleScan={handleScan} handleError={handleError} />
        {scanError ? (
          <Text className="errorText" type="danger">
            {error}
          </Text>
        ) : (
          <Text style={{ height: '21px' }}></Text>
        )}
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
