import { Event } from '@/types/event'

// Random placeholder images from Pexels that fit the theme
const eventImages = [
  'https://images.pexels.com/photos/5480855/pexels-photo-5480855.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/6200049/pexels-photo-6200049.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1276314/pexels-photo-1276314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1309766/pexels-photo-1309766.jpeg?auto=compress&cs=tinysrgb&w=800'
]

// Create some example users for participants
const exampleUsers = [
  {
    id: '1',
    displayName: 'Alex Morgan',
    avatarUrl: null
  },
  {
    id: '2',
    displayName: 'Sam Wilson',
    avatarUrl: null
  },
  {
    id: '3',
    displayName: 'Jamie Lewis',
    avatarUrl: null
  },
  {
    id: '4',
    displayName: 'Taylor Kim',
    avatarUrl: null
  },
  {
    id: '5',
    displayName: 'Jordan Smith',
    avatarUrl: null
  }
]

// Generate dates ranging from today to a month from now
function getRandomDate() {
  const today = new Date()
  const futureDate = new Date()
  futureDate.setDate(today.getDate() + Math.floor(Math.random() * 30))
  
  // Set random hour between 12pm and 10pm
  futureDate.setHours(12 + Math.floor(Math.random() * 10), 0, 0, 0)
  
  return futureDate.toISOString()
}

// Locations
const locations = [
  'Game Haven, San Francisco',
  'Mystic Board Game Café, New York',
  'The Dice Tower, Chicago',
  'Storyteller\'s Pub, Seattle',
  'Clockwork Games, Boston',
  'Townsfolk Gathering, Portland',
  'Mystery Manor, Austin',
  'The Grimoire, Denver'
]

