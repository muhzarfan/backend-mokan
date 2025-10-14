const supabase = require('../config/supabase');

const ProdukModel = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('tb_produk')
      .select('*')
    
    if (error) throw error;
    return data;
  },
  
  getById: async (id) => {
    const { data, error } = await supabase
      .from('tb_produk')
      .select('*')
      .eq('id_produk', id)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  create: async (produkData) => {
    const { data, error } = await supabase
      .from('tb_produk')
      .insert([produkData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  update: async (id, produkData) => {
    const updateData = {
      ...produkData
    };
    
    const { data, error } = await supabase
      .from('tb_produk')
      .update(updateData)
      .eq('id_produk', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  delete: async (id) => {
    const { error } = await supabase
      .from('tb_produk')
      .delete()
      .eq('id_produk', id);
    
    if (error) throw error;
    return true;
  },
  
  uploadImage: async (file) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    
    const { data, error } = await supabase.storage
      .from('arsip-gambar')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false
      });
    
    if (error) throw error;
    
    // Get public URL
    const { data: publicData } = supabase.storage
      .from('arsip-gambar')
      .getPublicUrl(fileName);
    
    return publicData.publicUrl;
  },
  
  deleteImage: async (imageUrl) => {
    try {
      // Extract file name from URL
      const fileName = imageUrl.split('/').pop();
      
      const { error } = await supabase.storage
        .from('arsip-gambar')
        .remove([fileName]);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      return false;
    }
  }
};

module.exports = ProdukModel;