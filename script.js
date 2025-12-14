const notificationArea = document.getElementById('notification-area');

// Hàm hiển thị thông báo
function showNotification(message) {
    notificationArea.innerText = message;
    notificationArea.classList.add('show');
    
    // Ẩn thông báo sau 2 giây
    setTimeout(() => {
        notificationArea.classList.remove('show');
    }, 2000);
}

// Hàm sao chép giá trị
function copyValue(elementId, buttonElement, type) {
    const valueElement = document.getElementById(elementId);
    const valueToCopy = valueElement.innerText;
    
    navigator.clipboard.writeText(valueToCopy).then(() => {
        const originalIcon = buttonElement.innerHTML;
        buttonElement.innerHTML = '<i class="fas fa-check"></i>'; 
        
        showNotification(type + ' đã sao chép');

        setTimeout(() => {
            buttonElement.innerHTML = originalIcon;
        }, 1500);

    }).catch(err => {
        console.error('Could not copy text: ', err);
        alert('Không thể sao chép tự động. Vui lòng sao chép thủ công: ' + valueToCopy);
    });
}

// Hàm lưu ảnh QR (Sử dụng data-download-url)
function saveQrCode(buttonElement, filename) {
    const imageUrl = buttonElement.getAttribute('data-download-url');
    
    if (!imageUrl || imageUrl.startsWith('http') === false) {
        showNotification('Lỗi: Đường dẫn tải ảnh QR không hợp lệ. Vui lòng kiểm tra lại ID.');
        return;
    }

    // Tạo một thẻ <a> ẩn để kích hoạt tải xuống
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename; 
    
    // Kích hoạt tải xuống mà không chuyển tab
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Phản hồi trực quan
    const originalIcon = buttonElement.innerHTML;
    buttonElement.innerHTML = '<i class="fas fa-check"></i>'; 
    
    showNotification('Đã tải ảnh QR');

    // Trở lại trạng thái ban đầu sau 1.5 giây
    setTimeout(() => {
        buttonElement.innerHTML = originalIcon;
    }, 1500);
}

