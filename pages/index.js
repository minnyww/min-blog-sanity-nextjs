import { Container, Row, Col, Button } from "react-bootstrap";

import BlogNavbar from "components/Navbar";
import { getAllBlogs } from "lib/api";
import AuthorIntro from "components/AuthorIntro";
import CardItem from "components/CardItem";
import useSWR from "swr";
import { useState } from "react";
import { Alert } from "react-bootstrap";

const fetcher = (url) => fetch(url).then((res) => res.json());
export default function Home({ blogs: initialData, preview }) {
   const [filter, setFilter] = useState({
      view: { list: 0 },
   });

   const [offset, setOffset] = useState(3);
   const { data: blogs, error } = useSWR(
      `/api/blogs/?offset=${offset}`,
      fetcher,
      {
         initialData: offset !== 3 ? undefined : initialData,
      },
   );
   //  console.log("data : ", blogs);

   return (
      <Container>
         <BlogNavbar />
         {preview && (
            <Alert>
               This is preview mode
               <Alert.Link href="/api/exit-preview">
                  Leave preview mode
               </Alert.Link>
            </Alert>
         )}
         <AuthorIntro />
         <hr />
         <Button onClick={() => setOffset((prev) => prev + 3)}>
            next page
         </Button>
         <Row className="mb-5">
            {!blogs && <div>"loading..."</div>}
            {blogs &&
               blogs.length > 0 &&
               blogs.map((blog) => {
                  return (
                     <Col key={blog.slug} md="4">
                        <CardItem
                           slug={blog.slug}
                           author={blog.person}
                           title={blog.title}
                           subtitle={blog.subtitle}
                           image={blog.coverImage}
                           date={blog.date}
                           link={{
                              href: `/blogs/[slug]`,
                              as: `/blogs/${blog.slug}`,
                           }}
                        />
                     </Col>
                  );
               })}
         </Row>
      </Container>
   );
}

export async function getStaticProps({ preview = false }) {
   const blogs = await getAllBlogs({ offset: 3 });
   return {
      props: {
         blogs,
         preview,
      },
   };
}
