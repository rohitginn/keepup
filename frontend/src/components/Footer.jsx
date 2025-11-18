// src/components/Footer.jsx
import React from 'react';
import ScrollReveal from './ui/ScrollReveal';
import { Highlighter } from './ui/highlighter';
import { Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer id="footer" className="bg-gray-950 border-t border-gray-800">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-sm font-semibold text-indigo-400 tracking-wider font-inter uppercase">Product</h3>
                        <ScrollReveal><ul role="list" className="mt-4 space-y-4 font-inter">
                            <li><a href="#" className="text-base text-gray-300 hover:text-indigo-400 transition">Features</a></li>
                            <li><a href="#" className="text-base text-gray-300 hover:text-indigo-400 transition">Pricing</a></li>
                            <li><a href="#" className="text-base text-gray-300 hover:text-indigo-400 transition">Security</a></li>
                        </ul></ScrollReveal>
                    </div>
                    <div className='font-inter'>
                        <ScrollReveal><h3 className="text-sm font-semibold text-indigo-400 tracking-wider uppercase">Company</h3>
                            <ul role="list" className="mt-4 space-y-4">
                                <li><a href="#" className="text-base text-gray-300 hover:text-indigo-400 transition">About Us</a></li>
                                <li><a href="#" className="text-base text-gray-300 hover:text-indigo-400 transition">Careers</a></li>
                                <li><a href="#" className="text-base text-gray-300 hover:text-indigo-400 transition">Blog</a></li>
                            </ul></ScrollReveal>
                    </div>
                    <div className='font-inter'>
                        <ScrollReveal><h3 className="text-sm font-semibold text-indigo-400 tracking-wider uppercase">Support</h3>
                            <ul role="list" className="mt-4 space-y-4">
                                <li><a href="#" className="text-base text-gray-300 hover:text-indigo-400 transition">Contact</a></li>
                                <li><a href="#" className="text-base text-gray-300 hover:text-indigo-400 transition">Help Center</a></li>
                                <li><a href="#" className="text-base text-gray-300 hover:text-indigo-400 transition">API</a></li>
                            </ul></ScrollReveal>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <span className="text-2xl font-bold text-indigo-400 tracking-wider">KeepUp</span>
                        <p className="mt-4 text-gray-100" >The last <Highlighter action='highlight' color='#c91e21'>to-do app</Highlighter>  you'll ever need.</p>
                    </div>
                </div>
                <div className="mt-12 font-geist flex justify-center border-t border-gray-800 pt-8">
                    <p className="text-base text-gray-300 text-center flex items-center justify-center gap-2">
                        &copy; 2025 KeepUp, Inc. All rights reserved. Made with
                        <Heart className="w-5 h-5 text-[#c91e21] inline-block" fill='#c91e21' />
                    </p>
                </div>
            </div>
        </footer>
    );
}