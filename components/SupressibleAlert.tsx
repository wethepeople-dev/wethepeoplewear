'use client'

import { useState } from 'react'
import { AlertCircle, XCircle, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Alert } from "@/components/ui/alert"

type AlertType = 'warning' | 'error'

interface SuppressibleAlertProps {
    type: AlertType
    message: string
}

export default function SuppressibleAlert({ type, message }: SuppressibleAlertProps) {
    const [isVisible, setIsVisible] = useState(true)

    if (!isVisible) return null

    const icon = type === 'warning' ? <AlertCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />
    const variantClass = type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' : 'bg-red-50 border-red-200 text-red-800'

    return (
        <Alert className={`${variantClass} py-3 px-4`}>
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3 flex-grow min-w-0">
                    {icon}
                    <p className="text-sm font-medium truncate">{message}</p>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsVisible(false)}
                    className="text-gray-400 hover:text-gray-500 flex-shrink-0 ml-3 h-6 w-6"
                    aria-label="Dismiss"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </Alert>
    )
}