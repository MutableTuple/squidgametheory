// "use server";

// export async function AddTheory(formData) {
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email: formData.get("email"),
//     password: formData.get("password"),
//   });

//   if (error) {
//     console.log("Cannot login", error);
//     return { error };
//   }

//   if (data?.session) {
//     await setSession(data.session); // Store full session in cookies
//   }

//   console.log("LOGIN DATA", data);
//   return { user: data.user, session: data.session };
// }
