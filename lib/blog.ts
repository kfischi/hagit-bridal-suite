import fs from 'fs'
import path from 'path'

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category?: string
  content: string   // HTML
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
}

const DIR = path.join(process.cwd(), 'content', 'blog')

export function getDynamicPosts(): BlogPost[] {
  try {
    if (!fs.existsSync(DIR)) return []
    return fs
      .readdirSync(DIR)
      .filter(f => f.endsWith('.json'))
      .map(f => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')) as BlogPost)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch {
    return []
  }
}

export function getDynamicPost(slug: string): BlogPost | null {
  try {
    const file = path.join(DIR, `${slug}.json`)
    if (!fs.existsSync(file)) return null
    return JSON.parse(fs.readFileSync(file, 'utf8')) as BlogPost
  } catch {
    return null
  }
}
