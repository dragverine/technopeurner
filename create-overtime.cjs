const fs = require('fs');

const data = {
  "title": "Modul HRD - Overtime (Lembur) - Panduan Lengkap",
  "description": "Panduan lengkap menggunakan Modul Overtime dalam sistem HRD GIMS mencakup overtime request, approval workflow, rate multiplier calculation (1.5x, 2.0x, 3.0x), overtime balance tracking, compliance dengan labor law, dan integration dengan payroll untuk perhitungan gaji lembur.",
  "slug": "modul-overtime-panduan-lengkap",
  "module": "hr",
  "subcategory": "overtime",
  "author": "Tim GIMS",
  "createdAt": "2026-04-21",
  "updatedAt": "2026-04-21",
  "tags": ["hr", "overtime", "lembur", "overtime-request", "overtime-approval", "overtime-pay", "rate-multiplier"],
  "content": [
    {
      "type": "text",
      "body": "Modul Overtime mengelola seluruh proses overtime (lembur) karyawan mulai dari request, approval workflow, perhitungan jam lembur dengan rate multiplier berbeda (weekday 1.5x, weekend 2.0x, holiday 3.0x), compliance dengan labor law, tracking overtime balance, hingga integration dengan payroll untuk automatic payment calculation."
    },
    {
      "type": "heading",
      "level": 2,
      "body": "Integrasi Antar Modul"
    },
    {
      "type": "text",
      "body": "Modul Overtime terintegrasi dengan:\n\n1. **Attendance**: OT approved auto-mark dalam attendance record\n2. **Holiday**: Determine rate multiplier berdasarkan date (weekday 1.5x, weekend 2.0x, holiday 3.0x)\n3. **Employee**: Hourly rate dari payroll master untuk OT calculation\n4. **Payroll**: Approved OT auto-include dalam payroll dengan calculation Hours × Rate × Multiplier\n5. **Project** (optional): Link OT ke project untuk cost tracking"
    }
  ]
};

fs.writeFileSync('./src/data/help-center/articles/hr/overtime/modul-overtime-panduan-lengkap.json', JSON.stringify(data, null, 2), 'utf8');
console.log('✓ Overtime JSON created successfully');
