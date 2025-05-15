export interface User {
  id: string
  email: string
  displayName: string
  avatarUrl: string | null
  createdAt: string
}

export interface UserProfile extends User {
  bio?: string
  location?: string
  preferences?: {
    favoriteRoles?: string[]
    experienceLevel?: 'beginner' | 'intermediate' | 'expert'
    notifications?: boolean
  }
}