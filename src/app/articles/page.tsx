'use client';

import { useState, useEffect } from 'react'
import  Link  from  "next/link";
import {MicroCmsPost} from '@/MicroCmsPost';
import {Submission} from '@Type'






export default function Articles() {
  const [posts, setPosts] = useState<MicroCmsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,setError]=useState(false);




  useEffect(() => {
    const fetcher = async () => {
        const res = await fetch('<https://2gzszlwapo.microcms.io/api/v1/posts>', {
        headers: {
           'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY || ''
        }
    })
       
   if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data:Submission = await res.json(); 
        setPosts(data.contents);
      } catch (e) {
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