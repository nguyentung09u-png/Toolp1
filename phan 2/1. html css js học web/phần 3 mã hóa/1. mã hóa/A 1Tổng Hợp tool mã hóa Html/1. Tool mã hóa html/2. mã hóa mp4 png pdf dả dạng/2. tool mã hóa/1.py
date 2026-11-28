import os
import sys
import json
import secrets
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

HTML_INPUT = "source.html"
HTML_OUTPUT = "index.html"

# Điền đầy đủ cả tên lẫn đuôi file đầu vào
CARRIERS = [
    ("1.png", ".png"),
    ("2.mp4", ".mp4"),
    ("3.pdf", ".pdf"),
]

# 1. Kiểm tra đủ tất cả file đầu vào
missing = [f for f, _ in CARRIERS if not os.path.exists(f)]
if not os.path.exists(HTML_INPUT):
    missing.append(HTML_INPUT)

if missing:
    print(f"Lỗi: Thiếu các file sau trong thư mục: {', '.join(missing)}")
    sys.exit(1)

# 2. Mã hóa source.html bằng AES-GCM
key = AESGCM.generate_key(bit_length=128)
nonce = os.urandom(12)

with open(HTML_INPUT, "rb") as f:
    html_data = f.read()

ciphertext = AESGCM(key).encrypt(nonce, html_data, None)
full_payload = nonce + ciphertext

# 3. Chia dữ liệu mã hóa thành 3 mảnh
total_len = len(full_payload)
chunk_size = total_len // 3
chunks = [
    full_payload[0 : chunk_size],
    full_payload[chunk_size : chunk_size * 2],
    full_payload[chunk_size * 2 :],
]

# 4. Ghép từng mảnh vào đuôi 3 file thật và xuất ra tên random
manifest = []  # Lưu danh sách [tên_file_random, vị_trí_cắt_offset]

for (src_file, ext), chunk in zip(CARRIERS, chunks):
    with open(src_file, "rb") as f:
        carrier_bytes = f.read()

    rand_name = f"{secrets.token_hex(6)}{ext}"
    offset = len(carrier_bytes)

    with open(rand_name, "wb") as f:
        f.write(carrier_bytes + chunk)

    manifest.append([rand_name, offset])

# 5. Tạo file index.html tự động cắt đuôi, ghép mảnh và giải mã
key_hex = key.hex()
manifest_json = json.dumps(manifest)

index_template = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body>
<script>
(async () => {{
  const keyHex = "{key_hex}";
  const items = {manifest_json};

  // Tải đồng thời 3 file thật và cắt bỏ phần đầu, chỉ lấy phần byte đuôi
  const parts = await Promise.all(
    items.map(async ([url, offset]) => {{
      const buf = await fetch(url).then(r => r.arrayBuffer());
      return new Uint8Array(buf.slice(offset));
    }})
  );

  // Ghép 3 mảnh byte đuôi lại thành 1 mảng thống nhất
  const totalBytes = parts.reduce((sum, p) => sum + p.byteLength, 0);
  const combined = new Uint8Array(totalBytes);
  let pos = 0;
  for (const p of parts) {{
    combined.set(p, pos);
    pos += p.byteLength;
  }}

  // Tách 12 byte nonce và dữ liệu mã hóa
  const nonce = combined.slice(0, 12);
  const data = combined.slice(12);

  // Giải mã trên RAM và ghi đè giao diện
  const rawKey = new Uint8Array(keyHex.match(/.{{1,2}}/g).map(b => parseInt(b, 16)));
  const cryptoKey = await crypto.subtle.importKey("raw", rawKey, "AES-GCM", false, ["decrypt"]);
  const decrypted = await crypto.subtle.decrypt({{ name: "AES-GCM", iv: nonce }}, cryptoKey, data);

  const html = new TextDecoder().decode(decrypted);
  document.open();
  document.write(html);
  document.close();
}})();
</script>
</body>
</html>"""

with open(HTML_OUTPUT, "w", encoding="utf-8") as f:
    f.write(index_template)

# 6. Dọn dẹp toàn bộ file gốc (chỉ giữ lại file .py và thành phẩm)
os.remove(HTML_INPUT)
for src_file, _ in CARRIERS:
    os.remove(src_file)

print("=== ĐÓNG GÓI & NGỤY TRANG HOÀN TẤT ===")
print(f"- Key Hex: {key_hex}")
for name, off in manifest:
    print(f"- Đã tạo: {name} (cắt từ byte {off})")
print(f"- Đã tạo vỏ giải mã: {HTML_OUTPUT}")
print("- Đã xóa toàn bộ file gốc đầu vào.")
