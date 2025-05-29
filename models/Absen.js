const db = require('../config/db');

const Absen = {
  // Insert multiple rows of absen
  insert: (data, callback) => {
    const query = `
      INSERT INTO absen (id_siswa, id_kelas, tanggal, status, guru_id)
      VALUES ?
    `;
    db.query(query, [data], callback);
  },

  // Get absen data by class and date with additional info
  getByKelasAndTanggal: (id_kelas, tanggal, callback) => {
    const query = `
      SELECT 
        absen.id,
        absen.id_siswa,
        siswa.nama AS nama_siswa,
        siswa.nis,
        siswa.jenis_kelamin,
        absen.tanggal,
        absen.status,
        kelas.nama_kelas,
        guru.nama AS nama_guru
      FROM absen
      JOIN siswa ON absen.id_siswa = siswa.id
      JOIN kelas ON absen.id_kelas = kelas.id_kelas
      JOIN guru ON absen.guru_id = guru.id
      WHERE absen.id_kelas = ? AND absen.tanggal = ?
    `;
    db.query(query, [id_kelas, tanggal], callback);
  }
};

module.exports = Absen;