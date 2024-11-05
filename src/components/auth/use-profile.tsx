import React from 'react';
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";

interface ModalProps {
    onClose: () => void;
}

const UserProfileModal: React.FC<ModalProps> = ({ onClose }) => {
    const { user } = useUser();
    const userId = user?.id;
    const email = user?.emailAddresses[0]?.emailAddress;
    const fullName = user?.firstName + " " + user?.lastName;

    const createUserInDB = async () => {
        try {
            const response = await fetch("/api/createUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    clerkId: userId,
                    email,
                    name: fullName,
                }),
            });
            const result = await response.json();
            console.log("User created:", result);
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    return (
        <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="bg-white inset-0 dark:bg-gray-600 rounded-lg p-8 shadow-lg max-w-lg w-full"
            >
                <h2 className="text-2xl font-bold mb-4">Welcome to our website</h2>
                <p className="mb-4">Please accept the terms and conditions.</p>
                <button
                    onClick={() => {
                        createUserInDB()
                        onClose()
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Accept
                </button>
            </motion.div>
        </div>
    );
};

export default UserProfileModal;
