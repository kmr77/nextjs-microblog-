import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";


const postsDirectrory = path.join(process.cwd(), "posts");

//mdファイルデータを取り出す
export function getPostsData() {

    const fileNames = fs.readdirSync(postsDirectrory);
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, ""); //ファイル名（id）
        //マークダウンファイルを文字列として読み取る
        const fullPath = path.join(postsDirectrory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
    
        const matterResult = matter(fileContents);
    
        //idとデータを返す
        return {
            id,
            ...matterResult.data,
        };
    });
    return allPostsData;
}

//getStaticPathでreturnで使うpathを取得する
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectrory);
    return fileNames.map((fileName) => {
        return {
             params: {
                 id: fileName.replace(/\.md$/, ""),
             }
        }
    })
}

//idに基づいてブログ投稿データを返す
export async function getPostData(id) {
    const fullPath = path.join(postsDirectrory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    
    const matterResult = matter(fileContents);
    const blogContent = await remark().use(html).process(matterResult.content);
    const blogContentHtml = blogContent.toString();

    return {
        id,
        blogContentHtml,
        ...matterResult.data,
    };
}