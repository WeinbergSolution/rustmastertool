require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const { data, error } = await supabase.from('server_map_identity').select('monument_names').not('monument_names', 'is', null).limit(200);
  if (error) console.error(error);
  
  const allMonuments = data.map(d => d.monument_names).flat();
  const uniqueMonuments = [...new Set(allMonuments)];
  
  console.log("All unique monuments:");
  console.log(uniqueMonuments.filter(m => m.toLowerCase().includes('oil') || m.toLowerCase().includes('rig')));
}
run();
