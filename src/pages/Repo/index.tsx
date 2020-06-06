import React from 'react';
import { WebView } from 'react-native-webview';

import { Container, WebContainer } from './styles';

const Repo: React.FC<any> = ({ route }) => {
  const { repository } = route.params;
  return (
    <Container>
      <WebContainer>
        <WebView source={{ uri: repository.html_url }} />
      </WebContainer>
    </Container>
  );
};

export default Repo;
