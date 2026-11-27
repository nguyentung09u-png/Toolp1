// ===== DỮ LIỆU SẢN PHẨM (MẢNG OBJECT) =====
const products = [
  // --- TRÀ SỮA ---
  {
    id: 1,
    name: "Trà Sữa Kém Trứng Đường Nhung",
    price: 20000,
    category: "tra-sua",
    image: "https://images.unsplash.com/photo-1558857563-b371033873b8?w=400&q=80"
  },
  {
    id: 2,
    name: "Trà Sữa Truyền Thống",
    price: 15000,
    category: "tra-sua",
    image: "https://images.unsplash.com/photo-1525803377221-4f6ccdaa5133?w=400&q=80"
  },
  {
    id: 3,
    name: "Trà Sữa Thái Xanh",
    price: 15000,
    category: "tra-sua",
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&q=80"
  },
  {
    id: 4,
    name: "Trà Sữa Mix Vi Đậu",
    price: 20000,
    category: "tra-sua",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80"
  },
  {
    id: 5,
    name: "Trà Sữa Mix Việt Quất",
    price: 15000,
    category: "tra-sua",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80"
  },
  {
    id: 6,
    name: "Trà Sữa Mix Chanh Dây",
    price: 15000,
    category: "tra-sua",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80"
  },
  {
    id: 7,
    name: "Trà Sữa Mix Dâu",
    price: 20000,
    category: "tra-sua",
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=400&q=80"
  },
  {
    id: 8,
    name: "Trà Sữa Bánh Flan",
    price: 20000,
    category: "tra-sua",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80"
  },

  // --- CÀ PHÊ ---
  {
    id: 9,
    name: "Cà Phê Muối",
    price: 20000,
    category: "ca-phe",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80"
  },
  {
    id: 10,
    name: "Cà Phê Sữa Đá (Nóng)",
    price: 15000,
    category: "ca-phe",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80"
  },
  {
    id: 11,
    name: "Cà Phê Đen Đá (Nóng)",
    price: 15000,
    category: "ca-phe",
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&q=80"
  },
  {
    id: 12,
    name: "Bạc Xỉu Đá (Nóng)",
    price: 20000,
    category: "ca-phe",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80"
  },
  {
    id: 13,
    name: "Cacao Đá (Nóng)",
    price: 20000,
    category: "ca-phe",
    image: "https://images.unsplash.com/photo-1542990253-a781e02e0e6b?w=400&q=80"
  },

  // --- SODA ---
  {
    id: 14,
    name: "Soda Việt Quất",
    price: 15000,
    category: "soda",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=80"
  },
  {
    id: 15,
    name: "Soda Dâu",
    price: 15000,
    category: "soda",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80"
  },
  {
    id: 16,
    name: "Soda Kiwi",
    price: 15000,
    category: "soda",
    image: "https://images.unsplash.com/photo-1560508180-03f285f67ded?w=400&q=80"
  },
  {
    id: 17,
    name: "Soda Chanh Dây",
    price: 15000,
    category: "soda",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80"
  },

  // --- TRÀ ---
  {
    id: 18,
    name: "Trà Đào Cam Sả",
    price: 15000,
    category: "tra",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80"
  },
  {
    id: 19,
    name: "Trà Tắc Xí Muội",
    price: 15000,
    category: "tra",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80"
  },
  {
    id: 20,
    name: "Trà Việt Quất",
    price: 15000,
    category: "tra",
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=400&q=80"
  },
  {
    id: 21,
    name: "Trà Vải",
    price: 15000,
    category: "tra",
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&q=80"
  },

  // --- SỮA CHUA ---
  {
    id: 22,
    name: "Sữa Chua Dẻo",
    price: 15000,
    category: "sua-chua",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80"
  },
  {
    id: 23,
    name: "Sữa Chua Mix Việt Quất",
    price: 20000,
    category: "sua-chua",
    image: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=400&q=80"
  },
  {
    id: 24,
    name: "Sữa Chua Mix Chanh Dây",
    price: 20000,
    category: "sua-chua",
    image: "https://images.unsplash.com/photo-1584278860047-22db9ff82bed?w=400&q=80"
  },

  // --- MÓN CAY ---
  {
    id: 25,
    name: "Món Cay Xúc Xích",
    price: 25000,
    category: "mon-cay",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80"
  },
  {
    id: 26,
    name: "Món Cay Tôm Cá Viên",
    price: 25000,
    category: "mon-cay",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80"
  },
  {
    id: 27,
    name: "Món Cay Hải Sản",
    price: 30000,
    category: "mon-cay",
    image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=400&q=80"
  }
];

// ===== HÀM RENDER SẢN PHẨM =====
const productGrid = document.getElementById("productGrid");
const filterNav = document.getElementById("filterNav");
const ZALO_LINK = "https://zalo.me/0367411225";
const ZALO_ICON = "https://static.freepnglogo.com/images/all_img/zalo-icon-4635.png";

// Hàm format giá tiền VNĐ
function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

// Hàm lấy tên danh mục hiển thị
function getCategoryName(category) {
  const map = {
    "tra-sua": "Trà Sữa",
    "ca-phe": "Cà Phê",
    "soda": "Soda",
    "tra": "Trà",
    "sua-chua": "Sữa Chua",
    "mon-cay": "Món Cay"
  };
  return map[category] || category;
}

// Hàm render danh sách sản phẩm
function renderProducts(category = "all") {
  // Lọc dữ liệu
  const filtered = category === "all" 
    ? products 
    : products.filter(item => item.category === category);

  // Nếu không có sản phẩm
  if (filtered.length === 0) {
    productGrid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #999;">Không có sản phẩm nào trong danh mục này.</p>`;
    return;
  }

  // Tạo HTML cho từng card
  productGrid.innerHTML = filtered.map(item => `
    <article class="product-card">
      <img class="card-image" src="${item.image}" alt="${item.name}" loading="lazy">
      <div class="card-body">
        <span class="card-category-tag">${getCategoryName(item.category)}</span>
        <h3 class="card-name">${item.name}</h3>
        <p class="card-price">${formatPrice(item.price)}</p>
        <a href="${ZALO_LINK}" target="_blank" class="card-btn">
          <img src="${ZALO_ICON}" alt="Zalo">
          Liên hệ đặt món
        </a>
      </div>
    </article>
  `).join("");
}

// ===== XỬ LÝ SỰ KIỆN LỌC DANH MỤC =====
filterNav.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;

  // Xóa active cũ
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  // Thêm active mới
  btn.classList.add("active");

  // Render lại sản phẩm theo danh mục
  renderProducts(btn.dataset.category);
});

// ===== KHỞI TẠO =====
document.addEventListener("DOMContentLoaded", () => {
  renderProducts("all");

  // Hiệu ứng click cho nút Zalo FAB
  const fabZalo = document.getElementById("fabZalo");
  if (fabZalo) {
    fabZalo.addEventListener("click", () => {
      console.log("Đang mở Zalo liên hệ...");
    });
  }
});