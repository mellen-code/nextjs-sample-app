import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import FirstPost from './posts/first-post';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>Welcome to my Next.js tribute to Prince!</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        <p> My first 
          <a href='./posts/first-post' > blog post.</a>
        </p>
      </section>
    </Layout>
  )
}