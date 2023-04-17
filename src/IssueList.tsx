import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Issue {
  id: number;
  title: string;
}

interface IssueListProps {
  repositoryFullName: string;
}

const IssueList: React.FC<IssueListProps> = ({ repositoryFullName }) => {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${repositoryFullName}/issues?per_page=10&state=all`
        );
        setIssues(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (repositoryFullName) {
      fetchIssues();
    }
  }, [repositoryFullName]);

  return (
    <div>
      <h2>イシュー一覧</h2>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>{issue.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default IssueList;
