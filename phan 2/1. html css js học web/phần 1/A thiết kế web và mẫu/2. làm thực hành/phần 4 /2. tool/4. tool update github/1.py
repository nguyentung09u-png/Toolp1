import os
import subprocess
import sys

def clear_screen():
    os.system('clear')

def run_cmd(cmd_list, cwd=None):
    """Chạy lệnh shell và trả về (output, error, return_code)"""
    try:
        result = subprocess.run(cmd_list, cwd=cwd, capture_output=True, text=True)
        return result.stdout.strip(), result.stderr.strip(), result.returncode
    except Exception as e:
        return "", str(e), 1

def is_git_repo(path):
    """Kiểm tra xem thư mục có phải là Git repo không"""
    return os.path.isdir(os.path.join(path, '.git'))

def check_gh_auth():
    """Kiểm tra đăng nhập GitHub CLI"""
    print("Đang kiểm tra đăng nhập GitHub...")
    _, err, code = run_cmd(["gh", "auth", "status"])
    if code != 0:
        print("[!] Bạn chưa đăng nhập GitHub CLI. Bắt đầu đăng nhập...")
        os.system("gh auth login")
        return False
    else:
        print("[✓] Đã đăng nhập GitHub CLI.")
        return True

def setup_git():
    print("\n--- CẤU HÌNH GIT & GITHUB ---")
    out, _, _ = run_cmd(["git", "config", "--global", "user.name"])
    if not out:
        name = input("Nhập tên Git (user.name): ").strip()
        if name: run_cmd(["git", "config", "--global", "user.name", name])
    
    out, _, _ = run_cmd(["git", "config", "--global", "user.email"])
    if not out:
        email = input("Nhập email Git (user.email): ").strip()
        if email: run_cmd(["git", "config", "--global", "user.email", email])
    
    check_gh_auth()

def scan_files(folder):
    """Quét toàn bộ file bằng os.walk"""
    file_list = []
    for root, dirs, files in os.walk(folder):
        if '.git' in dirs:
            dirs.remove('.git')
        for file in files:
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, folder)
            file_list.append((rel_path, full_path))
    return file_list

# ==========================================
# CHỨC NĂNG 1: QUÉT VÀ XÓA FILE
# ==========================================
def feature_1_delete_files():
    print("\n--- CHỨC NĂNG 1: QUÉT VÀ XÓA FILE ---")
    folder = input("Nhập đường dẫn thư mục cần quét (Enter để dùng thư mục hiện tại): ").strip()
    if not folder:
        folder = os.getcwd()
    
    folder = os.path.abspath(os.path.expanduser(folder))
    if not os.path.isdir(folder):
        print(f"[!] Lỗi: Thư mục '{folder}' không tồn tại.")
        return

    is_repo = is_git_repo(folder)
    if is_repo:
        print(f"[✓] Đã phát hiện Git repository tại: {folder}")
        setup_git()
    else:
        print(f"[!] Cảnh báo: '{folder}' không phải là Git repository.")

    files = scan_files(folder)
    if not files:
        print("[!] Không tìm thấy file nào trong thư mục này.")
        return

    print("\n===== DANH SÁCH FILE =====")
    for idx, (rel_path, _) in enumerate(files, 1):
        print(f"{idx}. {rel_path}")
    print("==========================")

    while True:
        user_input = input("\nNhập số file muốn xóa (cách nhau bởi dấu phẩy, vd: 1,3): ").strip()
        if not user_input:
            continue
        
        try:
            indices = [int(x.strip()) for x in user_input.split(',')]
            if any(i < 1 or i > len(files) for i in indices):
                print("[!] Lỗi: Số thứ tự không hợp lệ. Vui lòng nhập lại.")
                continue
            break
        except ValueError:
            print("[!] Lỗi: Vui lòng chỉ nhập số.")

    print("\nBạn chọn xóa các file sau:")
    for i in indices:
        print(f" - {files[i-1][0]}")
    
    confirm = input("Xác nhận xóa? (y/n): ").strip().lower()
    if confirm != 'y':
        print("[!] Đã hủy bỏ xóa file.")
        return

    deleted_files = []
    for i in indices:
        rel_path, full_path = files[i-1]
        try:
            os.remove(full_path)
            print(f"[✓] Đã xóa: {rel_path}")
            deleted_files.append(rel_path)
        except Exception as e:
            print(f"[!] Lỗi khi xóa {rel_path}: {e}")

    if not deleted_files:
        return

    if is_repo:
        print("\n--- CẬP NHẬT LÊN GITHUB ---")
        out, _, _ = run_cmd(["git", "status", "--porcelain"], cwd=folder)
        print(f"Trạng thái Git:\n{out if out else 'Không có thay đổi'}")
        
        do_commit = input("\nBạn có muốn commit và push các thay đổi này lên GitHub? (y/n): ").strip().lower()
        if do_commit == 'y':
            print("\nĐang thêm file...")
            run_cmd(["git", "add", "-A"], cwd=folder)
            
            commit_msg = input("Nhập nội dung commit (Enter để dùng mặc định): ").strip()
            if not commit_msg:
                commit_msg = "Delete selected files"
                
            print("Đang commit...")
            out, err, code = run_cmd(["git", "commit", "-m", commit_msg], cwd=folder)
            if code != 0 and "nothing to commit" not in out and "nothing to commit" not in err:
                print(f"[!] Lỗi commit:\n{err}")
                return
            else:
                print("[✓] Commit thành công.")

            print("Đang push lên GitHub...")
            out, err, code = run_cmd(["git", "push", "origin", "main"], cwd=folder)
            if code == 0:
                print("[✓] Push thành công lên GitHub!")
            else:
                print("[!] Push nhánh main thất bại, đang thử nhánh master...")
                out, err, code = run_cmd(["git", "push", "origin", "master"], cwd=folder)
                if code == 0:
                    print("[✓] Push thành công lên GitHub (nhánh master)!")
                else:
                    print(f"[!] Push thất bại. Chi tiết lỗi:\n{err}")
        else:
            print("[!] Đã hủy push lên GitHub.")


