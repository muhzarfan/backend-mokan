const supabase = require('../config/supabase');

const PengumumanModel = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('tb_pengumuman')
      .select('*')
      .order('createdAt', { ascending: false }); 
    
    if (error) throw error;
    return data;
  },
  
  getById: async (id) => {
    const { data, error } = await supabase
      .from('tb_pengumuman')
      .select('*')
      .eq('id_peng', id)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  create: async (pengumumanData) => {
    const dataToInsert = {
        ...pengumumanData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString() 
    };
    
    const { data, error } = await supabase
      .from('tb_pengumuman')
      .insert([dataToInsert]) 
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  update: async (id, pengumumanData) => {
    const updateData = {
      ...pengumumanData,
      updatedAt: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('tb_pengumuman')
      .update(updateData)
      .eq('id_peng', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  delete: async (id) => {
    const { error } = await supabase
      .from('tb_pengumuman')
      .delete()
      .eq('id_peng', id);
    
    if (error) throw error;
    return true;
  }
};

module.exports = PengumumanModel;