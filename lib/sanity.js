import sanityClient from "@sanity/client";

const options = {
   dataset: process.env.SANITY_DATASET_NAME,
   projectId: process.env.SANITY_PROJECT_ID,
   useCdn: process.env.NODE_ENV === "production",
   // useCdn === true, gives you fast response, it will get you
   // cached data
   // useCdn === false, give you little bit slower response, but
   // latest data
};

export const previewClient = sanityClient({
   ...options,
   useCdn: false,
   token:
      "skOIvnoGWy7SV3WWIuvoClU5TtAIZPLH6Epqdm9swdVVHaFXObO9Ktzh2iQfR4OQvnO7R4knWeykZAuGKiJe9ZHdQIMFgjAcFVKlOXKDrmkW2tGxA141PpMV1vmPZNW3Rxt17flLlDgITGxvuOBCysN22LircJC1t6n8pceBl9Xvt4Mk69xw",
});

export default sanityClient(options);
