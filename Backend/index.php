<?php

    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    require_once 'services/connection.php';

    $FormatoJSON = file_get_contents('php://input');
    $dados = json_decode($FormatoJSON, true);

    if(!$dados)
        {
            http_response_code(400);

            echo json_encode([
            "status" => false,
            "mensagem" => "Não foi possível ler os dados enviados."
            ]);

            exit;
        }

    require_once __DIR__ . '/routes/api.php';