// ===== DỮ LIỆU MENU QUÁN CAFE (MẢNG OBJECT) =====
const products = [
  // CÀ PHÊ PHA PHIN
  { id: 1, name: "PHIN Sữa Đá", price: 29000, category: "ca-phe-phin", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80" },
  { id: 2, name: "PHIN Đen Đá", price: 29000, category: "ca-phe-phin", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80" },
  { id: 3, name: "Bạc Xỉu Đá", price: 29000, category: "ca-phe-phin", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80" },

  // FREEZE (ICE BLENDED)
  { id: 4, name: "Freeze Trà Xanh", price: 49000, category: "freeze", image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=500&q=80" },
  { id: 5, name: "Freeze Sô-cô-la", price: 49000, category: "freeze", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&q=80" },
  { id: 6, name: "Cookies & Cream", price: 49000, category: "freeze", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&q=80" },
  { id: 7, name: "Caramel Phin Freeze", price: 49000, category: "freeze", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80" },
  { id: 8, name: "Classic Phin Freeze", price: 49000, category: "freeze", image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=500&q=80" },

  // TRÀ
  { id: 9, name: "Trà Sen Vàng", price: 39000, category: "tra", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80" },
  { id: 10, name: "Trà Thạch Đào", price: 39000, category: "tra", image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=500&q=80" },
  { id: 11, name: "Trà Thanh Đào", price: 39000, category: "tra", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&q=80" },
  { id: 12, name: "Trà Thạch Vải", price: 39000, category: "tra", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&q=80" },
  { id: 13, name: "Trà Xanh Đậu Đỏ", price: 39000, category: "tra", image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&q=80" },

  // CÀ PHÊ ESPRESSO
  { id: 14, name: "Espresso / Americano", price: 35000, category: "espresso", image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500&q=80" },
  { id: 15, name: "Cappuccino / Latte", price: 55000, category: "espresso", image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&q=80" },
  { id: 16, name: "Mocha / Caramel Macchiato", price: 59000, category: "espresso", image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=500&q=80" },

  // THỨC UỐNG KHÁC
  { id: 17, name: "Chanh Đá Xay / Đá Viên", price: 39000, category: "thuc-uong-khac", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&q=80" },
  { id: 18, name: "Chanh Dây Đá Viên", price: 39000, category: "thuc-uong-khac", image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=500&q=80" },
  { id: 19, name: "Tắc / Quất Đá Viên", price: 39000, category: "thuc-uong-khac", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80" },
  { id: 20, name: "Sô-Cô-La (Nóng / Đá)", price: 54000, category: "thuc-uong-khac", image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=500&q=80" },

  // BÁNH PASTRY
  { id: 21, name: "Tiramisu", price: 19000, category: "banh", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&q=80" },
  { id: 22, name: "Bánh Chuối", price: 19000, category: "banh", image: "https://images.unsplash.com/photo-1605286978633-2dec93ff88a2?w=500&q=80" },
  { id: 23, name: "Mousse Đào", price: 29000, category: "banh", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=80" },
  { id: 24, name: "Mousse Cacao", price: 29000, category: "banh", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80" },
  { id: 25, name: "Phô Mai Trà Xanh", price: 29000, category: "banh", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&q=80" },
  { id: 26, name: "Phô Mai Chanh Dây", price: 29000, category: "banh", image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=500&q=80" },
  { id: 27, name: "Phô Mai Cà Phê", price: 29000, category: "banh", image: "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=500&q=80" },
  { id: 28, name: "Phô Mai Caramel", price: 29000, category: "banh", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&q=80" },
  { id: 29, name: "Sô-Cô-La Highlands", price: 29000, category: "banh", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&q=80" }
];

// ===== HÀM RENDER SẢN PHẨM =====
const productGrid = document.getElementById("productGrid");
const filterNav = document.getElementById("filterNav");
const ZALO_LINK = "https://zalo.me/0367411225";
const ZALO_ICON = "https://static.freepnglogo.com/images/all_img/zalo-icon-4635.png";

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

function getCategoryName(category) {
  const map = {
    "ca-phe-phin": "Cà Phê Phin",
    "freeze": "Freeze",
    "tra": "Trà",
    "espresso": "Espresso",
    "thuc-uong-khac": "Thức Uống Khác",
    "banh": "Bánh"
  };
  return map[category] || category;
}

function renderProducts(category = "all") {
  const filtered = category === "all"
    ? products
    : products.filter(item => item.category === category);

  if (filtered.length === 0) {
    productGrid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; padding: 40px;">Không có món nào trong danh mục này.</p>`;
    return;
  }

  productGrid.innerHTML = filtered.map(item => `
    <article class="product-card">
      <img class="card-image" src="${item.image}" alt="${item.name}" loading="lazy">
      <div class="card-body">
        <span class="card-category-tag">${getCategoryName(item.category)}</span>
        <h3 class="card-name">${item.name}</h3>
        <p class="card-price">${formatPrice(item.price)}</p>
        <a href="${ZALO_LINK}" target="_blank" class="card-btn">
          <img src="${ZALO_ICON}" alt="Zalo">
          Đặt ngay
        </a>
      </div>
    </article>
  `).join("");
}

filterNav.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;

  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  renderProducts(btn.dataset.category);
});

document.addEventListener("DOMContentLoaded", () => {
  renderProducts("all");

  const fabZalo = document.getElementById("fabZalo");
  if (fabZalo) {
    fabZalo.addEventListener("click", () => {
      console.log("Đang mở Zalo đặt món...");
    });
  }
});
