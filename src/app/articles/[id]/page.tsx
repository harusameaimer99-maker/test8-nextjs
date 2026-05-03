'use client'

import {useState,useEffect} from 'react';
import  Link from "next/link";
import {MicroCmsPost} from "@/MicroCmsPost";




export default  function  PostDetail({params}:{params:{id:string}}) {
  const { id } = params;
  const [post,setPost]=useState<MicroCmsPost|null>(null);
  const [error,setError]=useState(true);
  const [loading,setLoading]=useState(true);
  
  useEffect(()=>{
    const fetcher=async()=>{
        setLoading(true)
        const res = await fetch(
          'https://2gzszlwapo.microcms.io/api/v1/posts/${id}',
          {
            headers:{
              'X-MICROCMS-API-KEY': 'fk1MtmkzB6i8i8PbClk7joBwSb5BdFVHOjQ9';
            };
          };
        )

        if (!res.ok) {
          setError(true);
         }else{
　　　　　　const data = await res.json() ;
           setPost(data);   
         }      
         }catch(e){
         setError(true);
         }finally{
         setLoading(false);
       }
     };

    fetcher();
  },[id])
 



  
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