import React, { useState } from 'react';
import axios from 'axios';
import styles from './GithubSearch.module.css';
import IssueList from './IssueList';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
}

const GithubSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [page, setPage] = useState(1);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);

  const searchRepositories = async (loadMore: boolean = false) => {
    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${searchTerm}&page=${page}`
      );

      if (loadMore) {
        setRepositories((prevRepositories) => [
          ...prevRepositories,
          ...response.data.items,
        ]);
      } else {
        setRepositories(response.data.items);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadMoreRepositories = () => {
    setPage((prevPage) => prevPage + 1);
    searchRepositories(true);
  };

  const openIssueModal = (repoFullName: string) => {
    setSelectedRepo(repoFullName);
  };

  const closeIssueModal = () => {
    setSelectedRepo(null);
  };

  return (
    <div>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="リポジトリ名を入力"
          className={styles.searchInput}
        />
        <button onClick={() => searchRepositories()} className={styles.searchButton}>
          検索
        </button>
      </div>
      <ul className={styles.repositoryList}>
        {repositories.map((repo) => (
          <li key={repo.id} className={styles.repositoryItem}>
            <span
              onClick={() => openIssueModal(repo.full_name)}
              className={styles.repoTitle}
            >
              {repo.name}
            </span>
            <p>{repo.description}</p>
            <p>⭐️ {repo.stargazers_count} | 🍴 {repo.forks_count}</p>
          </li>
        ))}
      </ul>
      {repositories.length > 0 && (
        <button onClick={loadMoreRepositories} className={styles.loadMoreButton}>
          さらに検索
        </button>
      )}
      {selectedRepo && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button onClick={closeIssueModal} className={styles.closeModalButton}>
              &times;
            </button>
            <IssueList repositoryFullName={selectedRepo} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GithubSearch;
