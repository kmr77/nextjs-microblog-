import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import Layout, { siteTitle } from '../components/Layout';
import utilStyle from "../styles/utils.module.css";
import { getPostsData } from '../lib/posts';


//SSGの場合 一度だけ表示したい場合に使う記述
export async function getStaticProps(){
  const allPostsData = getPostsData();// id title date thumb
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({allPostsData}) {
  return (
   <Layout home>
     <Head>
       <title>{siteTitle}</title>
     </Head>
     <section className={utilStyle.headingMd}>
       <p>ここにプロフィールの説明です。</p>
     </section>
     <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
       <h2>📝エンジニアのブログ</h2>
       <div className={styles.grid}>
       {allPostsData.map(({id, title, date, thumbnail}) => (
          <article key={id}>
            <Link href={`/posts/${id}`}>
              <img src={`${thumbnail}`} className={styles.thumbnailImage} />
            </Link>
            <Link href={`/posts/${id}`}>
              <a className={utilStyle.boldText}>{title}</a>
            </Link>
            <br />
            <small className={utilStyle.lightText}>{date}</small>
          </article>
       ))}
        </div>
     </section>
    </Layout>
  );
}
