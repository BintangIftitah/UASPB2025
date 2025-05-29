const Absen = require('../models/Absen');

exports.submitAbsen = (req, res) => {
  const { id_kelas, tanggal, guru_id, absensi } = req.body;

  if (!id_kelas || !tanggal || !guru_id || !Array.isArray(absensi)) {
    return res.status(400).json({ message: 'Data absen tidak lengkap' });
  }

  const absenData = absensi.map(item => [
    item.id_siswa,
    id_kelas,
    tanggal,
    item.status,
    guru_id
  ]);

  Absen.insert(absenData, (err, result) => {
    if (err) {
      console.error('Insert absen error:', err);
      return res.status(500).json({ message: 'Gagal menyimpan data absen', error: err });
    }

    res.json({ message: 'Absen berhasil disimpan', inserted: result.affectedRows });
  });
};

exports.getAbsen = (req, res) => {
  const { id_kelas, tanggal } = req.query;

  if (!id_kelas || !tanggal) {
    return res.status(400).json({ message: 'Parameter tidak lengkap' });
  }

  Absen.getByKelasAndTanggal(id_kelas, tanggal, (err, result) => {
    if (err) {
      console.error('Get absen error:', err);
      return res.status(500).json({ message: 'Gagal mengambil data absen', error: err });
    }

    // Beri respons lebih rapi
    res.json({
      tanggal,
      id_kelas,
      jumlah_siswa: result.length,
      data: result
    });
  });
};