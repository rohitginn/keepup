import React, { useState } from 'react'
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import { ArrowLeft } from 'lucide-react';

export default function AuthPage({ onNavigate }) {
    const [isRegister, setIsRegister] = useState(false);
    const CurrentForm = isRegister ? RegisterPage : LoginPage;
    return (
        <div className="min-h-screen  bg-[#0A0A0A] flex flex-col items-center justify-center ">
            <div className="w-full">

                {/* Back Button */}
                <button
                    onClick={() => onNavigate('landing')}
                    className="flex items-center text-indigo-400 hover:text-indigo-300 border border-indigo-400 hover:border-indigo-300 px-2 py-1 mt-3 ml-2 rounded-full transition duration-150"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
                </button>

                {/* Render the current form, passing the toggle function down */}
                <CurrentForm setIsRegister={setIsRegister} onNavigate={onNavigate} />
            </div>
        </div>
    )
}
