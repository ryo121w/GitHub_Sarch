// src/GithubSearch.tsx

import React, { useState } from 'react';
import axios from 'axios';
import styles from './GithubSearch.module.css';

interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number; // スター数を追加
  forks_count: number; // フォーク数を追加
}

const GithubSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [page, setPage] = useState(1);

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
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              {repo.name}
            </a>
            <p>{repo.description}</p>
            <p>⭐️ {repo.stargazers_count} | 🍴 {repo.forks_count}</p> {/* スター数とフォーク数を表示 */}
          </li>
        ))}
      </ul>
      {repositories.length > 0 && (
        <button onClick={loadMoreRepositories} className={styles.loadMoreButton}>
          さらに検索
        </button>
      )}
    </div>
  );
};

export default GithubSearch;