# ==========================================
# CHỨC NĂNG 2: CẬP NHẬT TOÀN BỘ LÊN GITHUB
# ==========================================

def feature_2_update_github():
    print("\n--- CẬP NHẬT TOÀN BỘ LÊN GITHUB ---")

    default_dir = os.path.expanduser("~/Hello")
    folder = input(
        f"Nhập đường dẫn project (Enter để dùng: {default_dir}): "
    ).strip()

    if not folder:
        folder = default_dir

    folder = os.path.abspath(os.path.expanduser(folder))

    if not os.path.isdir(folder):
        print(f"[!] Thư mục không tồn tại: {folder}")
        return

    if not is_git_repo(folder):
        print("[!] Đây không phải Git repository.")
        return

    # 1. Kiểm tra đăng nhập
    if not check_gh_auth():
        return

    # 2. Kiểm tra thay đổi
    out, err, code = run_cmd(
        ["git", "status", "--porcelain"],
        cwd=folder
    )

    if code != 0:
        print(f"[!] Không thể kiểm tra Git:\n{err}")
        return

    if out:
        print("\n--- CÁC THAY ĐỔI HIỆN TẠI ---")

        status, _, _ = run_cmd(
            ["git", "status"],
            cwd=folder
        )
        print(status)

        confirm = input(
            "\nXác nhận cập nhật toàn bộ thay đổi lên GitHub? (y/n): "
        ).strip().lower()

        if confirm != "y":
            print("[!] Đã hủy cập nhật.")
            return

        # 3. Git Add
        print("\nĐang thêm file...")
        out, err, code = run_cmd(
            ["git", "add", "-A"],
            cwd=folder
        )

        if code != 0:
            print(f"[!] Git add thất bại:\n{err}")
            return

        # 4. Git Commit
        print("Đang commit...")
        out, err, code = run_cmd(
            ["git", "commit", "-m", "Update files"],
            cwd=folder
        )

        if code != 0:
            print(f"[!] Commit thất bại:\n{err or out}")
            return

        print("[✓] Commit thành công.")

    else:
        print("\n[!] Không có file mới hoặc thay đổi chưa commit.")
        print("[i] Vẫn tiếp tục kiểm tra commit chưa Push.")

    # 5. Đồng bộ GitHub trước khi Push
    print("\nĐang đồng bộ GitHub (pull --rebase)...")

    out, err, code = run_cmd(
        ["git", "pull", "--rebase", "origin", "main"],
        cwd=folder
    )

    if code != 0:
        print("[!] Đồng bộ thất bại.")
        print(err or out)
        print("\nHãy xử lý xung đột Git trước khi tiếp tục.")
        return

    print("[✓] Đồng bộ GitHub thành công.")

    # 6. Push lên GitHub
    print("\nĐang Push lên GitHub (main)...")

    out, err, code = run_cmd(
        ["git", "push", "origin", "main"],
        cwd=folder
    )

    if code == 0:
        print("[✓] Cập nhật GitHub thành công!")
        if out:
            print(out)
    else:
        print("[!] Push thất bại.")
        print(err or out)


# ==========================================
# MENU LOOP CHÍNH
# ==========================================
def main():
    while True:
        clear_screen()
        print("========== QUẢN LÝ PROJECT ==========")
        print("1. Quét thư mục, liệt kê và xóa file")
        print("2. Cập nhật toàn bộ thay đổi lên GitHub")
        print("0. Thoát")
        print("=====================================")
        
        choice = input("Nhập lựa chọn: ").strip()
        
        if choice == '1':
            feature_1_delete_files()
            input("\nNhấn Enter để quay lại menu...")
        elif choice == '2':
            feature_2_update_github()
            input("\nNhấn Enter để quay lại menu...")
        elif choice == '0':
            print("Tạm biệt!")
            break
        else:
            print("[!] Lựa chọn không hợp lệ. Vui lòng chọn lại.")
            input("Nhấn Enter để thử lại...")

if __name__ == "__main__":
    main()