import os
import sys
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

IMG_INPUT = "anh_that.png"
HTML_INPUT = "source.html"
IMG_OUTPUT = "logo.png"
HTML_OUTPUT = "index.html"

# 1. Kiểm tra file đầu vào
if not os.path.exists(IMG_INPUT) or not os.path.exists(HTML_INPUT):
    print(f"Lỗi: Thiếu file '{IMG_INPUT}' hoặc '{HTML_INPUT}' trong thư mục hiện tại!")
    sys.exit(1)

# 2. Tạo key 128-bit và nonce 12-byte ngẫu nhiên
key = AESGCM.generate_key(bit_length=128)
nonce = os.urandom(12)

with open(IMG_INPUT, "rb") as f:
    real_img = f.read()

with open(HTML_INPUT, "rb") as f:
    html_data = f.read()

# 3. Mã hóa và ghép vào đuôi ảnh -> xuất ra logo.png
ciphertext = AESGCM(key).encrypt(nonce, html_data, None)
with open(IMG_OUTPUT, "wb") as f:
    f.write(real_img + nonce + ciphertext)

key_hex = key.hex()
offset_start = len(real_img)
offset_end = offset_start + 12

# 4. Tự động tạo/cập nhật file index.html với thông số mới
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
  const offsetStart = {offset_start};
  const offsetEnd = {offset_end};

  const res = await fetch("{IMG_OUTPUT}");
  const buf = await res.arrayBuffer();

  const nonce = buf.slice(offsetStart, offsetEnd);
  const data = buf.slice(offsetEnd);

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

# 5. Dọn dẹp file gốc không cần thiết (giữ lại file .py)
os.remove(HTML_INPUT)
os.remove(IMG_INPUT)

print("=== HOÀN TẤT ===")
print(f"- Đã tạo: {IMG_OUTPUT} và {HTML_OUTPUT}")
print(f"- Đã xóa: {HTML_INPUT} và {IMG_INPUT}")
print(f"- Key Hex: {key_hex} | Offset: {offset_start} -> {offset_end}")
