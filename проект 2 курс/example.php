<?php
require_once __DIR__.'/vendor/autoload.php'; // подключаем composer

use YandexCheckout\Client;

$client = new Client();
$client->setAuth('ВАШ_ИДЕНТИФИКАТОР_МАГАЗИНА', 'ВАШ_СЕКРЕТНЫЙ_КЛЮЧ');

$data = json_decode(file_get_contents('php://input'), true);

try {
    $payment = $client->createPayment(
        [
            'amount' => ['value' => $data['amount'], 'currency' => 'RUB'],
            'confirmation' => ['type' => 'redirect', 'return_url' => 'http://ВАШ_САЙТ/callback.php'],
            'capture' => true,
            'description' => 'Оплата товаров'
        ],
        uniqid('', true)
    );

    header('Content-Type: application/json');
    echo json_encode(['url' => $payment->getConfirmation()->getConfirmationUrl()]);
} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>