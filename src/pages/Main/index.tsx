import React, { useState, useEffect } from 'react';
import { Keyboard, AsyncStorage, ListRenderItemInfo } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import Repository from '../../components/Repository';

import api from '../../services/api';

import { Container, Title, Form, Input, Submit, List } from './styles';

interface IRepository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  forks: number;
  stargazers_count: number;
  html_url: string;
}

const Main: React.FC = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [repositories, setRepositories] = useState<IRepository[]>([]);

  useEffect(() => {
    async function loadRepositories() {
      const allRepos = await AsyncStorage.getItem('@repo-list/repos');

      if (allRepos) setRepositories(JSON.parse(allRepos));
    }

    loadRepositories();
  }, []);

  async function handleAddRepository() {
    try {
      const { data } = await api.get<IRepository>(`/repos/${input}`);

      const repo: IRepository = {
        id: data.id,
        name: data.name,
        full_name: data.full_name,
        description: data.description,
        stargazers_count: data.stargazers_count,
        forks: data.forks,
        html_url: data.html_url,
      };

      setRepositories([...repositories, repo]);

      await AsyncStorage.setItem('@repo-list/repos', JSON.stringify(repositories));

      setInput('');
      setError(false);
      Keyboard.dismiss();
    } catch (err) {
      setError(true);
    }
  }

  async function handleRefreshRepository(repository: IRepository) {
    const { data } = await api.get(`/repos/${repository.full_name}`);

    const updatedRepo: IRepository = {
      id: data.id,
      name: data.name,
      full_name: data.full_name,
      description: data.description,
      stargazers_count: data.stargazers_count,
      forks: data.forks,
      html_url: data.html_url,
    };

    setRepositories(repositories.map(repo => (repo.id === updatedRepo.id ? updatedRepo : repo)));

    await AsyncStorage.setItem('@repo-list/repos', JSON.stringify(repositories));
  }

  async function handleRemoveRepository(repository: IRepository) {
    setRepositories(repositories.filter(repo => repo.id !== repository.id));

    await AsyncStorage.setItem('@repo-list/repos', JSON.stringify(repositories));
  }

  return (
    <Container>
      <Title>Repositórios</Title>

      <Form>
        <Input
          value={input}
          error={error}
          onChangeText={setInput}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Procurar repositório..."
        />
        <Submit onPress={handleAddRepository}>
          <Icon name="plus" size={22} color="#FFF" />
        </Submit>
      </Form>

      <List
        keyboardShouldPersistTaps="handled"
        data={repositories}
        keyExtractor={(item: any) => String(item.id)}
        renderItem={({ item }: ListRenderItemInfo<any>) => (
          <Repository
            repository={item}
            onRemove={() => handleRemoveRepository(item)}
            onRefresh={() => handleRefreshRepository(item)}
          />
        )}
      />
    </Container>
  );
};

export default Main;
