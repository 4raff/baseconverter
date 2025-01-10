document.getElementById("convertBtn").addEventListener("click", function () {
    const number = document.getElementById("number").value.trim();
    const fromBase = parseInt(document.getElementById("fromBase").value, 10);
    const toBase = parseInt(document.getElementById("toBase").value, 10);

    // Reset input yang sudah diberi peringatan
    document.getElementById("number").classList.remove("invalid-input");
    document.getElementById("fromBase").classList.remove("invalid-input");
    document.getElementById("toBase").classList.remove("invalid-input");

    // Validasi jika input kosong atau ada yang belum dipilih
    if (!number || isNaN(fromBase) || isNaN(toBase)) {
        if (!number) {
            document.getElementById("number").classList.add("invalid-input");
        }
        if (isNaN(fromBase)) {
            document.getElementById("fromBase").classList.add("invalid-input");
        }
        if (isNaN(toBase)) {
            document.getElementById("toBase").classList.add("invalid-input");
        }
        return;
    }

    let decimalValue;

    try {
        // Validasi angka sesuai dengan basis yang dipilih
        const validNumberPattern = /^[0-9a-fA-F]+$/; // Pola untuk angka dan huruf valid di hexadecimal
        if (![2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16].includes(fromBase) && !validNumberPattern.test(number)) {
            // Jika angka tidak valid untuk basis asal, beri efek goyang pada input number
            document.getElementById("number").classList.add("invalid-input");
            return; // Hentikan proses konversi
        }

        // Konversi angka ke desimal
        decimalValue = parseInt(number, fromBase);
        if (isNaN(decimalValue)) {
            // Jika konversi ke desimal gagal, beri efek goyang pada input number
            document.getElementById("number").classList.add("invalid-input");
            return;
        }

        // Konversi dari desimal ke basis tujuan
        let result;
        if (toBase === 1) {
            // Basis 1 (unary) dihapus
            throw new Error("Base 1 is no longer supported.");
        } else {
            // Basis lain: Gunakan toString
            result = decimalValue.toString(toBase);
        }

        // Hitung jumlah digit hasil konversi
        const digitCount = result.length;

        // Tampilkan hasil dan jumlah digit
        document.getElementById("result").value = `${result.toUpperCase()} (${digitCount} digit${digitCount > 1 ? 's' : ''})`;
    } catch (error) {
        // Jika terjadi kesalahan lainnya, beri efek goyang pada input number
        document.getElementById("number").classList.add("invalid-input");
    }
});

document.getElementById("resetBtn").addEventListener("click", function () {
    document.getElementById("number").value = "";
    document.getElementById("fromBase").value = "";
    document.getElementById("toBase").value = "";
    document.getElementById("result").value = "";

    // Hapus peringatan
    document.getElementById("number").classList.remove("invalid-input");
    document.getElementById("fromBase").classList.remove("invalid-input");
    document.getElementById("toBase").classList.remove("invalid-input");
});
