'use client';

type PostDetailPageProps = {
  params: {
    postId: number
  }
}

export default function PostReviewPage({params}: PostDetailPageProps) {
  return (
    <div>
      <div>This is post review page</div>
      <div>{`PostId = ${params.postId}`}</div>
    </div>
  );
}