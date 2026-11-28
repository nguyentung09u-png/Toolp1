#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
make_folders.py — Tạo hàng loạt thư mục RỖNG (nhập tương tác)

Chạy:
    python make_folders.py
"""

from pathlib import Path


def log(msg, icon="•"):
    print(f"{icon} {msg}")


def ask(prompt, default=None, cast=str):
    """Hỏi input, có giá trị mặc định, ép kiểu an toàn."""
    while True:
        suffix = f" [{default}]" if default is not None else ""
        raw = input(f"{prompt}{suffix}: ").strip()
        if not raw and default is not None:
            return default
        if not raw:
            log("Không được để trống, nhập lại.", "⚠️")
            continue
        try:
            return cast(raw)
        except Exception:
            log(f"Giá trị không hợp lệ, nhập lại ({cast.__name__}).", "⚠️")


def main():
    print("═" * 52)
    print("      MAKE FOLDERS — Tạo thư mục rỗng")
    print("═" * 52)

    # 1. Đường dẫn
    default_dir = "/storage/emulated/0/cc"
    out = ask("📁 Nhập đường dẫn thư mục cần tạo", default=default_dir)
    parent = Path(out)

    # 2. Tên thư mục
    name = ask("🏷️  Nhập tên thư mục (vd: Phần, Bài, Day)", default="Folder")

    # 3. Số bắt đầu
    start = ask("🔢 Từ số", default=1, cast=int)

    # 4. Số kết thúc
    while True:
        end = ask("🔢 Đến số", default=start, cast=int)
        if end >= start:
            break
        log(f"Số kết thúc phải >= {start}, nhập lại.", "⚠️")

    # 5. Ký tự phân cách (tùy chọn)
    sep = ask("🔗 Ký tự phân cách tên và số (Enter = dấu cách)",
              default=" ")

    # 6. Đệm số 0 (tùy chọn)
    pad = ask("0️⃣  Đệm số 0 (0 = không đệm)", default=0, cast=int)

    # ─── Tạo thư mục ───────────────────────────────────────
    print("─" * 52)
    print(f"  📁 {parent}")
    print(f"  🏷️  {name}{sep}<số>  ({start} → {end})")
    print(f"  📊 Tổng: {end - start + 1} thư mục")
    print("─" * 52)

    # Tạo thư mục cha nếu chưa có
    if not parent.exists():
        parent.mkdir(parents=True, exist_ok=True)
        log(f"Đã tạo thư mục cha: {parent}", "📁")

    created, skipped = 0, 0

    for n in range(start, end + 1):
        num_str = str(n).zfill(pad) if pad > 0 else str(n)
        folder_name = f"{name}{sep}{num_str}"
        folder_path = parent / folder_name

        if folder_path.exists():
            log(f"Đã tồn tại, bỏ qua: {folder_name}", "⏭️")
            skipped += 1
            continue

        try:
            folder_path.mkdir(parents=False, exist_ok=False)
            log(f"Tạo: {folder_name}", "✅")
            created += 1
        except Exception as e:
            log(f"Lỗi tạo {folder_name}: {e}", "❌")

    # ─── Kết quả ───────────────────────────────────────────
    print("═" * 52)
    print(f"  🏁 HOÀN TẤT")
    print(f"     ✅ Đã tạo     : {created}")
    print(f"     ⏭️  Bỏ qua     : {skipped}")
    print(f"     📁 Thư mục    : {parent}")
    print("═" * 52)

    # In danh sách thư mục vừa tạo
    if created > 0:
        print("\n📋 Danh sách thư mục trong", parent)
        print("─" * 52)
        items = sorted([p.name for p in parent.iterdir() if p.is_dir()])
        for i, item in enumerate(items, 1):
            print(f"  {i:>3}. {item}")
        print(f"  → Tổng: {len(items)} thư mục")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⛔ Đã hủy bởi người dùng.")