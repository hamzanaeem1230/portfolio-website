/**
 * GitHub API Service
 * Fetches user and repository data from GitHub's public API
 * No authentication required for public data
 */

const GITHUB_API = 'https://api.github.com'
const GITHUB_USERNAME = 'hamzanaeem1230'

export interface GithubRepository {
  name: string
  description: string | null
  url: string
  stars: number
  forks: number
  language: string | null
  updated_at: string
}

export interface GithubUser {
  login: string
  name: string | null
  bio: string | null
  followers: number
  following: number
  public_repos: number
  avatar_url: string
}

export interface GithubStats {
  user: GithubUser | null
  repos: GithubRepository[]
  error: string | null
}

/**
 * Fetch user profile data from GitHub
 */
async function fetchUserProfile(username: string): Promise<GithubUser | null> {
  try {
    const res = await fetch(`${GITHUB_API}/users/${username}`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' },
      next: { revalidate: 3600 }, // ISR: 1 hour
    })

    if (!res.ok) {
      console.warn(`GitHub user fetch failed: ${res.status}`)
      return null
    }

    return await res.json()
  } catch (error) {
    console.warn('GitHub user fetch error:', error)
    return null
  }
}

/**
 * Fetch user repositories sorted by stars
 */
async function fetchUserRepositories(
  username: string,
  limit: number = 8
): Promise<GithubRepository[]> {
  try {
    const res = await fetch(
      `${GITHUB_API}/users/${username}/repos?sort=stars&per_page=${limit}&type=owner`,
      {
        headers: { 'Accept': 'application/vnd.github.v3+json' },
        next: { revalidate: 3600 }, // ISR: 1 hour
      }
    )

    if (!res.ok) {
      console.warn(`GitHub repos fetch failed: ${res.status}`)
      return []
    }

    const data = await res.json()
    return data.map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      updated_at: repo.updated_at,
    }))
  } catch (error) {
    console.warn('GitHub repos fetch error:', error)
    return []
  }
}

/**
 * Get complete GitHub stats including user profile and repos
 * Gracefully falls back to null on errors
 */
export async function getGithubStats(username: string = GITHUB_USERNAME): Promise<GithubStats> {
  const [user, repos] = await Promise.all([
    fetchUserProfile(username),
    fetchUserRepositories(username, 8),
  ])

  return {
    user,
    repos,
    error: !user && repos.length === 0 ? 'Failed to fetch GitHub data' : null,
  }
}

/**
 * Calculate total contributions (approximate from user public repos and followers)
 * This is a simplified calculation
 */
export function estimateContributions(user: GithubUser | null): string {
  if (!user) return '0'
  // Very rough estimate: repos * 50 + followers as a proxy
  const estimate = user.public_repos * 50 + (user.followers || 0)
  return estimate > 1000 ? `${Math.floor(estimate / 1000)}k+` : estimate.toString()
}
