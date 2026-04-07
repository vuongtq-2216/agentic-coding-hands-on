"use client";

import { useEffect, useState } from "react";
import type { SpotlightData } from "@/types/kudos";
import { fetchSpotlightData } from "@/services/kudos";

export function SpotlightBoard() {
  const [data, setData] = useState<SpotlightData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const result = await fetchSpotlightData();
        setData(result);
      } catch {
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full lg:w-[1157px] h-[300px] lg:h-[548px] border border-[#998C5F] rounded-[47px] bg-[#00070C] flex items-center justify-center animate-pulse">
        <span className="font-[family-name:var(--font-montserrat)] text-2xl font-bold text-white/20">
          Loading...
        </span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full lg:w-[1157px] h-[300px] lg:h-[548px] border border-[#998C5F] rounded-[47px] bg-[#00070C] flex items-center justify-center">
        <span className="font-[family-name:var(--font-montserrat)] text-lg font-bold text-white/40">
          Unable to load spotlight
        </span>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-[1157px] h-[300px] lg:h-[548px] border border-[#998C5F] rounded-[47px] bg-[#00070C] relative overflow-hidden p-8">
      {/* Total Count */}
      <div className="absolute top-8 left-8 z-10">
        <h3 className="font-[family-name:var(--font-montserrat)] text-2xl lg:text-4xl font-bold text-white leading-[44px]">
          {data.totalKudos} KUDOS
        </h3>
      </div>

      {/* Simple Node Visualization */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 600 400"
          className="w-full h-full"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        >
          {/* Edges */}
          {data.edges.map((edge, i) => {
            const from = data.nodes.find((n) => n.userId === edge.from);
            const to = data.nodes.find((n) => n.userId === edge.to);
            if (!from || !to) return null;
            return (
              <line
                key={`edge-${i}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="#FFEA9E"
                strokeWidth={Math.min(edge.weight, 3) * 0.5}
                opacity={0.2}
              />
            );
          })}

          {/* Nodes */}
          {data.nodes.map((node) => (
            <g key={node.userId} transform={`translate(${node.x}, ${node.y})`}>
              <circle
                r={12}
                fill="#FFEA9E"
                opacity={0.6}
                className="hover:opacity-100 transition-opacity cursor-pointer"
              />
              <text
                y={22}
                textAnchor="middle"
                fill="white"
                fontSize={7}
                fontWeight={700}
                fontFamily="Montserrat, sans-serif"
              >
                {node.name.split(" ").pop()}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
