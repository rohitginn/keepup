import React from 'react';
import { CheckCircle, Clock, TrendingUp, Sparkles, User, PlayCircle, Check, Zap, Heart, Server, Lock, ArrowRight } from 'lucide-react';
import { reviews } from '../constants/testimonials';
import { FEATURES_DATA } from '../constants/features';
import { COMPANIES } from '../constants/appData';
import ScrollReveal from './ui/ScrollReveal'; // import our scroll reveal
import { Highlighter } from './ui/highlighter';
import TrueFocus from './TrueFocus';
import { ShineBorder } from './ui/shine-border';
import { cn } from '@/lib/utils';
import { Marquee } from './ui/marquee';

const iconMap = { Clock, TrendingUp, Sparkles };

// Feature Card with reveal
const FeatureCard = ({ iconName, title, description, color, delay = 0 }) => {
    const Icon = iconMap[iconName];
    return (
        <ScrollReveal delay={delay}>
            {/* Consistent Card Background */}
            <div className="p-6 bg-black/60 rounded-xl shadow-xl border border-gray-800 transition transform hover:shadow-2xl hover:scale-[1.02] duration-300">
                <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                <div className={`p-3 inline-flex items-center justify-center rounded-full ${color} mb-4`}>
                    <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-100 mb-3">{title}</h3>
                <p className="text-gray-400">{description}</p>
            </div>
        </ScrollReveal>
    );
};

// Testimonials marquee with reveal
const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const ReviewCard = ({
    img,
    name,
    username,
    body,
}) => {
    return (
        <figure
            className={cn(
                "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                // light styles
                "border-gray-950/10 bg-gray-950/1 hover:bg-gray-950/5",
                // dark styles
                "dark:border-gray-50/10 dark:bg-gray-50/10 dark:hover:bg-gray-50/15"
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <img className="rounded-full" width="32" height="32" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm text-gray-200  font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium text-gray-200 dark:text-white/40">{username}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-gray-200 text-sm">{body}</blockquote>
        </figure>
    )
}

export default function FeaturesSection({onNavigate}) {
    return (
        <>
            <div className="min-h-screen w-full relative">
                {/* Dark Horizon Glow */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #0d1a36 100%)",
                    }}
                />
                {/* Your Content/Components */}

                {/* 1. Features Section (Main Content Area) */}
                <section id="features" className="py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <ScrollReveal><h2 className=" text-xl font-semibold text-indigo-400 tracking-wide uppercase">KEY CAPABILITIES</h2></ScrollReveal>
                        <ScrollReveal delay={50}><p className="mt-2 text-3xl font-extrabold text-gray-100 sm:text-4xl">Built for Focus and Security</p></ScrollReveal>
                        <ScrollReveal delay={100}><p className="mt-4 max-w-2xl text-xl font-inter pb-2 text-gray-200 mx-auto">
                            KeepUp secures your data with <Highlighter action='underline' color='#C212A2'>robust authentication</Highlighter>  and simplifies your workflow so you can stop worrying and start achieving.
                        </p></ScrollReveal>

                        <div className="mt-16 grid grid-cols-1  gap-10 sm:grid-cols-2 lg:grid-cols-3">
                            {FEATURES_DATA.map((f, i) => <FeatureCard key={f.title} {...f} delay={i * 100} />)}
                        </div>


                    </div>
                </section>
            </div>

            {/* 2. Companies */}
            <div className="min-h-screen w-full relative">
                {/* Azure Depths */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        background: "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
                    }}
                />
                {/* Your Content/Components */}

                <section className="py-12 bg-gray-950 text-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ScrollReveal><h2 className="text-lg font-semibold font-geist text-gray-500 uppercase tracking-wider mb-6">Trusted by Productivity Leaders</h2></ScrollReveal>
                        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">

                            {COMPANIES.map((c, i) => (
                                <ScrollReveal key={c.name} delay={i * 50}>
                                    <span className="text-3xl font-extrabold font-inter text-gray-100 hover:text-indigo-400/70 transition duration-300 ease-in-out">
                                        <Highlighter action='underline' color='yellow'>{c.name}</Highlighter>
                                    </span>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>


                {/* 3. Testimonials */}
                <section id="testimonials" className="py-20 bg-gray-950">
                    <div className="text-center mb-8">
                        <ScrollReveal><h2 className="text-xl font-geist font-semibold text-indigo-400 tracking-wide">What Our Users Say</h2></ScrollReveal>
                        <ScrollReveal delay={50}><p className="mt-2 text-3xl font-bold text-gray-100 sm:text-4xl">Real Feedback. Real Results.</p></ScrollReveal>
                    </div>
                    <Marquee pauseOnHover className="[--duration:20s]">
                        {firstRow.map((review) => (
                            <ReviewCard key={review.username} {...review} />
                        ))}
                    </Marquee>
                    <Marquee reverse pauseOnHover className="[--duration:20s]">
                        {secondRow.map((review) => (
                            <ReviewCard key={review.username} {...review} />
                        ))}
                    </Marquee>
                </section>
            </div>

            {/* 4. CTA */}
            <section className="py-16 bg-gray-950">
                <div className="max-w-4xl mx-auto p-10 bg-indigo-950 border border-indigo-800 rounded-2xl shadow-2xl text-center">
                    <ScrollReveal><h3 className="text-3xl font-bold text-white mb-4">Ready to Focus? Click below to start.</h3>
                        <p className="text-indigo-200 mb-8 max-w-2xl mx-auto">See how fast it is to go from chaos to clarity in three simple steps.</p></ScrollReveal>

                    <ScrollReveal><div className="flex justify-center space-x-8 text-white mb-10">
                        <div className="flex items-center text-green-300 font-medium">
                            <Check className="w-5 h-5 mr-2" /> Quick Setup
                        </div>
                        <div className="flex items-center text-yellow-300 font-medium">
                            <Zap className="w-5 h-5 mr-2" /> Instant Prioritization
                        </div>
                        <div className="flex items-center text-indigo-300 font-medium">
                            <Check className="w-5 h-5 mr-2" /> Seamless Tracking
                        </div>
                    </div></ScrollReveal>

                    <button onClick={() => onNavigate("auth")} className="inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-indigo-900 bg-white rounded-xl shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105">
                        <span className="mr-2">Get Started</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </section>


            <section className="py-16 bg-gray-950">
                <ScrollReveal><div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-6">
                    <div className="text-center p-6 bg-gray-900 rounded-xl border border-red-900/50">
                        <Lock className="w-8 h-8 mx-auto text-red-400 mb-3" />
                        <h3 className="text-lg font-semibold text-gray-100">Zero Data Selling</h3>
                        <p className="text-sm text-gray-400">Your tasks are yours. We guarantee complete privacy.</p>
                    </div>
                    <div className="text-center p-6 bg-gray-900 rounded-xl border border-green-900/50">
                        <Server className="w-8 h-8 mx-auto text-green-400 mb-3" />
                        <h3 className="text-lg font-semibold text-gray-100">99.9% Uptime</h3>
                        <p className="text-sm text-gray-400">Reliable task management, whenever you need it.</p>
                    </div>
                    <div className="text-center p-6 bg-gray-900 rounded-xl border border-indigo-900/50">
                        <Heart className="w-8 h-8 mx-auto text-indigo-400 mb-3" />
                        <h3 className="text-lg font-semibold text-gray-100">Built by Devs</h3>
                        <p className="text-sm text-gray-400">Engineered for speed, security, and developer joy.</p>
                    </div>
                </div></ScrollReveal>
            </section>
        </>
    );
}