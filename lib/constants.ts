export const categories = [
    "help",
    "news",
    "updates",
    "announcements",
    "general"
] as const
export type categories = typeof categories[number]