// // src/cloudinaryAdapter.ts
// // import type { Adapter } from '@payloadcms/plugin-cloud-storage'
// import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
// import { v2 as cloudinary } from 'cloudinary'

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//   api_key: process.env.CLOUDINARY_API_KEY!,
//   api_secret: process.env.CLOUDINARY_API_SECRET!,
// })

// export const cloudinaryAdapter: Adapter = {
//   async upload({ file }) {
//     const result = await cloudinary.uploader.upload(file.path, {
//       folder: 'qorepay-blog-media',
//     })

//     return {
//       filename: result.original_filename,
//       url: result.secure_url,
//       mimeType: result.resource_type,
//       size: result.bytes,
//     }
//   },

//   async delete({ filename }) {
//     await cloudinary.uploader.destroy(`qorepay-blog-media/${filename}`)
//   },
// }
