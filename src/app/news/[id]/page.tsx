import { NewsItem } from '@/types/news'
import Image from 'next/image'

export const revalidate = 60

export const dynamicParams = true

export async function generateStaticParams() {
  const news: NewsItem[] = await fetch(
    `https://news-api-next-js-kappa.vercel.app/api/news`
  ).then((res) => res.json())
  return news.map((item) => ({
    id: String(item?._id),
  }))
}

const NewDetailsPage = async ({ params }: { params: { id: string } }) => {
  const noticia = await fetch(
    `https://news-api-next-js-kappa.vercel.app/api/news/${params.id}`
  ).then((res) => res.json())

  if (!noticia) {
    return <div>News is not found!</div>
  }
  return (
    <section className='py-12'>
      <article className='max-w-4xl mx-auto p-6 shadow-md border rounded-lg'>
        {noticia?.imageUrl && (
          <div>
            <Image
              src={noticia?.imageUrl}
              alt={noticia?.title}
              width={800}
              height={450}
              className='rounded-md object-cover'
            />
          </div>
        )}

        <div className='my-5'>
          <h2 className='text-3xl font-bold mb-3'>{noticia?.title}</h2>

          <div className='flex justify-between items-center text-sm mb-4'>
            <p>{new Date(noticia?.published_at).toLocaleDateString()}</p>
            <p>
              Source: <span>{noticia?.source}</span>
            </p>
          </div>
        </div>

        <div className='mb-4'>
          {noticia?.categories?.map((category: string) => (
            <span
              key={category}
              className='bg-blue-100 text-blue-600 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded'
            >
              {category}
            </span>
          ))}
        </div>

        {/* Snippet */}
        <p className='mb-6'>{noticia?.snippet}</p>

        {/* Full description */}
        <p className='mb-6'>{noticia?.description}</p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut deleniti
          quos natus fuga, odio et, doloremque soluta quibusdam quia quidem
          iste, alias distinctio. Voluptatibus dolor alias molestiae laborum
          iure commodi natus, quis perferendis dignissimos nobis reprehenderit
          tempora fuga ducimus omnis deleniti similique delectus velit vel
          repudiandae quos sint distinctio tenetur iusto. Voluptatum sunt alias
          optio accusantium quam asperiores repellat sapiente.
        </p>
      </article>
    </section>
  )
}

export default NewDetailsPage
