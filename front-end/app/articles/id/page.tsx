'use client'

import Image from "next/image"
import Link from "next/link"
import { ArticlesRanks } from "../components/ArticlesRanks"



export default function ArticleDetail() {

  return (
    <div className="w-full">
      {/* Articles Content Section */}
      <div className="w-full max-w-[1144px] mx-auto">
        <div className="flex flex-start flex-wrap max-md:flex-col">
          <div className="mt-10 md:[flex-basis:66.6666666667%] md:max-w-[66.6666666667%] flex-col flex gap-4 mb-[56px]">
            
          </div>
          <ArticlesRanks />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-12 flex justify-center">
       <Link href="/articles/id" className="flex relative w-full max-w-[900px] items-center justify-center bg-[#fbf9f8] rounded-full [box-shadow:0_2px_3px_rgba(38,_34,_33,_.08)] py-4 px-6 md:text-[18px] text-[16px] after:absolute after:border-t-[2px] after:border-r-[2px] after:h-2 after:w-2 after:rotate-45 after:-translate-y-1/2 after:border-[#f7723e] after:top-1/2 mdLafter:right-8 after:right-4">弁護士ドットコムニュースについて</Link>
      </div>
    </div>
  )
}
