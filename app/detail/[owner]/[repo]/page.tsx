'use client';


import React, { useEffect, useState, useCallback } from 'react';
import { IGitHubRepositoryDetails } from '@/lib/models/IRepository';
import classes from './detail.module.scss';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/loading-spinner/loadingSpinner';

export default function RepositoryDetails () {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [repository, setRepository] = useState<IGitHubRepositoryDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchRepository() {
            try {
                const repoData = searchParams.get('data');
                if (repoData) {
                    try {
                        const decodedData = JSON.parse(decodeURIComponent(repoData));
                        setRepository(decodedData);
                        setIsLoading(false);
                        return;
                    } catch (e) {
                        console.error('Error parsing repository data from URL:', e);
                    }
                }

                // If no data in URL or parsing failed, fetch from API
                const response = await fetch(
                    `https://api.github.com/repos/${params.owner}/${params.repo}`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch repository');
                }
                const data = await response.json();
                setRepository(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        }

        fetchRepository();
    }, [params.owner, params.repo, searchParams]);

    function handleBackButtonClick() {
        router.back();
    }

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  if (error) {
    return (
      <div className={classes['error-state']}>
        <div className={classes['error-icon']}>⚠️</div>
        <p>{error}</p>
        <button onClick={handleBackButtonClick} className={classes['back-button']}>
          Go Back
        </button>
      </div>
    );
  }

  if (!repository) {
    return <div>Repository not found</div>;
  }

  return (
    <div className="card p-4 repository-details">
        <button onClick={handleBackButtonClick} className={classes['back-button']}>
        ← Back to Search
      </button>

      <div className={classes['repository-header']}>
        <img 
          src={repository.owner.avatar_url} 
          alt={`${repository.owner.login}'s avatar`} 
          className={classes['avatar']} 
        />
        <div className={classes['repository-info']}>
          <h1>
            <a 
              href={repository.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={classes['repository-link']}
            >
              {repository.full_name}
            </a>
          </h1>
          <p className={classes['owner']}>
            by{' '}
            <a 
              href={`https://github.com/${repository.owner.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className={classes['owner-link']}
            >
              {repository.owner.login}
            </a>
          </p>
        </div>
      </div>

      {repository.description && (
        <div className={classes['description-section']}>
          <h2>Description</h2>
          <p>{repository.description}</p>
        </div>
      )}

      <div className={classes['stats-grid']}>
        <div className={classes['stat-card']}>
          <span className={classes['stat-value']}>{repository.stargazers_count.toLocaleString()}</span>
          <span className={classes['stat-label']}>Stars</span>
        </div>
        <div className={classes['stat-card']}>
          <span className={classes['stat-value']}>{repository.forks_count.toLocaleString()}</span>
          <span className={classes['stat-label']}>Forks</span>
        </div>
        <div className={classes['stat-card']}>
          <span className={classes['stat-value']}>{repository.open_issues_count.toLocaleString()}</span>
          <span className={classes['stat-label']}>Open Issues</span>
        </div>
        <div className={classes['stat-card']}>
          <span className={classes['stat-value']}>{repository.watchers_count.toLocaleString()}</span>
          <span className={classes['stat-label']}>Watchers</span>
        </div>
      </div>

      <div className={classes['details-grid']}>
        <div className={classes['detail-section']}>
          <h2>Language</h2>
          {repository.language ? (
            <span className={classes['language']}>
              <span className={classes['language-dot']}></span>
              {repository.language}
            </span>
          ) : (
            <span className={classes['no-language']}>Not specified</span>
          )}
        </div>

        <div className={classes['detail-section']}>
          <h2>License</h2>
          {repository.license ? (
            <a 
              href={repository.license.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={classes['license-link']}
            >
              {repository.license.name}
            </a>
          ) : (
            <span className={classes['no-license']}>No license specified</span>
          )}
        </div>

        <div className={classes['detail-section']}>
          <h2>Created</h2>
          <span>{new Date(repository.created_at).toLocaleDateString()}</span>
        </div>

        <div className={classes['detail-section']}>
          <h2>Last Updated</h2>
          <span>{new Date(repository.updated_at).toLocaleDateString()}</span>
        </div>
      </div>

      {repository.homepage && (
        <div className={classes['homepage-section']}>
          <h2>Homepage</h2>
          <a 
            href={repository.homepage} 
            target="_blank" 
            rel="noopener noreferrer"
            className={classes['homepage-link']}
          >
            {repository.homepage}
          </a>
        </div>
      )}

      {repository.topics && repository.topics.length > 0 && (
        <div className={classes['topics-section']}>
          <h2>Topics</h2>
          <div className={classes['topics-list']}>
            {repository.topics.map((topic) => (
              <span key={topic} className={classes['topic-tag']}>
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};