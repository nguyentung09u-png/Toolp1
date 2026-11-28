#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
split_html.py — Bóc <style> ra style.css và <script> ra script.js
Mặc định làm việc trong /storage/emulated/0/cc/

Cách dùng:
    python split_html.py
    python split_html.py --in index.html
    python split_html.py --in /duong/dan/index.html --out /duong/dan/out
    python split_html.py --clean      # ghi đè index.html gốc (mặc định tạo *_clean.html)
"""

import argparse
import os
import re
import shutil
import sys
from pathlib import Path

# ─────────────────────────────────────────────────────────────
# CẤU HÌNH MẶC ĐỊNH
# ─────────────────────────────────────────────────────────────
DEFAULT_DIR = "/storage/emulated/0/cc"
DEFAULT_IN  = "index.html"
CSS_NAME    = "style.css"
JS_NAME     = "script.js"
BACKUP_EXT  = ".bak"

# Regex bắt khối <style>...</style> và <script>...</script> (không bắt external src)
RE_STYLE  = re.compile(r"<style\b[^>]*>(.*?)</style>", re.IGNORECASE | re.DOTALL)
RE_SCRIPT = re.compile(r"<script\b([^>]*)>(.*?)</script>", re.IGNORECASE | re.DOTALL)


def log(msg, icon="•"):
    print(f"{icon} {msg}")


def ensure_dir(path: Path):
    path.mkdir(parents=True, exist_ok=True)


def backup_file(path: Path):
    """Sao lưu file gốc trước khi ghi đè."""
    if path.exists():
        bak = path.with_suffix(path.suffix + BACKUP_EXT)
        shutil.copy2(path, bak)
        log(f"Đã backup: {bak.name}", "💾")


def extract_styles(html: str):
    """Trả về (html_mới, css_gộp)."""
    css_parts = []

    def repl(m):
        css_parts.append(m.group(1).strip())
        return ""  # xóa khối style

    new_html = RE_STYLE.sub(repl, html)
    return new_html, "\n\n".join(css_parts).strip()


def extract_scripts(html: str):
    """Trả về (html_mới, js_gộp). Bỏ qua <script src=...> (external)."""
    js_parts = []

    def repl(m):
        attrs, body = m.group(1), m.group(2)
        # Nếu có src → là script external, giữ nguyên
        if re.search(r"\bsrc\s*=", attrs, re.IGNORECASE):
            return m.group(0)
        if body.strip():
            js_parts.append(body.strip())
        return ""  # xóa khối script inline

    new_html = RE_SCRIPT.sub(repl, html)
    return new_html, "\n\n".join(js_parts).strip()


def inject_links(html: str, has_css: bool, has_js: bool):
    """Chèn <link> vào </head> và <script src> vào </body>."""
    if has_css:
        link_tag = f'  <link rel="stylesheet" href="{CSS_NAME}">'
        if re.search(r"</head>", html, re.IGNORECASE):
            html = re.sub(
                r"</head>",
                f"{link_tag}\n</head>",
                html, count=1, flags=re.IGNORECASE
            )
        else:
            # Không có </head> → chèn đầu file
            html = f"{link_tag}\n{html}"

    if has_js:
        script_tag = f'  <script src="{JS_NAME}"></script>'
        if re.search(r"</body>", html, re.IGNORECASE):
            html = re.sub(
                r"</body>",
                f"{script_tag}\n</body>",
                html, count=1, flags=re.IGNORECASE
            )
        else:
            # Không có </body> → chèn cuối file
            html = f"{html}\n{script_tag}"

    return html


def process(in_file: Path, out_dir: Path, clean_inplace: bool):
    if not in_file.exists():
        log(f"Không tìm thấy file: {in_file}", "❌")
        sys.exit(1)

    log(f"Đọc: {in_file}", "📖")
    html = in_file.read_text(encoding="utf-8")

    # 1. Bóc CSS
    html, css = extract_styles(html)
    if css:
        css_path = out_dir / CSS_NAME
        css_path.write_text(css, encoding="utf-8")
        log(f"Đã tạo: {css_path.name} ({len(css)} ký tự)", "🎨")
    else:
        log("Không có <style> inline, bỏ qua CSS", "⚠️")

    # 2. Bóc JS
    html, js = extract_scripts(html)
    if js:
        js_path = out_dir / JS_NAME
        js_path.write_text(js, encoding="utf-8")
        log(f"Đã tạo: {js_path.name} ({len(js)} ký tự)", "⚙️")
    else:
        log("Không có <script> inline, bỏ qua JS", "⚠️")

    # 3. Chèn link/src
    html = inject_links(html, has_css=bool(css), has_js=bool(js))

    # 4. Ghi HTML sạch
    if clean_inplace:
        backup_file(in_file)
        out_file = in_file
        log("Ghi đè file gốc (đã backup)", "✏️")
    else:
        out_file = out_dir / f"{in_file.stem}_clean{in_file.suffix}"
        log(f"Ghi file mới: {out_file.name}", "✏️")

    out_file.write_text(html, encoding="utf-8")

    print()
    log("HOÀN TẤT ✅", "🏁")
    print(f"   📁 {out_dir}")
    if css: print(f"      ├── {CSS_NAME}")
    if js:  print(f"      ├── {JS_NAME}")
    print(f"      └── {out_file.name}")


def main():
    ap = argparse.ArgumentParser(
        description="Bóc <style> và <script> inline ra file riêng."
    )
    ap.add_argument("--in",  dest="inp", default=None,
                    help=f"File HTML đầu vào (mặc định: {DEFAULT_DIR}/{DEFAULT_IN})")
    ap.add_argument("--out", dest="out", default=None,
                    help=f"Thư mục xuất (mặc định: {DEFAULT_DIR})")
    ap.add_argument("--clean", action="store_true",
                    help="Ghi đè file HTML gốc (mặc định tạo *_clean.html)")
    args = ap.parse_args()

    in_file = Path(args.inp) if args.inp else Path(DEFAULT_DIR) / DEFAULT_IN
    out_dir = Path(args.out) if args.out else in_file.parent

    ensure_dir(out_dir)

    print("═" * 50)
    print("  SPLIT HTML TOOL — Tách CSS/JS")
    print("═" * 50)
    process(in_file, out_dir, clean_inplace=args.clean)


if __name__ == "__main__":
    main()