document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const box = document.querySelector('.box');

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

        // 自分で実装したメール送信のエンドポイント
        const endpoint = '/sendmail'; // サーバーサイドのエンドポイントを指定する

        // メール送信処理を実行
        fetch(endpoint, requestOptions)
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

    box.addEventListener('click', function() {
        box.classList.toggle('clicked');
    });
});
