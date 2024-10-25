// Adjust the path as necessary

import dbConnect from "./lib/dbConnect";

const testConnection = async () => {
    await dbConnect();
};

testConnection().catch((error) => {
    console.error("Error during database connection test:", error);
});
