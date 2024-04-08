import { posts } from "#site/content"
export const getBlogByCategory = (category:string) => {
    return posts.filter(post => post.category === category)
}

