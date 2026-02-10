"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { QuestionsArticle } from "./components/QuestionsArticle";

export default function QuestionsPage() {
  const [expand, setExpand] = useState(false);

  const categories = [
    {
      text: '離婚・男女問題',
      href: '/',
      icon: '/images/questions/ic-01.svg'
    },
    {
      text: '借金',
      href: '/',
      icon: '/images/questions/ic-02.svg'
    },
    {
      text: '相続',
      href: '/',
      icon: '/images/questions/ic-03.svg'
    },
    {
      text: '交通事故',
      href: '/',
      icon: '/images/questions/ic-04.svg'
    },
    {
      text: 'インターネット',
      href: '/',
      icon: '/images/questions/ic-05.svg'
    },
    {
      text: '消費者被害',
      href: '/',
      icon: '/images/questions/ic-06.svg'
    },
    {
      text: '犯罪・刑事事件',
      href: '/',
      icon: '/images/questions/ic-07.svg'
    },
    {
      text: '労働',
      href: '/',
      icon: '/images/questions/ic-08.svg'
    },
    {
      text: '債権回収',
      href: '/',
      icon: '/images/questions/ic-09.svg'
    },
    {
      text: '不動産・建築',
      href: '/',
      icon: '/images/questions/ic-10.svg'
    },
    {
      text: '国際・外国人問題',
      href: '/',
      icon: '/images/questions/ic-11.svg'
    },
    {
      text: '医療',
      href: '/',
      icon: '/images/questions/ic-12.svg'
    },
    {
      text: '企業法務',
      href: '/',
      icon: '/images/questions/ic-13.svg'
    },
    {
      text: '税務訴訟',
      href: '/',
      icon: '/images/questions/ic-14.svg'
    },
    {
      text: '行政事件',
      href: '/',
      icon: '/images/questions/ic-15.svg'
    },
    {
      text: '民事紛争の解決手続き',
      href: '/',
      icon: '/images/questions/ic-16.svg'
    },
    {
      text: '民事・その他',
      href: '/',
      icon: '/images/questions/ic-17.svg'
    },
  ]

  return (
    <div className="w-full">
      <div className="w-full max-w-[1104px] mx-auto">
        <div className="flex flex-start flex-wrap max-md:flex-col">
          <div className="md:mt-10 md:[flex-basis:66.6666666667%] md:max-w-[66.6666666667%] flex-col flex mb-[56px] md:px-6">
            <div className="h-[342px] mb-12 bg-[#f5f1ee] md:text-[16px] text-[14px]">
              <div className="py-6 md:py-12 md:mx-12 mx-6 flex justify-end flex-col h-full bg-[center_15%] [background-size:90%_auto] md:bg-[position:top_20%_right_0] md:[background-size:60%_auto] bg-[url(/images/questions/cover.svg)] bg-no-repeat">
                <p className="md:text-[27px] text-[20px] font-bold mb-4">みんなの法律相談</p>
                <p className="md:text-[16px] text-[14px]">みんなの法律相談には、147万件以上の様々な分野の相談と、現役の弁護士の回答が投稿されています。 ご自身だけでは対処することがむずかしい法律分野のトラブルについて、具体的な対応方法や知識などを知ることができます。</p>
              </div>
            </div>
            <div className="max-xl:px-6">
              <p className="md:text-[22px] text-[20px] font-bold mb-6">法律相談を検索する</p>
              <div className="relative flex flex-1 w-full max-md:mt-6">
                <div className="relative w-full md:text-[18px] text-[16px]">
                  <input type="text" className="w-full [box-shadow:inset_1px_1px_2px_rgba(38,_34,_33,_.08)] font-normal border border-[#bbb3af] rounded-lg py-2 pr-10 pl-4" placeholder='例）離婚　養育費' />
                  <div className="absolute w-10 right-0 bottom-0 top-0 flex items-center justify-center border-l border-[#bbb3af] text-[#bbb3af]">
                    <Search size={18} />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-center">
                  <button onClick={() => setExpand(true)} className={cn("justify-center items-center gap-2 border-t border-[#e9e5e4] py-6 flex relative after:block after:border-t-[2px] after:border-r-[2px] after:h-2 after:w-2 after:rotate-[135deg] after:border-[#f7723e] after:right-4 md:text-[18px] text-[16px] font-bold text-[#315dbb] px-6", expand && 'hidden')}>
                    もっと詳しく絞り込む
                  </button>
                </div>
                <div className={cn("mt-6 flex flex-col gap-6", expand ? 'flex' : 'hidden')}>
                  <div>
                    <label className="flex items-center gap-2 py-2 relative md:text-[18px] text-[16px]">
                      <input type="checkbox" className="peer sr-only" />
                      <span className="flex justify-center relative aspect-square border-2 border-[#bbb3af] rounded h-4 w-4 peer-checked:bg-[#f7723e] peer-checked:border-transparent after:border-l-[3px] after:border-b-[3px] after:border-white after:h-1.5 after:w-2.5 after:absolute after:top-0.5 after:-rotate-45"></span>
                      ベストアンサーあり
                    </label>
                  </div>
                  <div>
                    <p className="md:text-[18px] text-[16px] font-bold">質問日</p>
                    <div className="">
                      <select className="border border-[#bbb3af] rounded-lg w-full md:text-[18px] text-[16px] [box-shadow:inset_1px_1px_2px_rgba(38,_34,_33,_.08)] py-3 pr-10 pl-4 leading-snug appearance-none bg-[url(/icons/select.svg)] bg-[position:right_18px_top_50%] bg-no-repeat" aria-label="都道府県を選択">
                        <option value="day">24時間以内</option>
                        <option value="week">1週間以内</option>
                        <option value="month">1ヶ月以内</option>
                        <option value="3months">3ヶ月以内</option>
                        <option value="6months">6ヶ月以内</option>
                        <option value="year">1年以内</option>
                        <option value="before_year">1年以前</option>
                        <option value="none">指定しない</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <p className="md:text-[18px] text-[16px] font-bold">弁護士回答数</p>
                    <div className="flex items-end">
                      <div className="flex-1">
                        <p className="md:text-[12px] text-[10px] text-[#716c6b] py-1">最低回答数</p>
                        <select className="border border-[#bbb3af] rounded-lg w-full md:text-[18px] text-[16px] [box-shadow:inset_1px_1px_2px_rgba(38,_34,_33,_.08)] py-3 pr-10 pl-4 leading-snug appearance-none bg-[url(/icons/select.svg)] bg-[position:right_18px_top_50%] bg-no-repeat" aria-label="都道府県を選択">
                          <option value="1">1件</option>                    
                          <option value="3">3件</option>
                          <option value="5">5件</option>                    
                          <option value="10">10件</option>                    
                          <option value="30">30件</option>                    
                          <option value="50">50件</option>                    
                          <option value="100">100件</option>
                        </select>
                      </div>
                      <span className="py-4 w-[72px] flex justify-center">〜</span>
                      <div className="flex-1">
                        <p className="md:text-[12px] text-[10px] text-[#716c6b] py-1">最高回答数</p>
                        <select className="border border-[#bbb3af] rounded-lg w-full md:text-[18px] text-[16px] [box-shadow:inset_1px_1px_2px_rgba(38,_34,_33,_.08)] py-3 pr-10 pl-4 leading-snug appearance-none bg-[url(/icons/select.svg)] bg-[position:right_18px_top_50%] bg-no-repeat" aria-label="都道府県を選択">
                          <option value="1">1件</option>                    
                          <option value="3">3件</option>
                          <option value="5">5件</option>                    
                          <option value="10">10件</option>                    
                          <option value="30">30件</option>                    
                          <option value="50">50件</option>                    
                          <option value="100">100件</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="md:text-[18px] text-[16px] font-bold">表示順</p>
                    <div className="">
                      <select className="border border-[#bbb3af] rounded-lg w-full md:text-[18px] text-[16px] [box-shadow:inset_1px_1px_2px_rgba(38,_34,_33,_.08)] py-3 pr-10 pl-4 leading-snug appearance-none bg-[url(/icons/select.svg)] bg-[position:right_18px_top_50%] bg-no-repeat" aria-label="都道府県を選択">
                          <option value="lawyer_answer">弁護士回答の多い順</option>
                          <option value="latest">新着順</option>
                          <option value="none">指定しない</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-[56px]">
                    <div className="flex justify-center md:text-[20px] text-[18px] text-center mb-4">
                      <span className="font-bold">597399</span>件見つかりました
                    </div>
                    <div className="flex justify-center">
                      <button className="max-w-[400px] w-full bg-[#f7723e] rounded-full text-white p-4 font-bold md:text-[18px] text-[14px]">絞り込み検索する</button>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex justify-between items-center md:text-[18px] text-[16px] font-bold">
                      <p>離婚・男女問題の新着相談</p>
                          <Link href="#" className="flex relative after:absolute after:border-t-[2px] after:border-r-[2px] after:h-2 after:w-2 after:rotate-45 after:-translate-y-1/2 after:border-[#f7723e] after:top-1/2 after:right-4 md:text-[16px] text-[14px] font-bold text-[#315dbb] px-6">
                      一覧へ
                    </Link>
                    </div>
                    <div className="flex max-xl:px-12 max-md:px-6">
                      <QuestionsArticle link="#" images={['/images/1601175_1.png','/images/1601175_1.png']} title="反訴状に共同親権を記載する..." desc="【相談の背景】離婚裁判中です。私は被告側です。反訴状を提出するのですが、" count="2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:[flex-basis:33.3333333333%] md:mt-10 md:max-w-[33.3333333333%] px-3 md:px-6 space-y-6">
            <p className="md:text-[18px] text-[16px] font-bold mb-6">カテゴリから相談を探す</p>
            <div className="">
              {categories.map((category, i) => (
                <Link href={category.href} className="flex items-center relative gap-4 md:text-[18px] text-[16px] font-bold text-[#315dbb] after:absolute after:border-t-[2px] after:border-r-[2px] after:h-2 after:w-2 after:rotate-45 after:-translate-y-1/2 after:border-[#f7723e] after:top-1/2 after:right-4 border-b border-[#e9e5e4] py-4 pr-4">
                    <Image
                      src={category.icon}
                      alt=""
                      width={16}
                      height={16}
                    />
                    {category.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-12 flex justify-center">
        a
      </div>
    </div>
  );
}