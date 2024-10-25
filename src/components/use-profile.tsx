import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const UserProfile = () => {
    const { user } = useUser();

    // Example data you can retrieve from Clerk
    const userId = user?.id;
    const email = user?.emailAddresses[0]?.emailAddress;
    const fullName = user?.firstName + " " + user?.lastName;

    // Call API to save user to your database
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

    // Call the function when the component mounts or when user is available
    useEffect(() => {
        if (user) {
            createUserInDB();
        }
    }, [user]);

    return <div>Welcome, {fullName}</div>;
};

export default UserProfile;