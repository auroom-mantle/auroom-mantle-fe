// Demo Data Generators and Simulators for KYC Flow
// ⚠️ FOR DEMO PURPOSES ONLY - Not connected to real verification services

const INDONESIAN_FIRST_NAMES = [
    'Budi', 'Siti', 'Ahmad', 'Dewi', 'Andi', 'Putri', 'Rudi', 'Maya',
    'Hendra', 'Rina', 'Agus', 'Lestari', 'Bambang', 'Sri', 'Joko', 'Wati',
];

const INDONESIAN_LAST_NAMES = [
    'Santoso', 'Wijaya', 'Kusuma', 'Pratama', 'Saputra', 'Wibowo', 'Setiawan',
    'Permana', 'Nugroho', 'Hidayat', 'Firmansyah', 'Suryanto', 'Kurniawan',
];

const INDONESIAN_PROVINCES = [
    'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Bali',
    'Sumatera Utara', 'Sumatera Barat', 'Kalimantan Timur', 'Sulawesi Selatan',
];

const INDONESIAN_CITIES = {
    'DKI Jakarta': ['Jakarta Pusat', 'Jakarta Selatan', 'Jakarta Timur', 'Jakarta Barat', 'Jakarta Utara'],
    'Jawa Barat': ['Bandung', 'Bekasi', 'Depok', 'Bogor', 'Cimahi'],
    'Jawa Tengah': ['Semarang', 'Solo', 'Yogyakarta', 'Magelang'],
    'Jawa Timur': ['Surabaya', 'Malang', 'Sidoarjo', 'Gresik'],
    'Bali': ['Denpasar', 'Badung', 'Gianyar', 'Tabanan'],
};

const STREET_NAMES = [
    'Jl. Sudirman', 'Jl. Thamrin', 'Jl. Gatot Subroto', 'Jl. Kuningan',
    'Jl. Merdeka', 'Jl. Ahmad Yani', 'Jl. Diponegoro', 'Jl. Veteran',
];

/**
 * Generate random Indonesian full name
 */
export function generateDemoName(): string {
    const firstName = INDONESIAN_FIRST_NAMES[Math.floor(Math.random() * INDONESIAN_FIRST_NAMES.length)];
    const lastName = INDONESIAN_LAST_NAMES[Math.floor(Math.random() * INDONESIAN_LAST_NAMES.length)];
    return `${firstName} ${lastName}`;
}

/**
 * Generate random NIK (Nomor Induk Kependudukan) - 16 digits
 * Format: PPKKSSDDMMYYXXXX
 * PP = Province code (2 digits)
 * KK = City code (2 digits)
 * SS = District code (2 digits)
 * DDMMYY = Birth date (6 digits)
 * XXXX = Unique number (4 digits)
 */
export function generateDemoNIK(dateOfBirth?: string): string {
    const province = String(Math.floor(Math.random() * 34) + 11).padStart(2, '0'); // 11-34
    const city = String(Math.floor(Math.random() * 99) + 1).padStart(2, '0');
    const district = String(Math.floor(Math.random() * 99) + 1).padStart(2, '0');

    let birthDate = '';
    if (dateOfBirth) {
        const [day, month, year] = dateOfBirth.split('/');
        birthDate = `${day}${month}${year.slice(-2)}`;
    } else {
        const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
        const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
        const year = String(Math.floor(Math.random() * 30) + 70); // 1970-1999
        birthDate = `${day}${month}${year}`;
    }

    const unique = String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0');

    return `${province}${city}${district}${birthDate}${unique}`;
}

/**
 * Generate demo OTP code (always returns "123456" for demo)
 */
export function generateDemoOTP(): string {
    return '123456';
}

/**
 * Generate random date of birth
 */
export function generateDemoDOB(): string {
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const year = 1970 + Math.floor(Math.random() * 35); // 1970-2004
    return `${day}/${month}/${year}`;
}

/**
 * Generate random Indonesian address
 */
export function generateDemoAddress(): { address: string; province: string; city: string } {
    const province = INDONESIAN_PROVINCES[Math.floor(Math.random() * INDONESIAN_PROVINCES.length)];
    const cities = INDONESIAN_CITIES[province as keyof typeof INDONESIAN_CITIES] || ['Kota'];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const street = STREET_NAMES[Math.floor(Math.random() * STREET_NAMES.length)];
    const number = Math.floor(Math.random() * 999) + 1;
    const rt = String(Math.floor(Math.random() * 20) + 1).padStart(3, '0');
    const rw = String(Math.floor(Math.random() * 10) + 1).padStart(3, '0');

    return {
        address: `${street} No. ${number}, RT ${rt}/RW ${rw}, ${city}`,
        province,
        city,
    };
}

/**
 * Simulate OCR extraction from ID card image
 * ⚠️ DEMO: Returns random data after delay
 */
export async function simulateOCRExtraction(imageFile: File): Promise<{
    nik: string;
    fullName: string;
    dateOfBirth: string;
    address: string;
    province: string;
    city: string;
}> {
    // Simulate processing delay (2-3 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));

    const dob = generateDemoDOB();
    const addressData = generateDemoAddress();

    return {
        nik: generateDemoNIK(dob),
        fullName: generateDemoName(),
        dateOfBirth: dob,
        address: addressData.address,
        province: addressData.province,
        city: addressData.city,
    };
}

/**
 * Simulate face matching between selfie and ID card
 * ⚠️ DEMO: Always returns high match score (95-99%)
 */
export async function simulateFaceMatch(selfieFile: File, idCardFile: File): Promise<number> {
    // Simulate processing delay (1-2 seconds)
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Always return high match score for demo
    return 95 + Math.floor(Math.random() * 5); // 95-99%
}

/**
 * Simulate liveness detection
 * ⚠️ DEMO: Always returns true
 */
export async function simulateLivenessCheck(selfieFile: File): Promise<boolean> {
    // Simulate processing delay (1 second)
    await new Promise(resolve => setTimeout(resolve, 1000));

    return true;
}

/**
 * Simulate government database validation (Dukcapil)
 * ⚠️ DEMO: Always returns successful validation
 */
export async function simulateGovernmentValidation(nik: string): Promise<{
    nikVerified: boolean;
    faceVerified: boolean;
    livenessVerified: boolean;
    dataConsistent: boolean;
    message: string;
}> {
    // Simulate processing delay (2-4 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

    return {
        nikVerified: true,
        faceVerified: true,
        livenessVerified: true,
        dataConsistent: true,
        message: 'All validation checks passed successfully',
    };
}

/**
 * Validate OTP code
 * ⚠️ DEMO: Accepts any 6-digit code
 */
export function validateDemoOTP(code: string): boolean {
    return /^\d{6}$/.test(code);
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
    // Remove all non-digits
    const cleaned = phone.replace(/\D/g, '');

    // Format as +62 XXX-XXXX-XXXX
    if (cleaned.startsWith('62')) {
        const number = cleaned.slice(2);
        return `+62 ${number.slice(0, 3)}-${number.slice(3, 7)}-${number.slice(7)}`;
    }

    if (cleaned.startsWith('0')) {
        const number = cleaned.slice(1);
        return `+62 ${number.slice(0, 3)}-${number.slice(3, 7)}-${number.slice(7)}`;
    }

    return `+62 ${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
}
