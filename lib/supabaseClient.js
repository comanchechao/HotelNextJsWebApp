import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";

import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
const App = () => (
  <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
);
