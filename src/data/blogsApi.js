import { auth } from '../config/firebase'
import { API_BASE_URL } from './api'

const API_URL = `${API_BASE_URL}/api/blogs`

function formatBlog(blog) {
    const words = blog.content?.trim().split(/\s+/).filter(Boolean).length || 0
    const createdDate = blog.createdAt ? new Date(blog.createdAt) : null

    return {
        ...blog,
        id: blog._id || blog.id,
        author: blog.author || 'Anonymous',
        date: createdDate && !Number.isNaN(createdDate.getTime())
            ? createdDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
            : 'Recently',
        readTime: `${Math.max(1, Math.ceil(words / 200))} min read`,
        gradient: 'linear-gradient(135deg, #123b36 0%, #18776d 52%, #80b8a2 100%)',
    }
}

export async function fetchBlogs() {
    const response = await fetch(API_URL)
    const payload = await response.json().catch(() => null)

    if (!response.ok) {
        throw new Error(payload?.error || 'Unable to load blog posts.')
    }

    return payload.map(formatBlog)
}

export async function createBlog(blog) {
    const user = auth.currentUser
    if (!user) {
        throw new Error('Sign in with an Author account to publish a blog.')
    }

    const token = await user.getIdToken()
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blog),
    })
    const payload = await response.json().catch(() => null)

    if (!response.ok) {
        throw new Error(payload?.error || 'Unable to publish this blog post.')
    }

    return formatBlog(payload)
}
