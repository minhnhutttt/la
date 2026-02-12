import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"

const QuestionAboutItem = ({title, link, image, desc} : {title: string, link: string, image: string, desc: ReactNode}) => (
    <Link href={link} className="flex py-6">
        <span className="md:text-[18px] text-[16px]">
            <h5 className="font-bold text-[#315dbb]">{title}</h5>
            <span className="block mt-1">{desc}</span>
        </span>
        <span>
            <Image src={image} alt="" width={100} height={100} className="size-25 rounded-lg" />
        </span>
    </Link>
)

export const QuestionAbout = ({question, answer}: {question: string, answer: ReactNode}) => {
  return (
    <div className="bg-[#fbf9f8] border border-[#ededed] rounded-lg p-5 md:text-[14px] text-[12px]">
      <p className="mb-2"><span className="font-bold">Q.</span>{question}</p>
      <p><span className="font-bold">A.</span>{answer}</p>
    </div>
  )
}
