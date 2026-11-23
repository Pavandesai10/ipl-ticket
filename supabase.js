import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = 'https://fvqatvafthzuntbwuguc.supabase.co'
const supabaseKey = 'sb_publishable_Jj5iQfkdueqh1u725UqBGw_QBQEZlxL'

export const supabase = createClient(supabaseUrl, supabaseKey)