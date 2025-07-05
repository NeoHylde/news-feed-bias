"use client";
import React, { useEffect, useState } from "react";

type Article = {
  title: string;
  source: string;
  link: string;
  pubDate?: string;
};

type Clusters = {
  [clusterId: string]: Article[];
};

const Header = () => {
  const [clusters, setClusters] = useState<Clusters>({});

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/clusters")
      .then((res) => res.json())
      .then((data) => setClusters(data))
      .catch((err) => console.error("Failed to fetch clusters:", err));
  }, []);

  return (
    <div className="self-stretch px-6 py-40 bg-Background-Default-Secondary inline-flex flex-col justify-start items-center gap-8">
      <div className="flex flex-col justify-start items-center gap-2">
        <div className="text-center text-7xl font-bold leading-[86.40px]">
          News Feed Bias (Demo)
        </div>
        <div className="text-center text-base font-semibold leading-snug">
          Understand how your favorite news publisher represents their latest
          stories.
        </div>
      </div>

      <div className="mt-10 w-full max-w-4xl text-left">
        {Object.keys(clusters).length === 0 ? (
          <p>Loading clusters...</p>
        ) : (
          Object.entries(clusters).map(([clusterId, articles]) => (
            <div key={clusterId} className="mb-6 border-b pb-4">
              <h3 className="text-xl font-semibold mb-2">Topic #{clusterId}</h3>
              <ul className="text-sm list-disc pl-6">
                {articles.map((article, index) => (
                  <li key={index}>
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      [{article.source}] {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Header;
