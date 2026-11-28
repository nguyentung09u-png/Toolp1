import os
import time


def auto_delete_bak():
  # Nhập đường dẫn và tự động loại bỏ dấu ngoặc kép nếu dùng "Copy as path" trên Windows
  folder_path = (
      input("Nhập đường dẫn thư mục cần theo dõi: ").strip().strip('"').strip("'")
  )

  if not os.path.isdir(folder_path):
    print("❌ Đường dẫn không tồn tại hoặc không phải là thư mục!")
    return

  print(f"\n🔄 Đang theo dõi liên tục tại: {folder_path}")
  print("Nhấn Ctrl + C để dừng chương trình.\n")

  try:
    while True:
      # Quét toàn bộ thư mục chính và các thư mục con
      for root, dirs, files in os.walk(folder_path):
        for file in files:
          if file.lower().endswith(".bak"):
            file_path = os.path.join(root, file)
            try:
              os.remove(file_path)
              print(f"[ĐÃ XÓA] {file_path}")
            except PermissionError:
              # Nếu file đang được phần mềm ghi dữ liệu (chưa nhả khóa), bỏ qua để xóa ở nhịp sau
              pass
            except FileNotFoundError:
              pass
            except Exception as e:
              print(f"[LỖI] Không thể xóa {file_path}: {e}")

      # Nghỉ 0.5 giây giữa mỗi lần quét để không gây quá tải CPU
      time.sleep(0.5)

  except KeyboardInterrupt:
    print("\n🛑 Đã dừng chương trình.")


if __name__ == "__main__":
  auto_delete_bak()
