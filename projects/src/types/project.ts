interface Position {
  x: number;
  y: number;
  z: number;
  rotate?: number;
  rotateY?: number;
}

export interface Link {
  type: string;
  url: string;
  text: string;
  githubRepo?: string; // 添加GitHub仓库信息用于获取star数
}

export interface GitHubRepoInfo {
  stars: number;
  forks: number;
  issues: number;
  language: string;
  license: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  title: string;
  preview: string;
  position: Position;
  description: string;
  tech: string[];
  links: Link[];
  layout: string;
}
