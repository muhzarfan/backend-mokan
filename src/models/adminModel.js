const supabase = require('../config/supabase');

const AdminModel = {
  findByUsername: async (username) => {
    const { data, error } = await supabase
      .from('tb_admin')
      .select('*')
      .eq('username', username)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  findById: async (id) => {
    const { data, error } = await supabase
      .from('tb_admin')
      .select('id, username, created_at')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }
};

module.exports = AdminModel;