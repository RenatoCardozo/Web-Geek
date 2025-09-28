# Geek Collection Manager

Plataforma em desenvolvimento para gestão de coleções do universo geek,
atualmente com suporte a mangás, HQs e livros, mas projetada para expansão
futura, incluindo figures, álbuns, jogos e art books. O sistema busca unir
organização personalizada e estatísticas visuais, proporcionando ao usuário uma
experiência de catálogo digital moderna.

## Funcionalidades

* Cadastro e autenticação de usuários.
* Cadastro de itens (livros, mangás, HQs, novels) com informações detalhadas.
* Vínculo do item ao usuário, incluindo campos como valor pago, estado de conservação, nota e status de leitura.
* Organização por autor, gênero, editora e idioma.
* Visualização de coleção com estatísticas e gráficos dinâmicos.

## Tecnologias Utilizadas

* ### Front-end:
  - Next.js (14.2.3) com React 18.
  - React Hook Form para formulários dinâmicos multi-etapas.
  - TailwindCSS para estilização responsiva.
  - SweetAlert2 e Sonner para feedback visual e notificações.
  - js-cookie para gerenciamento de sessões.
* ### Back-end:
  - Construído em Node.js com Express.
  - Prisma ORM para manipulação do banco de dados relacional.
  - JWT para autenticação e bcryptjs para criptografia de senhas.
  - Multer para upload de imagens (ex.: capas de itens ou avatares).
  - Dotenv para gerenciamento seguro de variáveis de ambiente.

## Instalação

Clone o repositório:

```bash
git clone https://github.com/RenatoCardozo/Web-Geek.git
```

Instale as dependências:

```bash
cd Web-Geek
npm install
```

Configure as variáveis de ambiente em um arquivo .env:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3006
```

Inicie o servidor:

```bash
npm run dev
```

Acesse o aplicativo em http://localhost:3000.

## Telas do Aplicativo

Abaixo estão capturas de tela das principais funcionalidades do Geek Collection:

### Tela de Login

<img src="https://github.com/RenatoCardozo/Images/blob/main/login.png" alt="Tela de login">
Autenticação do usuário com e-mail e senha.

### Telas de Cadastro

<img src="https://github.com/RenatoCardozo/Images/blob/main/cadastro.png" alt="Tela de Cadastro">

<img src="https://github.com/RenatoCardozo/Images/blob/main/cadastro2.png" alt="Tela de Cadastro">
Formulário para criação de uma nova conta.

### Cadastro de Item

<img src="https://github.com/RenatoCardozo/Images/blob/main/cadastrarItem1.png" alt="Tela de Cadastro de item">

<img src="https://github.com/RenatoCardozo/Images/blob/main/cadastrarItemManga1.png" alt="Tela de Cadastro de item">

<img src="https://github.com/RenatoCardozo/Images/blob/main/cadastrarItemManga2.png" alt="Tela de Cadastro de item">

<img src="https://github.com/RenatoCardozo/Images/blob/main/cadastrarItemManga4.png" alt="Tela de Cadastro de item">

<img src="https://github.com/RenatoCardozo/Images/blob/main/cadastrarItemManga5.png" alt="Tela de Cadastro de item">
Formulário para adicionar um novo item, incluindo imagem, nome, categoria e descrição.

### Adição à Coleção

<img src="https://github.com/RenatoCardozo/Images/blob/main/cadastrarItemManga6.png" alt="Tela de adição de item">

<img src="https://github.com/RenatoCardozo/Images/blob/main/cadastrarItemManga7.png" alt="Tela de adição de item">

<img src="https://github.com/RenatoCardozo/Images/blob/main/cadastroCompleto.png" alt="Tela de adição de item">
Interface para vincular itens à sua coleção pessoal.

### Perfil do Usuário

<img src="https://github.com/RenatoCardozo/Images/blob/main/perfil.png" alt="Pagina de Perfil">
Exibição das informações do usuário, como nome, e-mail e estatísticas da coleção.

### Edição de Perfil

<img src="https://github.com/RenatoCardozo/Images/blob/main/editarPerfil.png" alt="Pagina de edição de perfil">
Formulário para atualizar informações do perfil, como senha e dados pessoais.

### Menu

<img src="https://github.com/RenatoCardozo/Images/blob/main/menu.png" alt="Menu">
Navegação principal com links para todas as seções do aplicativo.

### Listagem de Itens com Filtro

<img src="https://github.com/RenatoCardozo/Images/blob/main/cadastrado.png" alt="Filtros">
Exibição de todos os itens da coleção com opções de filtro por coleção, genero, idioma e coleção.

### Pagina inicial

<img src="https://github.com/RenatoCardozo/Images/blob/main/inicial.png" alt="Tela inicial">
Lista as categorias que tem itens cadastrados e vinculados ao usuario, número de itens, número d ecategorias e o valor total gasto.

### Item completo

<img src="https://github.com/RenatoCardozo/Images/blob/main/cadastrado2.png" alt="Item">
Descrição completa do item.

## Planejamento Futuro:

* Suporte a novos tipos de itens geek (figures, álbuns, artbooks e jogos).
* Integração com APIs externas para preenchimento automático de informações.
* Funcionalidades sociais (compartilhamento de coleções, rankings e trocas entre usuários).
