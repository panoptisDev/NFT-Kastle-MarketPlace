import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "rfo4z438",
  dataset: "production",
  apiVersion: "2021-03-25",
  token:
    "skS62GF9fzImwqTbIWNtBWypvmsP5pEOWYDTzHG9pSWvfgcnhpGUmp9uqqqM8r6tvuOESVqWJ2B9hSr4ny8lNcROrHRPsjstCzhCVPKCUDIdcs3582U78YeVDGXiKaiGQHAPKcBGvh5eOVTZ0CLw6ua9N1b0tRXCdyVovO4X5acTxjtGtrsA",
  useCdn: false,
});
