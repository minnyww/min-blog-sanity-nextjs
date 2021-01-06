// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
   // We name our schema
   name: "default",
   // Then proceed to concatenate our document type
   // to the ones provided by any plugins that are installed
   types: schemaTypes.concat([
      {
         name: "person",
         type: "document",
         title: "This is Author",
         fields: [
            { name: "name", title: "This is author name", type: "string" },
            { name: "pic", title: "This is avatar", type: "image" },
         ],
      },
      {
         name: "blog",
         type: "document",
         title: "Min Blog",
         fields: [
            {
               name: "title",
               type: "string",
               title: "This is title",
               validation: (Rule) => {
                  return Rule.required().min(5).error("shorter title");
               },
            },
            { name: "subtitle", type: "string", title: "This is subtitle" },
            {
               name: "coverImage",
               type: "image",
               title: "This is cover image",
               options: {
                  hotspot: true,
               },
            },
            {
               name: "content",
               title: "This is Content",
               type: "array",
               of: [
                  {
                     type: "block",
                  },
                  {
                     type: "image",
                     options: {
                        hotspot: true,
                     },
                     fields: [
                        {
                           title: "Position",
                           name: "position",
                           type: "string",
                           options: {
                              list: [
                                 {
                                    title: "Center",
                                    value: "center",
                                 },
                                 {
                                    title: "Left",
                                    value: "left",
                                 },
                                 {
                                    title: "Right",
                                    value: "right",
                                 },
                              ],
                              layout: "radio",
                              isHighlighted: true,
                           },
                        },
                        {
                           type: "text",
                           name: "alt",
                           title: "This is Description",
                           options: {
                              isHighlighted: true,
                           },
                        },
                     ],
                  },
                  {
                     type: "code",
                     options: {
                        withFilename: true,
                     },
                  },
               ],
            },
            { name: "date", type: "datetime", title: "This is Date" },
            {
               name: "person",
               type: "reference",
               title: "Author",
               to: [{ type: "person" }],
            },
            { name: "slug", type: "slug", title: "This is slug" },
         ],
      },
   ]),
});
