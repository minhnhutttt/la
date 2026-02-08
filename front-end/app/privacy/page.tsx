"use client";

import { useTranslation } from "react-i18next";

export default function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-black">
        {t("privacy.title")}
      </h1>
      <div className="prose max-w-none text-black dark:text-black dark:prose-invert">
        <p className="mb-8">{t("privacy.intro")}</p>

        {(t("privacy.sections", { returnObjects: true }) as Array<{
          title: string;
          content: string;
          list?: string[];
          contact?: string;
        }>).map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-black">
              {section.title}
            </h2>
            <p className="mb-4">{section.content}</p>
            
            {section.list && (
              <ul className="list-disc pl-5 mb-4">
                {section.list.map((item, i) => (
                  <li key={i} className="mb-2">{item}</li>
                ))}
              </ul>
            )}
            
            {section.contact && (
              <p className="italic">{section.contact}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
