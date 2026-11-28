import os
import re

# B1: Nhập đường dẫn thư mục chứa file .html, .css và .js
target_dir = input("Nhập đường dẫn thư mục: ").strip().strip('"').strip("'")

if not os.path.isdir(target_dir):
    print(f"Lỗi: Đường dẫn '{target_dir}' không tồn tại!")
    exit(1)

# B2: Chọn chế độ gộp
print("\nChọn chế độ gộp:")
print("  1. Gộp tất cả (cả .css và .js)")
print("  2. Chỉ gộp .js (giữ nguyên file .css)")
mode = input("Nhập lựa chọn (1 hoặc 2): ").strip()

if mode not in ("1", "2"):
    print("Lỗi: Lựa chọn không hợp lệ! Vui lòng chỉ nhập 1 hoặc 2.")
    exit(1)

# Regex bắt thẻ <script src="..."></script>
SCRIPT_TAG_RE = re.compile(
    r'<script\b[^>]*\bsrc=["\']([^"\']+)["\'][^>]*>\s*</script>',
    re.IGNORECASE
)

# Regex bắt thẻ <link ... rel="stylesheet" ... href="..." ...>
CSS_LINK_RE = re.compile(
    r'<link\b(?=[^>]*\brel=["\']stylesheet["\'])(?=[^>]*\bhref=["\']([^"\']+)["\'])[^>]*\/?>',
    re.IGNORECASE
)

merged_files_count = 0

for root, dirs, files in os.walk(target_dir):
    for file in files:
        if not file.lower().endswith(".html"):
            continue

        html_path = os.path.join(root, file)
        with open(html_path, "r", encoding="utf-8") as f:
            html_content = f.read()

        has_changed = False

        # Hàm thay thế CSS nội tuyến
        def replace_with_inline_css(match):
            global has_changed
            href_rel_path = match.group(1).strip().split("?")[0]

            if href_rel_path.startswith(("http://", "https://", "//")):
                return match.group(0)

            css_path = os.path.normpath(os.path.join(root, href_rel_path))

            if os.path.isfile(css_path):
                with open(css_path, "r", encoding="utf-8") as css_file:
                    css_code = css_file.read()
                css_code = re.sub(r'</style>', r'<\/style>', css_code, flags=re.IGNORECASE)
                has_changed = True
                print(f"  [+] Đã nhúng CSS '{href_rel_path}' vào '{file}'")
                return f"<style>\n{css_code}\n</style>"
            else:
                print(f"  [!] Không tìm thấy file CSS: '{css_path}' (giữ nguyên thẻ)")
                return match.group(0)

        # Hàm thay thế JS nội tuyến
        def replace_with_inline_js(match):
            global has_changed
            src_rel_path = match.group(1).strip().split("?")[0]

            if src_rel_path.startswith(("http://", "https://", "//")):
                return match.group(0)

            js_path = os.path.normpath(os.path.join(root, src_rel_path))

            if os.path.isfile(js_path):
                with open(js_path, "r", encoding="utf-8") as js_file:
                    js_code = js_file.read()
                js_code = re.sub(r'</script>', r'<\/script>', js_code, flags=re.IGNORECASE)
                has_changed = True
                print(f"  [+] Đã nhúng JS  '{src_rel_path}' vào '{file}'")
                return f"<script>\n{js_code}\n</script>"
            else:
                print(f"  [!] Không tìm thấy file JS: '{js_path}' (giữ nguyên thẻ)")
                return match.group(0)

        new_html_content = html_content

        # Chỉ gộp CSS nếu người dùng chọn 1
        if mode == "1":
            new_html_content = CSS_LINK_RE.sub(replace_with_inline_css, new_html_content)

        # Luôn gộp JS ở cả 2 chế độ
        new_html_content = SCRIPT_TAG_RE.sub(replace_with_inline_js, new_html_content)

        if has_changed:
            with open(html_path, "w", encoding="utf-8") as f:
                f.write(new_html_content)
            merged_files_count += 1

mode_label = "CSS & JS" if mode == "1" else "chỉ JS"
print(f"\nHoàn tất! Đã gộp ({mode_label}) thành công cho {merged_files_count} file HTML.")
