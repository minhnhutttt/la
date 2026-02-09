'use client'

import ExpandableSection from "@/components/common/ExpandableSection"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"

export default function LawyersPage() {
  const [tab, setTab] = useState(0)
  return (
    <main className="md:px-5">
      <div className="w-full max-w-[1104px] mx-auto">
        <div className="md:py-12">
          <div className="flex max-md:flex-col items-center md:gap-8 relative">
            <div className="flex flex-col order-2 max-md:pb-4 max-md:px-6">
              <div className="relative max-md:order-2 max-md:mt-3">
                <p className="text-[clamp(11px,2vw,14px)]">こうづき ゆうき</p>
                <p className="text-[clamp(18px,4vw,27px)] font-bold">上月 裕紀<span className="text-[clamp(12px,2vw,16px)] ml-3">弁護士</span></p>
                <div className="text-[#72706e] text-[clamp(12px,2vw,16px)]">
                  <p>うららか法律事務所</p>
                  <p>埼玉県さいたま市大宮区高鼻町1-56 ks'氷川の杜401</p>
                </div>
              </div>
              <div className="mt-3 border relative border-[#ededed] md:text-[14px] text-[12px] rounded-md p-3  before:border-l before:border-t before:border-[#ededed] before:h-[8px] before:absolute before:w-[8px] before:bg-white md:before:-left-[4px] before:top-[-5px] md:before:top-1/2 md:before:-rotate-45 before:rotate-45 md:before:-translate-y-1/2 max-md:order-1">
                平日午後６時以降・土日・祝日は「Webで面談予約」からお問い合わせください。
              </div>
            </div>
            <div className="order-1 relative max-md:pb-8">
              <div className="max-md:absolute max-md:bottom-1.5 max-md:pl-6">
                <Image src="/images/lawyers/741830_1.png" alt="" width={150} height={200} className="rounded-lg block max-w-[158px] min-w-[106px] w-[20vw]" />
              </div>
              <div className="md:hidden">
                <Image src="/images/lawyers/default_image2.jpg" alt="" width={1920} height={1440} className="[aspect-ratio:3_/_1] block h-auto min-h-[126px] object-cover w-full" />
              </div>
            </div>
            <button className="absolute px-4 md:px-6 py-2 md:py-3 font-bold top-3 md:top-0 right-3 md:right-0 md:text-[16px] text-[12px] bg-white border-[#d9d9d9] border min-w-[144px] md:min-w-[190px] rounded-full flex justify-center items-center z-10">お気に入りに追加</button>
          </div>
        </div>
        <div className="flex gap-12 max-md:flex-col">
          <div className="flex-grow">
            <div className="w-full">
              <div className="flex bg-white border-y border-[#d9d9d9] overflow-visible sticky top-0 z-10 max-md:divide-x">
                <button onClick={() => setTab(0)} className={cn("flex-1 font-bold flex flex-col items-center gap-1 md:gap-2.5 text-[10px] md:text-[clamp(12px,2vw,16px)] leading-none relative py-3 md:py-4 after:absolute after:h-1 after:bg-[#f7723e] after:bottom-0 after:inset-x-0 after:w-full", tab === 0 ? 'after:opacity-100 text-[#f7723e]' : 'after:opacity-0')}>
                  <Image src="/images/lawyers/lawyer-ic-01.svg" alt="" width={28} height={28} className="max-md:size-5" />
                  <p>人物紹介</p>
                </button>
                <button onClick={() => setTab(1)} className={cn("flex-1 font-bold flex flex-col items-center gap-1 md:gap-2.5 text-[10px] md:text-[clamp(12px,2vw,16px)] leading-none relative py-3 md:py-4 after:absolute after:h-1 after:bg-[#f7723e] after:bottom-0 after:inset-x-0 after:w-full", tab === 1 ? 'after:opacity-100 text-[#f7723e]' : 'after:opacity-0')}>
                  <Image src="/images/lawyers/lawyer-ic-02.svg" alt="" width={28} height={28} className="max-md:size-5" />
                  <p>注力分野</p>
                </button>
                <button onClick={() => setTab(2)} className={cn("flex-1 font-bold flex flex-col items-center gap-1 md:gap-2.5 text-[10px] md:text-[clamp(12px,2vw,16px)] leading-none relative py-3 md:py-4 after:absolute after:h-1 after:bg-[#f7723e] after:bottom-0 after:inset-x-0 after:w-full", tab === 2 ? 'after:opacity-100 text-[#f7723e]' : 'after:opacity-0')}>
                  <Image src="/images/lawyers/lawyer-ic-03.svg" alt="" width={28} height={28} className="max-md:size-5" />
                  <p>解決事例</p>
                </button>
                <button onClick={() => setTab(3)} className={cn("flex-1 font-bold flex flex-col items-center gap-1 md:gap-2.5 text-[10px] md:text-[clamp(12px,2vw,16px)] leading-none relative py-3 md:py-4 after:absolute after:h-1 after:bg-[#f7723e] after:bottom-0 after:inset-x-0 after:w-full", tab === 3 ? 'after:opacity-100 text-[#f7723e]' : 'after:opacity-0')}>
                  <Image src="/images/lawyers/lawyer-ic-04.svg" alt="" width={28} height={28} className="max-md:size-5" />
                  <p>料金表</p>
                </button>
                <button onClick={() => setTab(4)} className={cn("flex-1 font-bold flex flex-col items-center gap-1 md:gap-2.5 text-[10px] md:text-[clamp(12px,2vw,16px)] leading-none relative py-3 md:py-4 after:absolute after:h-1 after:bg-[#f7723e] after:bottom-0 after:inset-x-0 after:w-full", tab === 4 ? 'after:opacity-100 text-[#f7723e]' : 'after:opacity-0')}>
                  <Image src="/images/lawyers/lawyer-ic-05.svg" alt="" width={28} height={28} className="max-md:size-5" />
                  <p>感謝の声</p>
                </button>
                <button onClick={() => setTab(5)} className={cn("flex-1 font-bold flex flex-col items-center gap-1 md:gap-2.5 text-[10px] md:text-[clamp(12px,2vw,16px)] leading-none relative py-3 md:py-4 after:absolute after:h-1 after:bg-[#f7723e] after:bottom-0 after:inset-x-0 after:w-full", tab === 5 ? 'after:opacity-100 text-[#f7723e]' : 'after:opacity-0')}>
                  <Image src="/images/lawyers/lawyer-ic-06.svg" alt="" width={28} height={28} className="max-md:size-5" />
                  <p>アクセス</p>
                </button>
              </div>
              <div>
                <h2 className="mt-4 md:mt-[18px] text-[18px] md:text-[23px] font-bold">「Webで面談予約」「LINEで面談予約」からのお問い合わせに、迅速に受付をし、面談・電話・Zoomの方法で法律相談に対応します。過去の対応実績は「解決事例」「感謝の声」のページをご覧ください。</h2>
                <div className="my-6">
                  <Image src="/images/lawyers/741830_5.png" alt="" width={640} height={396} className="" />
                </div>
                <div className="md:text-[18px] text-[16px]">
                  <p className="md:text-[20px] text-[18px] font-bold md:mb-[18px] mb-[16px] pl-4 border-l-[6px] border-[#bebdbd]">お問い合わせ方法</p>
                  <p className="md:mb-[18px] mb-[16px]">
                    平日の営業時間内（１０時～１８時）<br />
                    →「電話」「Web」「LINE」で面談予約から。
                  </p>
                  <p className="md:mb-[18px] mb-[16px]">
                    平日の営業時間外（１８時以降）、土日・祝日 <br />
                    →「Web」「LINE」で面談予約から。
                  </p>
                  <ExpandableSection collapsedHeight={80}>
                    <p className="md:text-[20px] text-[18px] font-bold md:mb-[18px] mb-[16px] pl-4 border-l-[6px] border-[#bebdbd] mt-4">弁護士費用</p>
                    <p className="md:mb-[18px] mb-[16px]">
                      初回のご相談は、１時間までは、無料です。 <br />
                      （平日の営業時間内の対応の場合となります。 <br />
                      営業時間外、土日・祝日にご相談を承る場合、 <br />
                      初回のご相談から相談料をお預かりします。） <br />
                      <br />
                      なお、所属事務所では、法テラスを利用した <br />
                      無料相談、委任契約の対応はしておりません。
                    </p>
                    <p className="md:text-[20px] text-[18px] font-bold md:mb-[18px] mb-[16px] pl-4 border-l-[6px] border-[#bebdbd] mt-8">アクセス</p>
                    <p className="md:mb-[18px] mb-[16px]">
                      大宮駅東口から、徒歩５〜６分の事務所です。
                    </p>
                    <p className="md:text-[20px] text-[18px] font-bold md:mb-[18px] mb-[16px] pl-4 border-l-[6px] border-[#bebdbd] mt-8">対応分野</p>
                    <p className="md:mb-[18px] mb-[16px]">
                      ①離婚・男女問題<br />
                      ②労働問題<br />
                      ③刑事事件<br />
                      に特に注力をしておりますが、<br />
                      ④交通事故<br />
                      ⑤遺産分割事件<br />
                      ⑥企業法務<br />
                      のご依頼も多数ございます。
                    </p>
                  </ExpandableSection>
                </div>
                <div className="mt-6">
                  <h3 className="md:text-[20px] text-[18px] md:py-[14px] font-bold py-3 px-6 bg-[#ececec]">上月 裕紀 弁護士の取り扱う分野</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-[0_0_calc(33.33333%-16px)] sticky top-[24px]">
            <div className="bg-[#f6f6f6] rounded-[12px] p-3 md:p-8">

            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
