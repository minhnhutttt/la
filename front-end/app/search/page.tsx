"use client";
import SearchPrefecture from "@/components/search/SearchPrefecture";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
interface SearchHistoryItem {
  image: string;
  name: string;
  introduction: string
}

interface SearchHistoryLocalItem {
  image: string;
  name: string;
  location: string;
  walk: string;
  time: string;
  introduction: string
}
const HistoryItem = ({ image, name, introduction }: SearchHistoryItem) => (
  <Link href="/" className="flex md:flex-[0_0_33.33333%] flex-[0_0_75%] [box-shadow:0_0_0_1px_rgba(54,_50,_49,_.08),_0_2px_2px_1px_rgba(54,_50,_49,_.06)] rounded-lg p-4 md:flex-col items-center">
    <figure className="w-[52px] md:mb-3">
      <Image src={image} alt="" width={150} height={200} className="rounded max-md:-m-2" />
    </figure>
    <span className="flex-1 block">
      <span
        className="block md:text-center md:text-[16px] text-[14px] font-bold"
      >
        {name}
        <span className="text-[11px] md:text-[12px]">弁護士</span>
      </span>
      <span className="block text-[12px] md:text-[14px] text-[#716c6b] line-clamp-1">
        {introduction}
      </span>
    </span>
  </Link>
);

