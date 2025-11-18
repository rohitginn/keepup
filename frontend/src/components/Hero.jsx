import React from "react";
import { Zap } from "lucide-react";
import { AuroraText } from "./ui/aurora-text.jsx";
import BgAnimateButton from "./ui/bg-animate-button.jsx";
import Header from "./Header.jsx";

const cn = (...classes) => classes.filter(Boolean).join(" ");

function AnimatedGradientText({
  children,
  className,
  speed = 1.5,
  colorFrom = "#a5b4fc",
  colorTo = "#eef2ff",
  ...props
}) {
  const animationStyle = `
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-gradient-text {
      animation: gradient var(--bg-size) ease infinite;
    }
  `;
  return (
    <>
      <style jsx="true">{animationStyle}</style>
      <span
        style={{
          "--bg-size": `${speed * 300}%`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
        }}
        className={cn(
          "animate-gradient-text inline-flex items-center space-x-1 p-1 px-3 rounded-full text-xs font-semibold uppercase tracking-widest",
          "bg-linear-to-r from-(--color-from) via-(--color-to) to-(--color-from) bg-size-[var(--bg-size)_100%] bg-clip-text text-transparent transition-all duration-300",
          className
        )}
        {...props}
      >
        {children}
      </span>
    </>
  );
}

export default function Hero({ onNavigate }) {
  return (
      <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden"
      >
      
      {/* Background Aurora Effect */}
      <div
        
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-40">
        {/* Animated Badge */}
        <div className="mb-3 flex items-center justify-center">
          <AnimatedGradientText
            speed={1.5}
            colorFrom="#a5b4fc"
            colorTo="#eef2ff"
            className="border border-indigo-700 bg-gray-900 text-white"
          >
            <Zap className="w-4 h-4 mr-1" /> Stop Planning, Start Doing
          </AnimatedGradientText>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-gray-100 leading-tight mb-6">
          Master Your Day <br className="hidden sm:inline" />
          with
          <AuroraText className="ml-3 font-extrabold text-indigo-400">
            KeepUp.
          </AuroraText>
        </h1>

        <p className="max-w-3xl font-inter mx-auto lg:text-xl text-gray-400 mb-10">
          The secure to-do application designed for focus. Organize your tasks,
          track your progress, and maintain control over your most important
          projects, all in one place.
        </p>

        <div className="flex justify-center space-x-4">
          <BgAnimateButton
            className="font-semibold text-xl"
            rounded="full"
            size="lg"
            key="spin-slow"
            onClick={() => onNavigate("auth")}
            gradient="ocean"
            shadow="deeper"
          >
            Start Now
          </BgAnimateButton>
        </div>
      </div>
    </section>
  );
}
