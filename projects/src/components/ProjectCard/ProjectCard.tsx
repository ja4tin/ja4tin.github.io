import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { GitHubRepoInfo, Link, Project } from '../../types/project';
import './ProjectCard.css';

const formatCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const GitHubStats = memo(
  ({
    repoInfo,
    loading,
  }: {
    repoInfo: GitHubRepoInfo | null;
    loading: boolean;
  }) => {
    return (
      <div className={`github-stats animate`}>
        {loading ? (
          <div className="loading-stats">
            <i className="fas fa-spinner fa-spin"></i>
            <span>Loading repository info...</span>
          </div>
        ) : repoInfo ? (
          <div className="repo-meta">
            {repoInfo.language && (
              <div className="meta-item cursor-target">
                <span>{repoInfo.language}</span>
              </div>
            )}
            <div className="meta-item cursor-target">
              <span>Created {formatDate(repoInfo.createdAt)}</span>
            </div>
          </div>
        ) : (
          <div className="no-repo-info">
            <i className="fas fa-info-circle"></i>
            <span>GitHub repository info unavailable</span>
          </div>
        )}
      </div>
    );
  },
);

GitHubStats.displayName = 'GitHubStats';

const ProjectLinks = memo(
  ({
    links,
    repoInfo,
    loading,
  }: {
    links: Link[];
    repoInfo: GitHubRepoInfo | null;
    loading: boolean;
  }) => (
    <div className={`project-links ${loading ? 'animate' : ''}`}>
      {links.map((link: Link, index: number) => (
        <a
          key={index}
          href={link.url}
          className={`project-link cursor-target ${link.type === 'demo' ? '' : 'secondary'}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i
            className={
              link.type === 'demo'
                ? 'fas fa-external-link-alt'
                : 'fab fa-github'
            }
          ></i>
          {link.text}
          {repoInfo && link.type === 'code' && (
            <span className="star-count">
              <i className="fas fa-star"></i>
              {formatCount(repoInfo.stars)}
            </span>
          )}
        </a>
      ))}
    </div>
  ),
);

ProjectLinks.displayName = 'ProjectLinks';

const ProjectCard = memo(({ project }: { project: Project }) => {
  const isReverse = project.layout === 'reverse';
  const [repoInfo, setRepoInfo] = useState<GitHubRepoInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const githubRepo = project.links.find(
    (link) => link.type === 'code' && link.githubRepo,
  )?.githubRepo;

  useEffect(() => {
    (async () => {
      if (!githubRepo) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(
          `https://api.github.com/repos/${githubRepo}`,
          {
            headers: {
              Accept: 'application/json',
            },
          },
        );

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        setRepoInfo({
          stars: data.stargazers_count || 0,
          forks: data.forks_count || 0,
          issues: data.open_issues_count || 0,
          language: data.language || '',
          license: data.license?.name || null,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        });
      } catch (error) {
        console.error('Failed to fetch GitHub repo info:', error);
        setRepoInfo({
          stars: 0,
          forks: 0,
          issues: 0,
          language: '',
          license: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const techTags = useMemo(
    () => (
      <div className={`project-tech ${loading ? 'animate' : ''}`}>
        {project.tech.map((tech: string, index: number) => (
          <span key={index} className="tech-tag cursor-target">
            {tech}
          </span>
        ))}
      </div>
    ),
    [project.tech, loading],
  );

  const InfoSection = useCallback(
    () => (
      <div className="project-info">
        <h2 className={`cursor-target ${loading ? 'animate' : ''}`}>
          {project.title}
        </h2>
        <p className={`project-description ${loading ? 'animate' : ''}`}>
          {project.description}
        </p>
        {techTags}

        {githubRepo && <GitHubStats repoInfo={repoInfo} loading={loading} />}

        <ProjectLinks
          links={project.links}
          repoInfo={repoInfo}
          loading={loading}
        />
      </div>
    ),
    [
      project.title,
      project.description,
      techTags,
      repoInfo,
      loading,
      project.links,
    ],
  );

  const PreviewSection = useCallback(
    () => (
      <div
        className={`project-preview cursor-target ${loading ? 'animate' : ''}`}
      >
        <img
          className="project-image"
          src={project.preview}
          alt={project.title}
          loading="lazy"
        />
      </div>
    ),
    [project.preview, project.title],
  );

  return (
    <div className="project-card">
      {isReverse ? (
        <>
          <PreviewSection />
          <InfoSection />
        </>
      ) : (
        <>
          <InfoSection />
          <PreviewSection />
        </>
      )}
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
