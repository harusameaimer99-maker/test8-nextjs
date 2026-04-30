'use client'

import {useState,useEffect} from 'react';
import  Link from "next/link";
import {submission,PostDetailResponse } from "@/Type";




export default  function  PostDetail({params}:{params:{id:string}}) {
  const { id } = params;
  const [post,setPost]=useState<Submission|null>(null);
  const [error,setError]=useState(true);
  const [loading,setLoading]=useState(true);
  
  useEffect(()=>{
    const fetcher=async()=>{
      try{
        const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`,
        ); 

        if (!res.ok) {
          setError(true);
         }else{
　　　　　　const data:PostDetailResponse = await res.json() ;
           setPost(data.post);   
         }      
      }catch(e){
        setError(true);
      }finally{
        setLoading(false);
      }
    };

    fetcher();
  },[id]);
 



  
  if(loading)return <p>読み込み中...</p>

  if(error||!post){
    return(
      <div>
        <h2>記事が見つかりませんでした</h2>
        <Link href="/articles">記事一覧に戻る</Link>
      </div>
    );
  }




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