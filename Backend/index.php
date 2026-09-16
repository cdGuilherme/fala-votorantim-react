<?php

    header('Content-type: application/json');

    $FormatoJSON = file_get_contents('http://input');
    $dados = json_decode($FormatoJSON, true);

    if(!$FormatoJSON)
        {
            $erro = [
                'Status' => 'Failed',
                'Code'   => '404',
                'Mensage'=> 'ERRO! Infelizmente não chegou no index.php'
            ]

            echo json_encode($erro);
        }