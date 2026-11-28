function selectPackage(cardEl) {
      const cards = document.querySelectorAll('.pkg-card');
      cards.forEach(c => {
        c.classList.remove('is-selected');
        const btn = c.querySelector('.pkg-btn');
        if (btn && btn.dataset.defaultText) {
          btn.textContent = btn.dataset.defaultText;
        }
      });

      cardEl.classList.add('is-selected');
      const activeBtn = cardEl.querySelector('.pkg-btn');
      if (activeBtn) {
        if (!activeBtn.dataset.defaultText) {
          activeBtn.dataset.defaultText = activeBtn.textContent;
        }
        activeBtn.textContent = '✓ Đã chọn';
      }

      document.getElementById('selected-name').textContent = cardEl.dataset.pkg;
      document.getElementById('selected-price').textContent = cardEl.dataset.price;
    }

    // Lưu nhãn gốc của các nút khi tải trang
    document.querySelectorAll('.pkg-btn').forEach(btn => {
      if (!btn.textContent.startsWith('✓')) {
        btn.dataset.defaultText = btn.textContent;
      } else {
        btn.dataset.defaultText = 'Chọn vĩnh viễn';
      }
    });