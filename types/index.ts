export interface ContactSubmission {
  id: string
  name: string
  email: string
  website?: string
  service: string
  message: string
  status: 'new' | 'read' | 'replied' | 'archived'
  created_at: string
}

export interface Client {
  id: string
  name: string
  email: string
  company?: string
  phone?: string
  website?: string
  status: 'active' | 'completed' | 'paused' | 'prospect'
  notes?: string
  created_at: string
}

export interface Invoice {
  id: string
  client_id: string
  invoice_number: string
  amount: number
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  due_date: string
  issued_date: string
  description?: string
  line_items: LineItem[]
  created_at: string
  client?: Client
}

export interface LineItem {
  description: string
  quantity: number
  unit_price: number
  total: number
}

export interface Project {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  image_url?: string
  client_name?: string
  featured: boolean
  published: boolean
  sort_order: number
  created_at: string
}

export interface Testimonial {
  id: string
  author_name: string
  author_role: string
  company: string
  content: string
  avatar_url?: string
  featured: boolean
  published: boolean
  sort_order: number
  created_at: string
}
