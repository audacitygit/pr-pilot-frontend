import { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children?: ReactNode;
    loading?: boolean;
    loadingMessage?: string;
    error?: string | null;
    successMessage?: string | null;
    actionLabel?: string;
    onAction?: () => void;
    isActionDisabled?: boolean;
}

/**
 * Reusable Modal Component.
 * Supports loading states, errors, success messages, and action buttons.
 */
export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    loading = false,
    loadingMessage = "Processing...",
    error = null,
    successMessage = null,
    actionLabel = "Confirm",
    onAction,
    isActionDisabled = false,
}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                {/* Close Button (Always Present) */}
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
                    <X size={20} />
                </button>

                {/* 🔹 Loading State (Replaces Content) */}
                {loading && (
                    <div className="flex flex-col items-center text-center">
                        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mb-2"></div>
                        <p className="text-lg font-semibold">{loadingMessage}</p>
                    </div>
                )}

                {/* 🔹 Error State (Replaces Content) */}
                {!loading && error && (
                    <div className="text-red-500 text-center">
                        <p className="font-semibold text-lg">An error occurred</p>
                        <p className="text-sm">{error}</p>
                        <button
                            className="mt-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                )}

                {/* 🔹 Success State (Replaces Content) */}
                {!loading && !error && successMessage && (
                    <div className="text-green-500 text-center">
                        <p className="font-semibold text-lg">{successMessage}</p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                            onClick={onClose}
                        >
                            OK
                        </button>
                    </div>
                )}

                {/* 🔹 Modal Content (Only Displayed If No Loading/Error/Success) */}
                {!loading && !error && !successMessage && (
                    <>
                        {/* Modal Title */}
                        <h2 className="text-xl font-bold mb-4">{title}</h2>

                        {/* Modal Content */}
                        {children}

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            {onAction && (
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:bg-gray-400"
                                    disabled={isActionDisabled}
                                    onClick={onAction}
                                >
                                    {actionLabel}
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
