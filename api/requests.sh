#!/bin/bash

# CONFIG
BASE_URL="http://localhost:3333/user"
CONTENT_TYPE="Content-Type: application/json"

# CORES DO TERMINAL
GREEN='\033[0;32m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m'

# GERA UM EMAIL ÚNICO PARA EVITAR ERRO DE "UNIQUE CONSTRAINT" NOS TESTES REPETIDOS
TIMESTAMP=$(date +%s)
EMAIL="user_${TIMESTAMP}@example.com"

echo -e "${CYAN}=== INICIANDO TESTES DE API DE USUÁRIOS ===${NC}\n"

# ---------------------------------------------------------
# (POST) Criar um usuário
# ---------------------------------------------------------
echo -e "${CYAN}[1] Criando usuário (POST /)...${NC}"
CREATE_RESPONSE=$(curl -s -X POST "$BASE_URL" \
  -H "$CONTENT_TYPE" \
  -d "{
    \"name\": \"Dev Teste\",
    \"email\": \"$EMAIL\",
    \"password\": \"123456\",
    \"role\": \"ADMIN\"
  }")

echo "Resposta: $CREATE_RESPONSE"

USER_ID=$(echo $CREATE_RESPONSE | grep -o '"id":"[^"]*"' | cut -d'"' -f4)

if [ -z "$USER_ID" ]; then
  echo -e "${RED}Erro: Não foi possível capturar o ID do usuário criado. Verifique se a API está rodando.${NC}"
  exit 1
else
  echo -e "${GREEN}>> Usuário criado com ID: $USER_ID${NC}\n"
fi

sleep 1

# ---------------------------------------------------------
# (GET) Buscar todos os usuários
# ---------------------------------------------------------
echo -e "${CYAN}[2] Listando todos os usuários (GET /)...${NC}"
curl -s -X GET "$BASE_URL" \
  -H "$CONTENT_TYPE"
echo -e "\n"

sleep 1

# ---------------------------------------------------------
# (GET) Buscar um usuário específico
# ---------------------------------------------------------
echo -e "${CYAN}[3] Buscando usuário específico (GET /$USER_ID)...${NC}"
curl -s -X GET "$BASE_URL/$USER_ID" \
  -H "$CONTENT_TYPE"
echo -e "\n"

sleep 1

# ---------------------------------------------------------
# (PUT) Atualizar um usuário específico
# ---------------------------------------------------------
echo -e "${CYAN}[4] Atualizando usuário (PUT /$USER_ID)...${NC}"
# Atualizando nome e status
curl -s -X PUT "$BASE_URL/$USER_ID" \
  -H "$CONTENT_TYPE" \
  -d "{
    \"name\": \"Dev Teste Atualizado\",
    \"status\": \"INACTIVE\"
  }"
echo -e "\n"

sleep 1

# ---------------------------------------------------------
# (DELETE) Deletar um usuário específico
# ---------------------------------------------------------
echo -e "${CYAN}[5] Deletando usuário (DELETE /$USER_ID)...${NC}"
curl -s -X DELETE "$BASE_URL/$USER_ID" \
  -H "$CONTENT_TYPE"
echo -e "\n"

echo -e "${GREEN}=== TESTES FINALIZADOS ===${NC}"