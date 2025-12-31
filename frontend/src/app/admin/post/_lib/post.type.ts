export type QueryParams = {
    page: number,
    limit: number
}

export type Post = {
    id: number,
    slug: string,
    title: string,
    category: {
        id: number,
        name: string
    }
}

export type MetaData = {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export type GetPostsResponse = {
    data: Post[],
    meta: MetaData
}