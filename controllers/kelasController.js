const db = require('../config/db');

exports.getKelasByGuru = (req, res) => {
  const { guru_id } = req.query;
  console.log('[CONTROLLER] getKelasByGuru called');
  console.log('[CONTROLLER] Query parameter guru_id:', guru_id);

  if (!guru_id) {
    console.warn('[WARN] Parameter guru_id tidak ditemukan');
    return res.status(400).json({ message: 'Parameter guru_id dibutuhkan' });
  }

  const query = `
    SELECT id_kelas, nama_kelas 
    FROM kelas 
    WHERE guru_id = ?
  `;

  console.log('[DB] Menjalankan query untuk guru_id:', guru_id);

  db.query(query, [guru_id], (err, result) => {
    if (err) {
      console.error('[ERROR] Query error saat mengambil data kelas:', err);
      return res.status(500).json({ message: 'Gagal ambil data kelas' });
    }

    console.log(`[SUCCESS] ${result.length} kelas ditemukan untuk guru_id: ${guru_id}`);
    res.json({ guru_id, jumlah_kelas: result.length, kelas: result });
  });
};