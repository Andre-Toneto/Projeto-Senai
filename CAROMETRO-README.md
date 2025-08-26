# Sistema de Gerenciamento do Carômetro

## Funcionalidades Implementadas

✅ **Adicionar Alunos Manualmente**
- Interface completa para cadastro de novos alunos
- Campos para todos os dados pessoais
- Upload de foto dos alunos (base64)

✅ **Gerenciamento de Dados**
- Salvar dados no localStorage do navegador
- Carregar dados automaticamente
- Editar informações existentes
- Excluir alunos

✅ **Armazenamento Local**
- Dados salvos no localStorage do navegador
- Fotos convertidas para base64 e salvas junto
- Funciona tanto no Builder.io quanto localmente
- Sistema de backup/restore com arquivos JSON

✅ **Backup e Restore**
- Exportar dados da turma como arquivo JSON
- Importar dados de arquivo JSON
- Backup automático no localStorage

## Como Usar

### 1. Acessar o Carômetro
1. Faça login no sistema
2. Acesse "Carômetro" no menu
3. Faça login no carômetro (professor/123456)
4. Digite o código da turma

### 2. Adicionar Novo Aluno
1. Clique em "Adicionar Pessoa"
2. Preencha os dados obrigatórios (Nome e Matrícula)
3. Adicione uma foto clicando no ícone da câmera
4. Preencha outros dados conforme necessário
5. Clique em "Salvar"

### 3. Editar Aluno
1. Clique nos 3 pontos no cartão do aluno
2. Selecione "Editar"
3. Modifique os dados necessários
4. Clique em "Atualizar"

### 4. Excluir Aluno
1. Clique nos 3 pontos no cartão do aluno
2. Selecione "Excluir"
3. Confirme a exclusão

## Estrutura de Arquivos

### Dados dos Alunos
```
data/
├── turma-T2025-001.txt    # Dados da turma T2025-001
├── turma-ADM-2024.txt     # Dados da turma ADM-2024
└── exemplo-estrutura.txt  # Exemplo da estrutura dos dados
```

### Fotos dos Alunos
```
public/uploads/fotos/
├── 1234567890-abc123.jpg  # Foto do aluno 1
├── 1234567891-def456.png  # Foto do aluno 2
└── .gitkeep
```

## Formato dos Dados

Os dados são salvos em formato JSON dentro de arquivos TXT:

```json
[
  {
    "nome": "João Silva",
    "matricula": "2025001",
    "cargo": "Aluno",
    "curso": "Técnico em Informática",
    "foto": "/uploads/fotos/foto.jpg",
    "telefone": "(11) 3333-4444",
    "celular": "(11) 98888-7777",
    "rg": "12.345.678-9",
    "cpf": "123.456.789-00",
    "endereco": "Rua das Flores, 123",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01000-000",
    "mae": "Maria Silva",
    "pai": "José Silva",
    "empresa": "SENAI",
    "ocorrencias": []
  }
]
```

## Tipos de Arquivo Suportados para Fotos

- JPG/JPEG
- PNG
- GIF
- WebP

## Observações Importantes

- Os dados ficam salvos localmente no seu PC
- Cada turma tem seu próprio arquivo de dados
- As fotos são redimensionadas automaticamente
- O sistema mantém histórico de todas as alterações
- É possível fazer backup copiando a pasta `data/`

## Credenciais de Acesso

**Carômetro:**
- Usuário: `professor`
- Senha: `123456`

## Suporte

Se encontrar algum problema, verifique:
1. Se os diretórios `data/` e `public/uploads/fotos/` existem
2. Se o servidor tem permissão de escrita nestes diretórios
3. Se o tamanho da foto não excede o limite permitido
