import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Configure Supabase Auth library to use custom JWT authentication middleware
const authConfig = {
  jwt: {
    accessTokenKey: "access_token",
    authMiddleware: [smsAuthMiddleware],
  },
};

// Initialize Supabase Auth
const supabaseAuth = auth(supabaseClient, authConfig);

// async function authenticateWithSmsCode(phoneNumber, code) {
//   const { user, session, error } = await supabaseAuth.signIn(
//     { phoneNumber },
//     { password: code }
//   );
//   // ...
// }
// Access auth admin api
export const adminAuthClient = supabaseAdmin.auth.admin;
