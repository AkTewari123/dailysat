import { Badge } from '@/components/common/Badge'
import React from 'react'

interface HeaderProps {
    badgeText: string;
    text: string;
    gradientText?: string;
    description: string
}

const Header: React.FC<HeaderProps> = ({ badgeText, text, gradientText, description}) => {
  return (
    <div>
        <Badge className="px-3 py-1 bg-blue-100 text-blue-700 border-blue-200 rounded-full mb-2 hover:bg-blue-200 duration-300">
            {badgeText}
        </Badge>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {text}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                {" "}
                {gradientText}
            </span>
        </h2>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl mt-4">
            {description}
        </p>
    </div>
  )
}

export default Header