const HistoryLocalItem = ({ image, name, location, walk, time, introduction }: SearchHistoryLocalItem) => (
  <Link href="/" className="lg:flex-[0_0_33.33333333%] md:flex-[0_0_41.66666667%] flex-[0_0_75%] px-2">
    <span className="my-2 h-[calc(100%-16px)] bg-white rounded-lg [box-shadow:0_0_0_1px_rgba(54,_50,_49,_.08),_0_2px_2px_1px_rgba(54,_50,_49,_.06)] flex flex-col items-center">
      <span className="p-4 flex flex-col items-center">
        <figure className="w-[80px] mb-3">
          <Image src={image} alt="" width={150} height={200} className="rounded-lg" />
        </figure>

        <span className="flex justify-center">
          <span
            className="block md:text-center md:text-[20px] text-[18px] font-bold"
          >
            {name}
            <span className="text-[11px] md:text-[13px]">弁護士</span>
          </span>
        </span>
        <span className="text-center">
          <span className="md:text-[14px] text-[12px]">{location}</span>
          <span className="text-[#716c6b] text-[12px] md:text-[14px]">（徒歩{walk}分）</span>
        </span>
        <span className="text-center ">
          <span className="md:text-[14px] text-[12px]">現在営業中</span>
          <span className="text-[12px] md:text-[14px] ml-2 font-bold">{time}</span>
        </span>
      </span>
      <span className="text-[12px] md:text-[14px] text-[#716c6b] p-4 border-t border-[#e9e5e4]">
        <span className="line-clamp-3 ">{introduction}</span>
      </span>
      <span className="flex justify-end relative w-full md:text-[14px] text-[12px] text-[#315dbb] py-2.5 px-6 after:absolute after:border-t-[2px] after:border-r-[2px] after:h-2 after:w-2 after:rotate-45 after:-translate-y-1/2 after:border-[#f7723e] after:top-1/2 after:right-3">続きを見る
      </span>
    </span>
  </Link>
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
        <div className="w-full max-w-[720px] mx-auto md:px-6 md:mb-[56px] md:pb-[56px] pb-10 mb-10 border-[#f0ebe9] border-b">
          <div className="flex items-center justify-center mb-[30px]">
            <button
              className={cn(
                "md:text-[18px] text-[16px] font-bold border-b border-[#e9e5e4] flex-1 py-4",
                searchTab === 0 ? "border-[#f7723e] text-[#262221]" : "border-[#e9e5e4] text-[#315dbb]"
              )}
              onClick={() => setSearchTab(0)}
            >
              弁護士検索
            </button>
            <button
              className={cn(
                "text-[#315dbb] md:text-[18px] text-[16px] font-bold border-b border-[#e9e5e4] flex-1 py-4",
                searchTab === 1 ? "border-[#f7723e] text-[#262221]" : "border-[#e9e5e4] text-[#315dbb] "
              )}
              onClick={() => setSearchTab(1)}
            >
              法律事務所検索
            </button>
          </div>
          <div className={cn('relative', searchTab === 0 ? 'block' : 'hidden')}>
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
              <Link href="/" className="relative flex items-center justify-center border border-[#bbb3af] font-bold [box-shadow:0_2px_3px_rgba(38,_34,_33,_.08)] rounded-full w-full max-w-[400px] mx-auto py-4 md:py-4 px-5 md:px-8 bg-white md:text-[18px] text-[16px] after:absolute after:border-t-[2px] after:border-r-[2px] after:h-2 after:w-2 after:rotate-45 after:-translate-y-1/2 after:border-[#f7723e] after:top-1/2 after:right-4">閲覧履歴をもっと見る
              </Link>
            </div>
            <div className="border-y border-[#bbb3af]/40 mt-6 pt-6 mb-8 pb-4">
              <form action="">
                <div className="mb-2 relative">
                  <input type="text" className="border border-[#bbb3af] rounded-lg w-full md:text-[18px] text-[16px] [box-shadow:inset_1px_1px_2px_rgba(38,_34,_33,_.08)] py-3 pr-10 pl-4 leading-snug" placeholder="弁護士名、事務所名など" />
                  <button type="submit" className="w-12 flex items-center justify-center absolute top-0 right-0 h-full bg-white border border-[#bbb3af] rounded-tr-lg rounded-br-lg" aria-label="入力したキーワードで検索">
                    <Image
                      src="/icons/search.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </form>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/" className="relative flex items-center justify-center border border-[#bbb3af] font-bold [box-shadow:0_2px_3px_rgba(38,_34,_33,_.08)] rounded-full w-full max-w-[400px] mx-auto py-4 md:py-4 px-5 md:px-8 bg-white md:text-[18px] text-[16px] ">
                <Image
                  src="/icons/search-ic-01.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="absolute left-4"
                />
                地域から探す
              </Link>
              <Link href="/" className="relative flex items-center justify-center border border-[#bbb3af] font-bold [box-shadow:0_2px_3px_rgba(38,_34,_33,_.08)] rounded-full w-full max-w-[400px] mx-auto py-4 md:py-4 px-5 md:px-8 bg-white md:text-[18px] text-[16px] ">
                <Image
                  src="/icons/search-ic-02.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="absolute left-4"
                />
                駅・路線から探す
              </Link>
              <Link href="/" className="relative flex items-center justify-center border border-[#bbb3af] font-bold [box-shadow:0_2px_3px_rgba(38,_34,_33,_.08)] rounded-full w-full max-w-[400px] mx-auto py-4 md:py-4 px-5 md:px-8 bg-white md:text-[18px] text-[16px] ">
                <Image
                  src="/icons/search-ic-03.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="absolute left-4"
                />
                相談内容から探す
              </Link>
            </div>
          </div>
          <div className={cn('relative', searchTab === 1 ? 'block' : 'hidden')}>
            <div className="mt-6 md:px-6 animate-fadeIn">
              <form action="">
                <div className="space-y-6">
                  <div>
                    <input type="text" className="border border-[#bbb3af] rounded-lg w-full md:text-[18px] text-[16px] [box-shadow:inset_1px_1px_2px_rgba(38,_34,_33,_.08)] py-3 pr-10 pl-4 leading-snug" placeholder="法律事務所名" />
                  </div>
                  <div className="">
                    <select className="border border-[#bbb3af] rounded-lg w-full md:text-[18px] text-[16px] [box-shadow:inset_1px_1px_2px_rgba(38,_34,_33,_.08)] py-3 pr-10 pl-4 leading-snug appearance-none bg-[url(/icons/select.svg)] bg-[position:right_18px_top_50%] bg-no-repeat" aria-label="都道府県を選択"><option value="">都道府県</option><option value="hokkaido">北海道</option><option value="aomori">青森県</option><option value="iwate">岩手県</option><option value="miyagi">宮城県</option><option value="akita">秋田県</option><option value="yamagata">山形県</option><option value="fukushima">福島県</option><option value="ibaraki">茨城県</option><option value="tochigi">栃木県</option><option value="gunma">群馬県</option><option value="saitama">埼玉県</option><option value="chiba">千葉県</option><option value="tokyo">東京都</option><option value="kanagawa">神奈川県</option><option value="yamanashi">山梨県</option><option value="nagano">長野県</option><option value="nigata">新潟県</option><option value="toyama">富山県</option><option value="ishikawa">石川県</option><option value="fukui">福井県</option><option value="gifu">岐阜県</option><option value="shizuoka">静岡県</option><option value="aichi">愛知県</option><option value="mie">三重県</option><option value="shiga">滋賀県</option><option value="kyoto">京都府</option><option value="osaka">大阪府</option><option value="hyogo">兵庫県</option><option value="nara">奈良県</option><option value="wakayama">和歌山県</option><option value="tottori">鳥取県</option><option value="shimane">島根県</option><option value="okayama">岡山県</option><option value="hiroshima">広島県</option><option value="yamaguchi">山口県</option><option value="tokushima">徳島県</option><option value="kagawa">香川県</option><option value="ehime">愛媛県</option><option value="kochi">高知県</option><option value="fukuoka">福岡県</option><option value="saga">佐賀県</option><option value="nagasaki">長崎県</option><option value="kumamoto">熊本県</option><option value="oita">大分県</option><option value="miyazaki">宮崎県</option><option value="kagoshima">鹿児島県</option><option value="okinawa">沖縄県</option>                  </select>
                  </div>
                  <div className="">
                    <select className="border border-[#bbb3af] rounded-lg w-full md:text-[18px] text-[16px] [box-shadow:inset_1px_1px_2px_rgba(38,_34,_33,_.08)] py-3 pr-10 pl-4 leading-snug appearance-none bg-[url(/icons/select.svg)] bg-[position:right_18px_top_50%] bg-no-repeat" aria-label="都道府県を選択"><option value="">相談内容</option><option value="rikon">離婚・男女問題</option><option value="shakkin">借金</option><option value="sozoku">相続</option><option value="kotsujiko">交通事故</option><option value="internet">インターネット</option><option value="shohishahigai">消費者被害</option><option value="hanzai">犯罪・刑事事件</option><option value="roudou">労働</option><option value="saiken">債権回収</option><option value="fudosan">不動産・建築</option><option value="kokusai">国際・外国人問題</option><option value="iryou">医療</option><option value="houmu">企業法務</option><option value="zeimu">税務訴訟</option><option value="gyosei">行政事件</option>                  </select>
                  </div>
                  <Link href="/" className="relative flex items-center justify-center bg-[#f7723e] font-bold [box-shadow:0_2px_3px_rgba(38,_34,_33,_.08)] rounded-full w-full max-w-[400px] mx-auto py-4 md:py-4 px-5 md:px-8 text-white md:text-[18px] text-[16px]">検索する
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[720px] mx-auto pb-10 md:pb-[56px]">
          <h2 className="text-[22px] font-bold text-[#262221] leading-[1.4] mb-6">よく検索される地域の弁護士</h2>
          <div className="flex overflow-auto mb-[22px]">
            <HistoryLocalItem image="/images/124266_1.png" name="日下部 眞史" location="秋葉原駅" walk="4" time="00:00 - 24:00" introduction="【宅建士・マンション管理士・FP資格有り｜初回相談無料】【秋葉原駅徒歩５分】不動産の..." />
            <HistoryLocalItem image="/images/124266_1.png" name="日下部 眞史" location="秋葉原駅" walk="4" time="00:00 - 24:00" introduction="【宅建士・マンション管理士・FP資格有り｜初回相談無料】【秋葉原駅徒歩５分】不動産の..." />
            <HistoryLocalItem image="/images/124266_1.png" name="日下部 眞史" location="秋葉原駅" walk="4" time="00:00 - 24:00" introduction="【宅建士・マンション管理士・FP資格有り｜初回相談無料】【秋葉原駅徒歩５分】不動産の..." />
          </div>
          <Link href="/" className="relative flex items-center justify-center border border-[#bbb3af] font-bold [box-shadow:0_2px_3px_rgba(38,_34,_33,_.08)] rounded-full w-full max-w-[400px] mx-auto py-4 md:py-4 px-5 md:px-8 bg-white md:text-[18px] text-[16px] after:absolute after:border-t-[2px] after:border-r-[2px] after:h-2 after:w-2 after:rotate-45 after:-translate-y-1/2 after:border-[#f7723e] after:top-1/2 after:right-4">もっと見る
          </Link>
        </div>
        <div className="w-full max-w-[720px] mx-auto py-10 md:py-[56px] border-t border-[#e9e5e4]">
              <h2 className="text-[22px] font-bold text-[#262221] leading-[1.4] mb-6">よく検索される地域の弁護士</h2>
              <ul className="flex flex-wrap gap-x-1 gap-y-2">
                <li>
                  <Link href="/" className="flex px-3 py-1.5 hover:bg-[hsla(20,8%,71%,.17)] bg-white border border-[#e1dbd6] rounded-[27px] md:text-[14px] text-[12px]">港区</Link>
                </li>
                <li>
                  <Link href="/" className="flex px-3 py-1.5 hover:bg-[hsla(20,8%,71%,.17)] bg-white border border-[#e1dbd6] rounded-[27px] md:text-[14px] text-[12px]">千代田区</Link>
                </li>
                <li>
                  <Link href="/" className="flex px-3 py-1.5 hover:bg-[hsla(20,8%,71%,.17)] bg-white border border-[#e1dbd6] rounded-[27px] md:text-[14px] text-[12px]">横浜</Link>
                </li>
                <li>
                  <Link href="/" className="flex px-3 py-1.5 hover:bg-[hsla(20,8%,71%,.17)] bg-white border border-[#e1dbd6] rounded-[27px] md:text-[14px] text-[12px]">大阪市</Link>
                </li>
                <li>
                  <Link href="/" className="flex px-3 py-1.5 hover:bg-[hsla(20,8%,71%,.17)] bg-white border border-[#e1dbd6] rounded-[27px] md:text-[14px] text-[12px]">名古屋</Link>
                </li>
              </ul>
        </div>
        <SearchPrefecture />
      </div>
    </main>
  );
}
