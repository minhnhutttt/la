import Image from "next/image"
import Link from "next/link"

type QuestionsArticleType = {
  images: string[],
  link: string,
  title: string,
  desc: string,
  count: string,
}

export const QuestionsArticle = ({images, link, title, desc, count}: QuestionsArticleType) => (
  <Link href={link} className="lg:w-[1/3] lg:flex-[0_0_33.333333334%] md:w-[41.6666666667%] md:flex-[0_0_41.6666666667%] w-[58.3333333333%] flex-[0_0_58.3333333333%] px-2">
    <span className="my-2 h-[calc(100%-16px)] [box-shadow:0_0_0_1px_rgba(54,_50,_49,_.08),_0_2px_2px_1px_rgba(54,_50,_49,_.06)] md:text-[14px] text-[12px] flex flex-col rounded-[8px]">
        <span className="p-4">
            <p className="">{title}</p>
        </span>
    </span>
  </Link>
)
