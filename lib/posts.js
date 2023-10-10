// getSortedPostsData is a utility function for parsing data from the file system, created in the top-level 'posts' directory. For getStaticProps(), to read markdown data from the file system -- Static Generation with Data.


import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

// fetch data from the file system:
export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}


// fetch data from an external API endpoint:
// export async function getAllPostIds() {
//   const res = await fetch('..');
//   const posts = await res.json();
//    return posts.map((post) => {
//         return {
//           params: {
//             id: post.id,
//           },
//         };
//      });
// }


// query database directly:
// import someDatabaseSDK from 'someDatabaseSDK'

// const databaseClient = someDatabaseSDK.createClient(...)

// export async function getSortedPostsData() {
//   // Instead of the file system,
//   // fetch post data from a database
//   return databaseClient.query('SELECT posts...')
// }


// return the list of file names (excluding .md) in the 'posts' directory:
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}
// *the list of file names MUST be an array of objects with params key and contain an object with the id key. Otherwise getStaticPaths will FAIL*


// return the post data based on id:
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // use remark to convert markdown to HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHTML = processedContent.toString();

  // combine the data with the id
  return {
    id,
    contentHTML,
    ...matterResult.data,
  };
}