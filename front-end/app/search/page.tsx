"use client";
import { SearchHistoryItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const HistoryItem = ({image, name, introduction}: SearchHistoryItem) => (
  <div className="flex md:flex-[0_0_33.33333%] flex-[0_0_75%] [box-shadow:0_0_0_1px_rgba(54,_50,_49,_.08),_0_2px_2px_1px_rgba(54,_50,_49,_.06)] rounded-lg p-4 md:flex-col items-center">
    <figure className="w-[52px] md:mb-3">
      <Image src={image} alt="" width={150} height={200} className="rounded max-md:-m-2" />
    </figure>
    <div className="flex-1">
      <Link
        href="/"
        className="block md:text-center md:text-[16px] text-[14px] font-bold"
      >
        {name}
        <span className="text-[11px] md:text-[12px]">弁護士</span>
      </Link>
      <p className="text-[12px] md:text-[14px] text-[#716c6b] line-clamp-1">
        {introduction}
      </p>
    </div>
  </div>
);

export default function Search() {
  const [searchTab, setSearchTab] = useState(0);

  return (
    <main>
      <div className="bg-[#f5f1ee] md:pb-6 pt-6 px-6 pb-8 md:pt-8 md:mb-[56px]">
        <div className="w-full max-w-[1104px] mx-auto">
          <div className="md:max-w-[66.6666666667%] w-full pt-[128px] px-2 pb-6 md:bg-[position:100%_100%] bg-[position:top_0_right_40px] md:[background-size:360px_274px] [background-size:243px_152px] [flex-basis:100%] min-h-[274px] bg-[url(/images/search/lawyer-search-hero.svg)] bg-no-repeat mx-auto">
            <h1 className="text-[24px] md:text-[27px] mb-4 font-bold">
              弁護士検索
            </h1>
            <p className="text-[12px] md:text-[14px]">
              あなたの近くでお悩みの分野を取り扱う弁護士を、実績や費用などから探せます。
              <br className="max-md:hidden" />
              初回無料相談、電話・メールで相談可、現在営業中、など細かな検索が可能です。
              <br className="max-md:hidden" />
              料金表や解決事例など充実した情報をもとに、安心できる弁護士を見つけてください。
            </p>
          </div>
        </div>
      </div>
      <div className="px-5">
        <div className="w-full max-w-[720px] mx-auto">
          <div className="flex items-center justify-center mb-[30px]">
            <button
              className={cn(
                "text-[#315dbb] md:text-[18px] text-[16px] font-bold border-b border-[#e9e5e4] flex-1 py-4",
                searchTab === 0 ? "border-[#f7723e]" : "border-[#e9e5e4]"
              )}
            >
              弁護士検索
            </button>
            <button
              className={cn(
                "text-[#315dbb] md:text-[18px] text-[16px] font-bold border-b border-[#e9e5e4] flex-1 py-4",
                searchTab === 1 ? "border-[#f7723e]" : "border-[#e9e5e4]"
              )}
            >
              法律事務所検索
            </button>
          </div>
          <div className="relative">
            <div className="mt-6 mb-10 md:px-6 animate-fadeIn">
              <div className="text-[14px] text-[#262221] font-bold mb-2 flex gap-2 items-center">
                <Image
                  src="/icons/history.svg"
                  alt=""
                  width={16}
                  height={16}
                  priority
                />
                閲覧履歴
              </div>
              <div className="mb-[22px] py-2">
                <div className="flex gap-4 md:flex-wrap max-md:overflow-auto">
                  <HistoryItem image="/images/124266_1.png" name="日下部 眞史" introduction="埼玉県 さいたま市浦和区常盤9-19-5 岩端ビル2-B" />
                  <HistoryItem image="/images/124266_1.png" name="日下部 眞史" introduction="埼玉県 さいたま市浦和区常盤9-19-5 岩端ビル2-B" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
