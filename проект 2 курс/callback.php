<?php
session_start();
require_once __DIR__.'/vendor/autoload.php';

use YandexCheckout\Client;

$client = new Client();
$client->setAuth('ВАШ_ИДЕНТИФИКАТОР_МАГАЗИНА', 'ВАШ_СЕКРЕТНЫЙ_КЛЮЧ');

try {
    $notification = $client->processNotification($_REQUEST);
    $_SESSION['paid'] = true;
    header('Location: success.php');
} catch(\YandexCheckout\Common\Exceptions\BadRequestException $e) {
    die($e->getMessage());
}