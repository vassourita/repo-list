import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Container = styled.View`
  flex: 1;
  background-color: #24292e;
  padding-top: ${50 + getStatusBarHeight(true)}px;
`;

export const WebContainer = styled.View`
  flex: 1;
  background-color: #24292e;
  border-radius: 4px;
`;
