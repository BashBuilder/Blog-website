// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
// import cloudStorage from '@payloadcms/plugin-cloud-storage'
// import cloudinaryPlugin from 'payload-cloudinary-plugin/dist/plugins'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// export default buildConfig({
//   secret: process.env.PAYLOAD_SECRET,
//   admin: {
//     importMap: {
//       baseDir: path.resolve(dirname),
//     },
//     components: {
//       header: ['@/components/Logo/AdminTitleFixer#AdminTitleFixer'],
//       graphics: {
//         Logo: '@/components/Logo/Logo2#Logo2',
//         Icon: '@/components/Logo/Icon#Icon',
//       },
//     },

//     meta: {
//       title: 'Qorepay Admin',
//       description: 'Qorepay Admin Panel for managing blog content',
//       icons: [
//         { rel: 'icon', type: 'image/png', url: '/favicon.png' },
//         // { rel: 'apple-touch-icon', type: 'image/png', url: '/apple-touch-icon.png' },
//       ],
//       openGraph: {
//         title: 'Qorepay Admin',
//         description: 'Manage your blog content with ease',
//         siteName: 'Qorepay',
//         images: [
//           {
//             url: 'https://drive.google.com/file/d/127wcCK6TntoJ5G89oFQKrcvE6go1Gtnh/view?usp=sharing',
//             width: 800,
//             height: 600,
//           },
//         ],
//       },
//       robots: 'noindex, nofollow',
//     },
//     user: Users.slug,
//     livePreview: {
//       breakpoints: [
//         {
//           label: 'Mobile',
//           name: 'mobile',
//           width: 375,
//           height: 667,
//         },
//         {
//           label: 'Tablet',
//           name: 'tablet',
//           width: 768,
//           height: 1024,
//         },
//         {
//           label: 'Desktop',
//           name: 'desktop',
//           width: 1440,
//           height: 900,
//         },
//       ],
//     },
//   },
//   // This config helps us configure global or default features that the other editors can inherit
//   editor: defaultLexical,
//   db: postgresAdapter({
//     pool: {
//       connectionString: process.env.DATABASE_URI || '',
//     },
//   }),
//   collections: [Pages, Posts, Media, Categories, Users],
//   cors: [getServerSideURL()].filter(Boolean),
//   globals: [Header, Footer],
//   plugins: [
//     ...plugins,

//     // storage-adapter-placeholder
//     // cloudinaryPlugin({
//     //   collections: {
//     //     media: {
//     //       folder: 'qorepay-blog-media', // optional: your folder name on Cloudinary
//     //     },
//     //   },
//     // }),
//     // cloudStorage({
//     //   collections: {
//     //     media: {
//     //       adapter: 'cloudinary',
//     //       options: {
//     //         cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//     //         api_key: process.env.CLOUDINARY_API_KEY!,
//     //         api_secret: process.env.CLOUDINARY_API_SECRET!,
//     //       },
//     //     },
//     //   },
//     // }),
//   ],
//   sharp,
//   typescript: {
//     outputFile: path.resolve(dirname, 'payload-types.ts'),
//   },
//   jobs: {
//     access: {
//       run: ({ req }: { req: PayloadRequest }): boolean => {
//         // Allow logged in users to execute this endpoint (default)
//         if (req.user) return true

//         // If there is no logged in user, then check
//         // for the Vercel Cron secret to be present as an
//         // Authorization header:
//         const authHeader = req.headers.get('authorization')
//         return authHeader === `Bearer ${process.env.CRON_SECRET}`
//       },
//     },
//     tasks: [],
//   },
// })

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET, // ✅ Moved here

  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      header: ['@/components/Logo/AdminTitleFixer#AdminTitleFixer'],
      graphics: {
        Logo: '@/components/Logo/Logo2#Logo2',
        Icon: '@/components/Logo/Icon#Icon',
      },
    },
    meta: {
      title: 'Qorepay Admin',
      description: 'Qorepay Admin Panel for managing blog content',
      icons: [{ rel: 'icon', type: 'image/png', url: '/favicon.png' }],
      openGraph: {
        title: 'Qorepay Admin',
        description: 'Manage your blog content with ease',
        siteName: 'Qorepay',
        images: [
          {
            url: 'https://drive.google.com/file/d/127wcCK6TntoJ5G89oFQKrcvE6go1Gtnh/view?usp=sharing',
            width: 800,
            height: 600,
          },
        ],
      },
      robots: 'noindex, nofollow',
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },

  editor: defaultLexical,

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),

  collections: [Pages, Posts, Media, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],

  plugins: [
    ...plugins,
    vercelBlobStorage({
      enabled: true,
      collections: {
        // media: {
        //   prefix: 'cms_images',
        // },
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN!,
      addRandomSuffix: true,
      cacheControlMaxAge: 3600,
      clientUploads: true,
    }),
  ],

  sharp,

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
