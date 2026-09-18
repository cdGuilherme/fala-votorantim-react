<?php

    $host = 'localhost';
    $password = '';
    $db = 'falaVotorantim';
    $user = 'root';
    $charset = 'utf8mb4';

    $dsn = "mysql:host = $host; dbname = $db; charset = $charset";

    try
    {
        $pdo = new PDO($dsn, $user, $password);
        echo "Conectado ao banco de dados";
    }
    catch(PDOException $e){
        echo "Erro de conexão: " . e->getMessage();
    }