import { IRepository } from '@/lib/models/IRepository';
import { useRouter } from 'next/navigation';
import classes from './repository-card.module.scss';

interface RepositoryItemProps {
    repo: IRepository;
}

export default function RepositoryCard({ repo }: RepositoryItemProps) {
    const router = useRouter();

    const handleRepositoryClick = (repo: IRepository) => {
        const repoData = encodeURIComponent(JSON.stringify(repo));
        router.push(`/detail/${repo.owner.login}/${repo.name}?data=${repoData}`);
    };

    return (
        <div
            key={repo.id}
            className={classes['repository-card']}
            onClick={() => handleRepositoryClick(repo)}
            role="listitem"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleRepositoryClick(repo);
              }
            }}
          >
            <div className={classes['repository-header']}>
              <img
                src={repo.owner.avatar_url}
                alt={`${repo.owner.login}'s avatar`}
                className={classes['avatar']}
                width="40"
                height="40"
              />
              <div className="repository-info">
                <h3>
                  <a
                    href={`https://github.com/${repo.owner.login}/${repo.name}`}
                    className={classes['repository-link']}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`View ${repo.name} on GitHub (opens in new tab)`}
                  >
                    {repo.name}
                  </a>
                </h3>
                <a
                  href={`https://github.com/${repo.owner.login}`}
                  className={classes['owner-link']}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`View ${repo.owner.login}'s profile on GitHub (opens in new tab)`}
                >
                  <span className={classes['owner']}>{repo.owner.login}</span>
                </a>
              </div>
              <div className={classes['stars']} aria-label={`${repo.stargazers_count} stars`}>
                <span className={classes['star-icon']} aria-hidden="true">⭐</span>
                {repo.stargazers_count}
              </div>
            </div>
            <p className={classes['description']}>{repo.description || 'No description available'}</p>
            <div className={classes['repository-stats']}>
              {repo.language && (
                <div className={classes['language']}>
                  <span className={classes['language-dot']} aria-hidden="true"></span>
                  <span aria-label={`Primary programming language: ${repo.language}`}>
                    {repo.language}
                  </span>
                </div>
              )}
            </div>
          </div>
    );
}