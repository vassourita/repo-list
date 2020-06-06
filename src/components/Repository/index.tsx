import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';

import { Container, Name, Description, Stats, Stat, StatCount, Buttons, Refresh, RefreshText, Remove } from './styles';

interface Props {
  repository: {
    id: number;
    name: string;
    full_name: string;
    description: string;
    forks: number;
    stargazers_count: number;
    html_url: string;
  };
  onRefresh: (event: GestureResponderEvent) => void;
  onRemove: (event: GestureResponderEvent) => void;
}

const Repository: React.FC<Props> = ({ repository, onRefresh, onRemove }) => {
  const navigation = useNavigation();
  return (
    <Container onPress={() => navigation.navigate('Repo', { repository })}>
      <Name>{repository.name}</Name>
      <Description>{repository.description}</Description>

      <Stats>
        <Stat>
          <Icon name="star" size={16} color="#333" />
          <StatCount>{repository.stargazers_count}</StatCount>
        </Stat>
        <Stat>
          <Icon name="git-branch" size={16} color="#333" />
          <StatCount>{repository.forks}</StatCount>
        </Stat>
      </Stats>

      <Buttons>
        <Refresh onPress={onRefresh}>
          <Icon name="refresh-cw" color="#7159c1" size={16} />
          <RefreshText>ATUALIZAR</RefreshText>
        </Refresh>
        <Remove onPress={onRemove}>
          <RefreshText>REMOVER</RefreshText>
          <Icon name="trash" color="#7159c1" size={16} />
        </Remove>
      </Buttons>
    </Container>
  );
};

export default Repository;
