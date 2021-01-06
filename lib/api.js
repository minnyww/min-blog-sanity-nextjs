import client, { previewClient } from "./sanity";
import imageUrlBuilder from "@sanity/image-url";

// const blogFields = `
//   title,
//   subtitle,
//   'slug': slug.current,
//   date,
//   'person' : person->{name,'pic' : pic.asset->url},
//   'coverImage' : coverImage.asset->url
// `;

const blogFields = `
  title,
  subtitle,
  'slug': slug.current,
  date,
  'person' : person->{name,'pic' : pic.asset->url},
  coverImage
`;

const builder = imageUrlBuilder(client);

export async function getAllBlogs({ offset }) {
   console.log("offset : ", offset);
   const results = await client.fetch(
      //   `*[_type == "blog"] | order(_createdAt asc) {${blogFields}}[${offset}...${
      //   `*[_type == "blog"] | order(date asc) {${blogFields}}[${0}...${offset}]`,
      `*[_type == "blog"] | order(date asc) {${blogFields}} ${
         offset ? `[${0}...${offset}]` : ""
      } `,
   );
   return results;
}

export function urlFor(source) {
   return builder.image(source);
}

// export async function getBlogBySlug(slug, preview) {
//    const result = await client.fetch(
//       `*[_type == "blog" && slug.current == $slug] {
//         ${blogFields},content[]{...,"asset" : asset->}
//       }`,
//       { slug },
//    );

//    return result[0];
// }

const getClient = (preview) => (preview ? previewClient : client);

export async function getBlogBySlug(slug, preview) {
   const currentClient = getClient(preview);
   const result = await currentClient
      .fetch(
         `*[_type == "blog" && slug.current == $slug] {
           ${blogFields},content[]{...,"asset" : asset->}
         }`,
         { slug },
      )
      .then((res) => (preview ? (res?.[1] ? res[1] : res[0]) : res?.[0]));

   return result;
}

export async function getPaginatedBlogs(
   { offset = 0, date = "desc" } = { offset: 0, date: "desc" },
) {
   const results = await client.fetch(
      `*[_type == "blog"] | order(date ${date}) {${blogFields}}[${offset}...${
         offset + 6
      }]`,
   );
   return results;
}

// export const onBlogUpdate = (slug) => {
//    const client = getClient(true);
//    return client.listen(
//       `*[_type == "blog" && slug.current == $slug] {
//       ${blogFields}
//       content[]{..., "asset": asset->}
//     }`,
//       { slug },
//    );
// };
