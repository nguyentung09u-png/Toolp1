// ===== DỮ LIỆU SẢN PHẨM (MẢNG OBJECT) =====
const products = [
  { id: 1, name: "Áo Hoodie Reset", price: 100000, category: "ao-hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80" },
  { id: 2, name: "Áo Thun Stussy", price: 80000, category: "ao-thun", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80" },
  { id: 3, name: "Áo Khoác Varsity", price: 100000, category: "ao-khoac", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80" },
  { id: 4, name: "Áo Polo Basic", price: 70000, category: "ao-polo", image: "https://images.unsplash.com/photo-1625910513413-5f8a7b7a6d8f?w=400&q=80" },
  { id: 5, name: "Áo Thun Oversize", price: 60000, category: "ao-thun", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80" },
  { id: 6, name: "Áo Khoác Nỉ Zip", price: 90000, category: "ao-khoac", image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&q=80" },
  { id: 7, name: "Quần Cargo", price: 90000, category: "quan", image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=400&q=80" },
  { id: 8, name: "Quần Jean Ống Rộng", price: 80000, category: "quan", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80" },
  { id: 9, name: "Quần Short Thể Thao", price: 50000, category: "quan", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&q=80" },
  { id: 10, name: "Áo Len Knit", price: 70000, category: "ao-len", image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&q=80" }
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
    "ao-thun": "Áo Thun",
    "ao-hoodie": "Áo Hoodie",
    "ao-khoac": "Áo Khoác",
    "ao-polo": "Áo Polo",
    "ao-len": "Áo Len",
    "quan": "Quần"
  };
  return map[category] || category;
}

function renderProducts(category = "all") {
  const filtered = category === "all"
    ? products
    : products.filter(item => item.category === category);

  if (filtered.length === 0) {
    productGrid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #6b9bc3;">Không có sản phẩm nào trong danh mục này.</p>`;
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
          Mua ngay
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
      console.log("Đang mở Zalo liên hệ...");
    });
  }
});