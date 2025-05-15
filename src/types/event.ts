export interface Participant {
  userId: string
  displayName: string
  avatarUrl: string | null
  isHost: boolean
  role: string
  joinedAt: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  address?: string
  maxPlayers: number
  currentPlayers: number
  isPublic: boolean
  image: string | null
  createdAt: string
  createdById: string
  participants: Participant[]
}

export interface EventFilters {
  searchTerm?: string
  location?: string
  dateRange?: string | null
  isPublic?: boolean | null
  hasAvailableSpots?: boolean
}