// Create mock events
export const events: Event[] = [
  {
    id: '1',
    title: 'Beginner Friendly Blood on the Clocktower',
    description: 'A special session for newcomers to learn the game. We\'ll play Trouble Brewing and explain all the roles thoroughly. Experienced players are welcome to help guide new players through their first game.',
    date: getRandomDate(),
    location: locations[0],
    maxPlayers: 15,
    currentPlayers: 8,
    isPublic: true,
    image: eventImages[0],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdById: exampleUsers[0].id,
    participants: [
      {
        userId: exampleUsers[0].id,
        displayName: exampleUsers[0].displayName,
        avatarUrl: exampleUsers[0].avatarUrl,
        isHost: true,
        role: 'Storyteller',
        joinedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      ...exampleUsers.slice(1, 8).map(user => ({
        userId: user.id,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        isHost: false,
        role: 'Player',
        joinedAt: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).toISOString()
      }))
    ]
  },
  {
    id: '2',
    title: 'Sects & Violets Script',
    description: 'We\'ll be playing the Sects & Violets script, which introduces more challenging roles and unique abilities. This session is recommended for players who have experience with the base game.',
    date: getRandomDate(),
    location: locations[1],
    maxPlayers: 12,
    currentPlayers: 12,
    isPublic: true,
    image: eventImages[1],
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    createdById: exampleUsers[1].id,
    participants: [
      {
        userId: exampleUsers[1].id,
        displayName: exampleUsers[1].displayName,
        avatarUrl: exampleUsers[1].avatarUrl,
        isHost: true,
        role: 'Storyteller',
        joinedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
      },
      ...exampleUsers.filter(user => user.id !== exampleUsers[1].id).map(user => ({
        userId: user.id,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        isHost: false,
        role: 'Player',
        joinedAt: new Date(Date.now() - Math.floor(Math.random() * 14) * 24 * 60 * 60 * 1000).toISOString()
      })),
      ...Array(7).fill(null).map((_, i) => ({
        userId: `extra-${i}`,
        displayName: `Player ${i + 6}`,
        avatarUrl: null,
        isHost: false,
        role: 'Player',
        joinedAt: new Date(Date.now() - Math.floor(Math.random() * 14) * 24 * 60 * 60 * 1000).toISOString()
      }))
    ]
  },
  {
    id: '3',
    title: 'Bad Moon Rising Halloween Special',
    description: 'A spooky Halloween-themed game featuring the Bad Moon Rising script. Costumes encouraged! We\'ll have themed snacks and drinks to enhance the atmosphere.',
    date: getRandomDate(),
    location: locations[2],
    maxPlayers: 15,
    currentPlayers: 6,
    isPublic: true,
    image: eventImages[2],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    createdById: exampleUsers[2].id,
    participants: [
      {
        userId: exampleUsers[2].id,
        displayName: exampleUsers[2].displayName,
        avatarUrl: exampleUsers[2].avatarUrl,
        isHost: true,
        role: 'Storyteller',
        joinedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      ...exampleUsers.slice(0, 2).map(user => ({
        userId: user.id,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        isHost: false,
        role: 'Player',
        joinedAt: new Date(Date.now() - Math.floor(Math.random() * 3) * 24 * 60 * 60 * 1000).toISOString()
      })),
      ...exampleUsers.slice(3, 6).map(user => ({
        userId: user.id,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        isHost: false,
        role: 'Player',
        joinedAt: new Date(Date.now() - Math.floor(Math.random() * 3) * 24 * 60 * 60 * 1000).toISOString()
      }))
    ]
  },
  {
    id: '4',
    title: 'Tournament Practice: Trouble Brewing',
    description: 'Preparation session for the upcoming regional BOTC tournament. We\'ll focus on strategic play and deep analysis of the Trouble Brewing script.',
    date: getRandomDate(),
    location: locations[3],
    maxPlayers: 10,
    currentPlayers: 4,
    isPublic: false,
    image: eventImages[3],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdById: exampleUsers[3].id,
    participants: [
      {
        userId: exampleUsers[3].id,
        displayName: exampleUsers[3].displayName,
        avatarUrl: exampleUsers[3].avatarUrl,
        isHost: true,
        role: 'Storyteller',
        joinedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      ...exampleUsers.slice(1, 4).map(user => ({
        userId: user.id,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        isHost: false,
        role: 'Player',
        joinedAt: new Date(Date.now() - Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000).toISOString()
      }))
    ]
  },
  {
    id: '5',
    title: 'Custom Script Night',
    description: 'Playing with a custom-designed script featuring a mix of roles from different editions and some homebrewed characters. Perfect for experienced players looking for a fresh challenge.',
    date: getRandomDate(),
    location: locations[4],
    maxPlayers: 12,
    currentPlayers: 9,
    isPublic: true,
    image: eventImages[4],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    createdById: exampleUsers[4].id,
    participants: [
      {
        userId: exampleUsers[4].id,
        displayName: exampleUsers[4].displayName,
        avatarUrl: exampleUsers[4].avatarUrl,
        isHost: true,
        role: 'Storyteller',
        joinedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
      },
      ...exampleUsers.slice(0, 4).map(user => ({
        userId: user.id,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        isHost: false,
        role: 'Player',
        joinedAt: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString()
      })),
      ...Array(4).fill(null).map((_, i) => ({
        userId: `guest-${i}`,
        displayName: `Guest ${i + 1}`,
        avatarUrl: null,
        isHost: false,
        role: 'Player',
        joinedAt: new Date(Date.now() - Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000).toISOString()
      }))
    ]
  },
  {
    id: '6',
    title: 'Ladies Night: Trouble Brewing',
    description: 'A special event for women and non-binary players to enjoy Blood on the Clocktower in a welcoming environment. All experience levels welcome!',
    date: getRandomDate(),
    location: locations[5],
    maxPlayers: 15,
    currentPlayers: 7,
    isPublic: true,
    image: eventImages[5],
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    createdById: exampleUsers[0].id,
    participants: [
      {
        userId: exampleUsers[0].id,
        displayName: exampleUsers[0].displayName,
        avatarUrl: exampleUsers[0].avatarUrl,
        isHost: true,
        role: 'Storyteller',
        joinedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
      },
      ...Array(6).fill(null).map((_, i) => ({
        userId: `ladies-${i}`,
        displayName: `Participant ${i + 1}`,
        avatarUrl: null,
        isHost: false,
        role: 'Player',
        joinedAt: new Date(Date.now() - Math.floor(Math.random() * 8) * 24 * 60 * 60 * 1000).toISOString()
      }))
    ]
  }
]