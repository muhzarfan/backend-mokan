const supabase = require('../config/supabase');

const ProdukModel = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('tb_produk')
      .select('*');

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
    const { data, error } = await supabase
      .from('tb_produk')
      .update(produkData)
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

    // Generate signed URL berlaku 1 jam
    const { data: signedData, error: signedError } = await supabase.storage
      .from('arsip-gambar')
      .createSignedUrl(fileName, 3600);

    if (signedError) throw signedError;
    return signedData.signedUrl;
  },

  deleteImage: async (imageUrl) => {
    try {
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
  },

  // Helper untuk generate signed URL untuk file yang sudah ada
  generateSignedUrl: async (imagePath, expires = 3600) => {
    if (!imagePath) return null;
    const fileName = imagePath.split('/').pop();
    const { data, error } = await supabase.storage
      .from('arsip-gambar')
      .createSignedUrl(fileName, expires);
    if (error) return null;
    return data.signedUrl;
  }
};

module.exports = ProdukModel;
