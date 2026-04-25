import { SubmissionResponse } from "@/Type";
import Link from "next/link";

export default async function ArticlesPage() {
  const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts", {
    cache: "no-store", 
  });
  const data: SubmissionResponse = await res.json();
  const posts = data.posts;

  return (
    <div style={{ padding: "40px" }}>
      <h1 >
        記事一覧
      </h1>
      <div >
        {posts.map((post) => (
          <div key={post.id}>
            <Link href={`/articles/${post.id}`}>
              {post.title}
            </Link>
            <p >
              投稿日: {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}