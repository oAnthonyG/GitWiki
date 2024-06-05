import { useState } from 'react';
import gitLogo from '../assets/github-logo.png'
import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo';
import { Container } from './styles';
import Button from '../components/Button';
import { api } from '../services/api'

function App() {
  const [currentRepo, SetCurrentRepo] = useState('')
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    const { data } = await api.get(`repos/${currentRepo}`)

    
    if (data.id) {
      const isExist = repos.find(repo => repo.id === data.id)
      if (!isExist) {
        setRepos(prev => [...prev, data]);
        SetCurrentRepo('')
        return
      }

    }
    alert('Repositório ja encontrado abaixo')
  }

  const handleRemoveRepo = (id) => {
    const removedRepo = repos.filter(repo => repo.id !== id)
    setRepos(removedRepo)
  }

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt='Git-Hub Logo' />
      <Input value={currentRepo} onChange={(e) => SetCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo} />
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />)}

    </Container>
  );
}

export default App;
