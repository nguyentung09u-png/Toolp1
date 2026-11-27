// 1. Dữ liệu: Thêm 'ma' và 'badge'
const menuData = [
  // Nhóm Gà (Món chạy)
  { ma: "#1", ten: "Gà chiên giòn", gia: "20K", badge: "Bán chạy", hinhAnh: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400" },
  { ma: "#2", ten: "Gà xiên que", gia: "50K", badge: "Hot", hinhAnh: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400" },
  { ma: "#3", ten: "Gà rán phô mai", gia: "30K", badge: "", hinhAnh: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400" },
  { ma: "#4", ten: "Gà rán tẩm bột", gia: "40K", badge: "", hinhAnh: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400" },
  { ma: "#5", ten: "Gà rán ướp", gia: "20K", badge: "", hinhAnh: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400" },
  { ma: "#6", ten: "Gà rán chiên", gia: "40K", badge: "", hinhAnh: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=400" },
  
  // Nhóm Đồ uống
  { ma: "#7", ten: "Nước ngọt", gia: "20K", badge: "", hinhAnh: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400" },
  { ma: "#8", ten: "Trà sữa", gia: "50K", badge: "Món mới", hinhAnh: "https://images.unsplash.com/photo-1558857563-b371033873b8?w=400" },
  { ma: "#9", ten: "Trà chanh", gia: "30K", badge: "", hinhAnh: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400" },
  { ma: "#10", ten: "Sinh tố", gia: "40K", badge: "", hinhAnh: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400" },
  { ma: "#11", ten: "Nước ép", gia: "20K", badge: "", hinhAnh: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400" },
  
  // Nhóm Kem
  { ma: "#12", ten: "Kem bơ", gia: "20K", badge: "", hinhAnh: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400" },
  { ma: "#13", ten: "Kem trái cây", gia: "50K", badge: "", hinhAnh: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400" },
  { ma: "#14", ten: "Kem bánh flan", gia: "30K", badge: "", hinhAnh: "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=400" },
  { ma: "#15", ten: "Kem socola", gia: "40K", badge: "", hinhAnh: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400" }
];

const container = document.getElementById("menu-container");

function renderMenu() {
  container.innerHTML = "";

  menuData.forEach(function(mon) {
    const card = document.createElement("div");
    card.className = "menu-card";

    const badgeHTML = mon.badge 
      ? `<span class="badge">${mon.badge}</span>` 
      : "";

    card.innerHTML = `
  <img src="${mon.hinhAnh}" alt="${mon.ten}" class="card-img">
  
  <div class="card-body">
    <div class="card-header">
      ${badgeHTML}
      <span class="ma-mon">${mon.ma}</span>
    </div>
    <h3>${mon.ten}</h3>
    <p class="price">${mon.gia}</p>
    <a href="https://zalo.me/0367411225" target="_blank" class="btn-contact">Đặt món ${mon.ma}</a>
  </div>
`;

    container.appendChild(card);
  });
}

renderMenu();

/* =========================================================
   HIỆU ỨNG: Header fade-up khi tải trang
   ========================================================= */
window.addEventListener("load", () => {
  document.querySelector(".header-content").classList.add("show");
});