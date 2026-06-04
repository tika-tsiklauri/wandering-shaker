"use client";

import { useEffect, useState, useCallback } from "react";

export type ToastType = "success" | "error";

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  onDismiss: () => void;
}

export function Toast({ message, type, duration = 5000, onDismiss }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 300); // Wait for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(onDismiss, 300);
  };

  const bgColor = type === "success" ? "bg-[#354f32]" : "bg-red-700";
  const borderColor = type === "success" ? "border-l-[#4a6b47]" : "border-l-red-900";

  return (
    <div
      className={`fixed top-6 right-6 z-50 max-w-sm rounded-lg border border-l-4 ${bgColor} ${borderColor} shadow-lg transition-all duration-300 ease-out ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
      }`}
      role="alert"
    >
      <div className="flex items-start gap-3 p-4">
        <div className="flex-1">
          <p className="font-secondary text-sm text-white">{message}</p>
        </div>
        <button
          onClick={handleDismiss}
          className="text-white/70 hover:text-white transition"
          aria-label="Dismiss"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Global toast state manager
let globalToast: {
  show: (message: string, type: ToastType) => void;
} | null = null;

function setGlobalToast(manager: typeof globalToast) {
  globalToast = manager;
}

export function useToast() {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const showToast = useCallback((message: string, type: ToastType) => {
    setToast({ message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  // Expose showToast globally for forms without re-render issues
  useEffect(() => {
    setGlobalToast({ show: showToast });
  }, [showToast]);

  return { toast, showToast, hideToast };
}

export { globalToast };