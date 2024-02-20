document.getElementById('sendAmountForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const amount = document.getElementById('amount').value;

    fetch('/send-amount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: amount })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        alert(data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred');
    });
});
