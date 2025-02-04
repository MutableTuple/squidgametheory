import { supabase } from "./supabase";

export async function getAllTheories() {
  const { data, error } = await supabase.from("Theories").select("*");

  if (error) console.log(error);
  return data;
}

// Function to handle the actual database operation
export async function createTheory(author, content, title, twitter_handle) {
  const { data, error } = await supabase
    .from("Theories")
    .insert([{ author, content, title, twitter_handle }])
    .select();
  console.log(data);
  if (error) {
    console.log("Error creating theory:", error);
    return null; // Return null in case of error
  }

  return data; // Return the data in case of success
}

export const updateTheoryLikes = async (id, like, dislike) => {
  const { data, error } = await supabase
    .from("Theories") // Assuming "Theories" is your table name
    .update({ like: like, dislike: dislike }) // Update the like and dislike fields
    .eq("id", id) // Filter by the theory ID to ensure we update the correct record
    .select(); // Select the updated record to get the new values back

  console.log(data); // Log the data for debugging purposes

  if (error) {
    console.log("Error updating theory:", error);
    return null; // Return null if there's an error
  }

  return data; // Return the updated data
};
// _lib/data-service.js
export async function getRangedTheories(page = 1, limit = 10) {
  const from = (page - 1) * limit; // Calculate offset
  const { data, error } = await supabase
    .from("Theories")
    .select("*")
    .range(from, from + limit - 1); // Fetch theories with range (pagination)

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}
