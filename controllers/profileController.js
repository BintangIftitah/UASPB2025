const db = require('../config/db');

exports.getProfile = (req, res) => {
  const { username, role } = req.user;

  if (!username || !role) {
    return res.status(400).json({ message: 'User data missing in token' });
  }

  if (role === 'guru') {
    const sql = 'SELECT id, nama, nip, jenis_kelamin, alamat, no_hp FROM guru WHERE username = ? LIMIT 1';
    db.query(sql, [username], (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });
      if (results.length === 0) return res.status(404).json({ message: 'Profil guru tidak ditemukan' });

      return res.json({ role: 'guru', profile: results[0] });
    });

  } else if (role === 'siswa') {
    const sql = `
      SELECT s.id, s.nama, s.nis, s.jenis_kelamin, k.nama_kelas, s.alamat, s.no_hp
      FROM siswa s
      JOIN kelas k ON s.id_kelas = k.id_kelas
      WHERE s.username = ?
      LIMIT 1
    `;
    db.query(sql, [username], (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });
      if (results.length === 0) return res.status(404).json({ message: 'Profil siswa tidak ditemukan' });

      return res.json({ role: 'siswa', profile: results[0] });
    });

  } else {
    return res.status(400).json({ message: 'Role tidak dikenali' });
  }
};