(function () {
  const loader = document.getElementById('monter-page-loader');
  const bar = document.getElementById('ml-progress-bar');
  const statusText = document.getElementById('ml-status-text');

  function setProgress(ratio, text) {
    if (bar) bar.style.transform = `scaleX(${Math.max(0.05, Math.min(1, ratio))})`;
    if (text && statusText) statusText.textContent = text;
  }

  function hideLoader() {
    setProgress(1, 'Hoàn tất');
    setTimeout(() => {
      if (loader) loader.classList.add('is-hidden');
    }, 220);
  }

  window.runLoaderDemo = function () {
    if (!loader) return;
    loader.classList.remove('is-hidden');
    setProgress(0.18, 'Đang chuẩn bị giao diện');

    setTimeout(() => setProgress(0.48, 'Đang tải tài nguyên...'), 350);
    setTimeout(() => setProgress(0.82, 'Đang đồng bộ hệ thống...'), 750);
    setTimeout(() => hideLoader(), 1200);
  };

  // Chạy hiệu ứng khi mở trang
  runLoaderDemo();
})();
