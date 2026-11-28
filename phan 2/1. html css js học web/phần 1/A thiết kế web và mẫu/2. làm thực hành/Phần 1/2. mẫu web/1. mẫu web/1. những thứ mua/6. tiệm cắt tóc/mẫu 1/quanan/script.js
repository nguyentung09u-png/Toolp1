// ===== DỮ LIỆU BẢNG GIÁ QUÝ TÌNH BARBER SHOP =====
const products = [
  // DỊCH VỤ LẺ
  { name: "Cắt Tóc Người Lớn", price: 40000, category: "dich-vu-le", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80" },
  { name: "Cắt Tóc Trẻ Em (1 - 13T)", price: 30000, category: "dich-vu-le", image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=80" }, // cần kiểm tra
  { name: "Cạo Mặt Khăn Nóng", price: 15000, category: "dich-vu-le", image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&q=80" },
  { name: "Ráy Tai Êm Ái", price: 30000, category: "dich-vu-le", image: "https://images.unsplash.com/photo-1512690459411-b9245aed614b?w=400&q=80" }, // cần kiểm tra
  { name: "Lột Mụn Cám", price: 20000, category: "dich-vu-le", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80" }, // cần kiểm tra
  { name: "Đắp Mặt Nạ Dưỡng Da", price: 25000, category: "dich-vu-le", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80" },
  { name: "Tẩy Tế Bào Chết Da Mặt", price: 25000, category: "dich-vu-le", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80" }, // cần kiểm tra
  { name: "Xông Hơi Thư Giãn", price: 20000, category: "dich-vu-le", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80" }, // cần kiểm tra
  { name: "Tạo Kiểu Sáp & Gôm", price: 15000, category: "dich-vu-le", image: "https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?w=400&q=80" },
  { name: "Gội Đầu Massage Mặt", price: 30000, category: "dich-vu-le", image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&q=80" },
  { name: "Gội Dưỡng Sinh Cổ Vai Gáy", price: 50000, category: "dich-vu-le", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80" },

  // COMBO SIÊU TIẾT KIỆM
  { name: "Combo Cạo - Ráy", price: 40000, category: "combo-tiet-kiem", image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&q=80" },
  { name: "Combo Cắt - Cạo", price: 50000, category: "combo-tiet-kiem", image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&q=80" },
  { name: "Combo Cắt - Cạo - Ráy", price: 70000, category: "combo-tiet-kiem", image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&q=80" },
  { name: "Combo Full (Cắt - Cạo - Ráy - Lột)", price: 90000, category: "combo-tiet-kiem", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80" },
  { name: "Combo VIP Thư Giãn (Cắt - Gội Massage - Ráy Tai - Đắp Mặt Nạ)", price: 100000, category: "combo-tiet-kiem", image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&q=80" }
];

// ===== HÀM RENDER DỊCH VỤ =====
const productGrid = document.getElementById("productGrid");
const filterNav = document.getElementById("filterNav");
const ZALO_LINK = "https://zalo.me/0367411225";
const ZALO_ICON = "https://static.freepnglogo.com/images/all_img/zalo-icon-4635.png";

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

function getCategoryName(category) {
  const map = {
    "dich-vu-le": "Dịch Vụ Lẻ",
    "combo-tiet-kiem": "Combo Siêu Tiết Kiệm"
  };
  return map[category] || category;
}

function renderProducts(category = "all") {
  const filtered = category === "all"
    ? products
    : products.filter(item => item.category === category);

  if (filtered.length === 0) {
    productGrid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; padding: 40px;">Không có dịch vụ nào trong danh mục này.</p>`;
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
          Đặt lịch ngay
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
      console.log("Đang mở Zalo đặt lịch...");
    });
  }
});
