export interface NavItem {
  title: string
  href: string
  disabled?: boolean
  icon?: string
}

export interface User {
  id: string
  name: string
  email: string
  image?: string
}

export interface Page {
  id: string
  title: string
  slug: string
  description?: string
  isPublished: boolean
  sections: Section[]
  createdAt?: Date
  status?: string
}

interface Section {
  id: string
  component: string
  data: Record<string, any>
}

export interface Service {
  challenges: never[]
  techImperatives: never[]
  businessNeeds: never[]
  scamProtection: never[]
  serviceCards: never[]
  advantageCards: never[]
  standardCards: never[]
  ctaCards: never[]
  id: string
  title: string
  slug: string
  description?: string
  image?: string
  content?: string
  createdAt?: string
  updatedAt?: string
}

export interface Industry {
  id: string
  title: string
  slug: string
  description?: string
  image?: string
  content?: string
  createdAt?: string
  updatedAt?: string
}

export interface Component {
  id: string
  name: string
  type: string
  description?: string
  schema: Record<string, any>
  createdAt?: Date
}

export interface Technology {
  id: string
  title: string
  slug: string
  description?: string
  image?: string
  content?: string
  createdAt?: string
  updatedAt?: string
}
