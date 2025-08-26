# Sistema de Gerenciamento do Carômetro

## Funcionalidades Implementadas

✅ **Integração com Google Sheets**
- Busca dados diretamente de planilha do Google Sheets
- Sincronização automática de turmas e alunos
- Cache inteligente para performance
- URL da planilha configurável

✅ **Visualização de Dados**
- Lista de alunos por turma da planilha
- Informações detalhadas de cada aluno
- Interface moderna e responsiva
- Indicadores de status de sincronização

✅ **Gerenciamento de Cache**
- Cache local para melhor performance
- Atualização manual dos dados
- Indicadores de quando os dados foram atualizados
- Limpeza de cache quando necessário

✅ **Configuração Flexível**
- Interface para configurar URL da planilha
- Validação de conexão com a planilha
- Instruções detalhadas para configuração
- Suporte a diferentes estruturas de planilha

## Como Usar

### 1. Configurar a Planilha
1. Faça login no sistema
2. Acesse "Carômetro" no menu
3. Faça login no carômetro (professor/123456)
4. Clique em "Config" para configurar a planilha
5. Cole a URL da planilha do Google Sheets
6. Teste a conexão e salve

### 2. Preparar a Planilha do Google Sheets
1. Crie uma planilha no Google Sheets
2. Na primeira linha, adicione os cabeçalhos:
   - **Turma** (obrigatório)
   - **Nome** (obrigatório)
   - **Matricula** (recomendado)
   - Outros campos opcionais: Cargo, Curso, Telefone, Email, etc.
3. Preencha os dados dos alunos nas linhas seguintes
4. Publique a planilha: Arquivo → Compartilhar → Publicar na web
5. Escolha formato CSV e copie o link

### 3. Visualizar Turmas e Alunos
1. Na tela inicial, veja as turmas disponíveis da planilha
2. Clique em uma turma para visualizar os alunos
3. Clique em um aluno para ver detalhes completos
4. Use "Atualizar" para buscar dados mais recentes

### 4. Gerenciar Dados
1. Use "Config" para alterar a URL da planilha
2. Use "Atualizar" para sincronizar com a planilha
3. Monitore o status de sincronização no cabeçalho
4. Configure nova planilha quando necessário

## Armazenamento de Dados

### LocalStorage (Principal)
Os dados são salvos diretamente no localStorage do seu navegador:
```
localStorage:
├── carometro_turma_T2025-001    # Dados da turma T2025-001
├── carometro_turma_ADM-2024     # Dados da turma ADM-2024
└── carometro_turma_TEC-2025     # Dados da turma TEC-2025
```

### Backup via Download
- **Exportar**: Baixa arquivo JSON com todos os dados da turma
- **Importar**: Carrega dados de arquivo JSON para a turma

### Fotos dos Alunos
- Convertidas para **base64** e salvas no localStorage
- Tamanho máximo: **2MB por foto**
- Formatos suportados: JPG, PNG, GIF, WebP

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

- ✅ **Funciona no Builder.io e localmente**
- 💾 **Dados salvos no localStorage do navegador**
- 📱 **Cada turma tem armazenamento separado**
- 🖼️ **Fotos convertidas para base64 (máx 2MB)**
- 💾 **Backup automático via export/import JSON**
- 🔄 **Sistema funciona offline após carregamento inicial**
- ⚠️ **Dados ficam no navegador - faça backup regularmente**

## Credenciais de Acesso

**Carômetro:**
- Usuário: `professor`
- Senha: `123456`

## Suporte

Se encontrar algum problema, verifique:
1. Se os diretórios `data/` e `public/uploads/fotos/` existem
2. Se o servidor tem permissão de escrita nestes diretórios
3. Se o tamanho da foto não excede o limite permitido
