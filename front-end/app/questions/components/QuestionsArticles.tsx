import Image from "next/image"
import Link from "next/link"

type Item = {
  rank?: number,
  image: string,
  link: string,
  title: string,
  desc?: string,
  time: string,
}

export const QuestionsArticles = ({image, link, title, desc, time}: Item) => (
  <Link href={link} className="flex flex-col gap-4 md:[flex-basis:50%] md:max-w-[50%] p-4">
    <span className="h-[220px] mb-4 rounded-md">
        <Image
            src={image}
            alt=""
            width={1200}
            height={600}
            className="object-cover w-full h-full rounded-lg"
          />
      </span>
    <span className="flex-1">
      <h3 className="md:text-[20px] text-[18px] font-bold mb-2">
        {title}
      </h3>
      <span className="text-[#716c6b] md:text-[16px] text-[14px] line-clamp-2 mb-4">{desc}</span>
      <span className="md:text-[14px] text-[12px] text-[#716c6b]">
          {time}
        </span>
    </span>
  </Link>
)
