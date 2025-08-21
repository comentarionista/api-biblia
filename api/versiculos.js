const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

module.exports = async (req, res) => {
  // Verifica se a requisição tem a chave correta
  const token = req.headers['x-api-key'];
  if (!token || token !== process.env.API_SECRET_KEY) {
    return res.status(403).json({ sucesso: false, erro: 'Acesso negado. Token inválido.' });
  }

  const { data, error } = await supabase.from('versiculos').select('*');

  if (error) {
    return res.status(500).json({ sucesso: false, erro: error.message });
  }
  res.status(200).json({ sucesso: true, dados: data });
};

