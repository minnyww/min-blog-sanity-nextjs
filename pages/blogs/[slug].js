import PageLayout from "components/PageLayout";
// import BlogHeader from "components/BlogHeader";
// import ErrorPage from "next/error";
import { getBlogBySlug, getAllBlogs } from "lib/api";
// import { Row, Col } from "react-bootstrap";
import { urlFor } from "lib/api";
// import moment from "moment";
import { useRouter } from "next/router";

import BlogContent from "@sanity/block-content-to-react";
import HighlightCode from "components/HighlightCode";
import { Alert } from "react-bootstrap";
// import PreviewAlert from "components/PreviewAlert";

const serializers = {
   types: {
      code: ({ node: { language, code, filename } }) => (
         <HighlightCode language={language}>
            {code}
            <div className="code-filename">{filename}</div>
         </HighlightCode>
      ),
      image: ({ node: { asset, alt, position = "center" } }) => {
         //  console.log("urlFor : ", urlFor(asset).url());
         let style = {};

         if (position === "left") {
            style.float = position;
            style.marginRight = "30px";
         }
         if (position === "right") {
            style.float = position;
            style.marginLeft = "30px";
         }
         if (position === "center") {
            style.textAlign = "center";
         }
         return (
            <div style={{ ...style }}>
               {/* // <div className={`blog-image blog-image-${position}`}> */}
               <img src={urlFor(asset).height(300).fit("max").url()} />
               <div className="image-alt">{alt}</div>
            </div>
         );
      },
   },
};

const BlogDetail = ({ blog, preview }) => {
   console.log("blog : ", blog);
   const { query } = useRouter();
   return (
      <PageLayout>
         {preview && (
            <Alert>
               This is preview mode
               <Alert.Link href="/api/exit-preview">
                  Leave preview mode
               </Alert.Link>
            </Alert>
         )}
         <h1>Hello Detail Page - {blog?.title}</h1>
         <img
            src={urlFor(blog.coverImage).height(600).fit("max").url()}
            // className="rounded-circle mr-3"
            height="150px"
            width="100%"
            alt="avatar"
         />
         <BlogContent blocks={blog.content} serializers={serializers} />
      </PageLayout>
   );
};

// export async function getStaticProps({ params }) {
//    //    console.log("params : ::", params);
//    const blog = await getBlogBySlug(params.slug);
//    return {
//       props: { blog },
//       revalidate: 1,
//    };
// }

export async function getStaticProps({ params, preview = false, previewData }) {
   const blog = await getBlogBySlug(params.slug, preview);
   return {
      props: { blog, preview },
      revalidate: 1,
   };
}

// TODO: Introduce fallback
export async function getStaticPaths() {
   const blogs = await getAllBlogs({});
   const paths = blogs?.map((blog) => ({ params: { slug: blog.slug } }));
   return {
      paths,
      fallback: true,
   };
}
export default BlogDetail;
