'use client';

import { useState, useEffect } from 'react'
import  Link  from  "next/link";
import {Submission,SubmissionResponse} from '@/Type';




export default function Articles() {
  const [posts, setPosts] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,setError]=useState(false);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts");
        
        if(!res.ok){
          setError(true);
        }else{
        　const data:SubmissionResponse = await res.json() ;
        　setPosts(data.posts);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetcher();
  }, []);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>記事が見つかりませんでした</p>
  

  return (
    <div>
      <h1>記事一覧</h1>
      <div className={styles['post-list']}>
        {posts.map((post) => (
          <div key={post.id}>
            <Link href={`/articles/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
            <p>{new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}