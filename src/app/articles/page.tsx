import  Link from "next/link";
import { PostDetailResponse } from "@/Type";




export default async function  PostDetail({params}:{params:{id:string}}) {
  const { id } = params;

        const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`,
        {cache:"no-store"}
       ); 

        if (!res.ok) {
         return (
           <div>
             <h2>記事が見つかりませんでした</h2>
             <Link href="/articles">記事一覧に戻る</Link>
           </div>
         );
        }

        const data:PostDetailResponse = await res.json() ;
        const post=data.post;

 

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{new Date(post.createdAt).toLocaleDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content}} />
      <br />
      <Link href="/articles">記事一覧に戻る</Link>
    </div>
  );
}