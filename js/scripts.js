// JavaScriptファイルを作成して、お問い合わせフォームを処理する
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // デフォルトの送信動作をキャンセル

        const formData = new FormData(contactForm);
        const formDataSerialized = new URLSearchParams(formData).toString();

        // メール送信のための設定
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formDataSerialized
        };

        // メール送信処理を実行
        fetch('https://formspree.io/f/xwpekeob', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    alert('お問い合わせありがとうございます。メッセージが送信されました。');
                    contactForm.reset(); // フォームをリセットする
                } else {
                    alert('申し訳ありませんが、メッセージの送信中にエラーが発生しました。もう一度お試しください。');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('申し訳ありませんが、メッセージの送信中にエラーが発生しました。もう一度お試しください。');
            });
    });
});
