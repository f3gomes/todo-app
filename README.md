# 🖥️ TODO APP

Aplicação web para gerenciamento de tarefas, construída com **Next.js**, **React**, **TypeScript** e **TailwindCSS**.  
Consome a API [TODO API](https://github.com/f3gomes/todo-api) para exibir e manipular as tarefas criadas.

---

## 🧑‍💻 Rodando o projeto localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/f3gomes/todo-app.git

   cd todo-app
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Crie um arquivo `.env.local` na raiz com as variáveis necessárias conforme arquivo env.example:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3333/api/v1
   ```

   > A variável `NEXT_PUBLIC_API_URL` deve apontar para o endpoint da API do projeto **todo-api**.

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

   Acesse em:  
   👉 http://localhost:3000

5. Para gerar build de produção:

   ```bash
   npm run build
   npm start
   ```

---

## 📁 Estrutura do projeto

```
.
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── TaskCard.tsx
│   ├── Navbar.tsx
│   └── etc...
├── lib/
├── schemas/
├── types/
├── public/
│   └── icons, imagens...
├── .env.example
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind.config.ts
```

---

## 🚀 Tecnologias utilizadas

- **Next.js 14+**  
- **React 18+**  
- **TypeScript**  
- **TailwindCSS**  
- **Lucide React** (ícones)  
- **Zod** (validação de schemas)  
- **Shadcn/UI** (componentes reutilizáveis)  
- **ESLint** e **Prettier** (padronização de código)

---

## 🔗 Integração com a API

O projeto consome dados da [TODO API](https://github.com/f3gomes/todo-api), utilizando chamadas HTTP para os endpoints:

| Método | Rota                | Descrição              |
| ------ | ------------------- | ---------------------- |
| GET    | `/task/list`        | Lista todas as tarefas |
| POST   | `/task/new`         | Cria uma nova tarefa   |
| PATCH  | `/task/edit/:id`    | Atualiza uma tarefa    |
| DELETE | `/task/delete/:id`  | Remove uma tarefa      |

> Certifique-se de que a API esteja rodando antes de iniciar o app.

---

## 🧩 Problemas comuns

- **API não responde:** verifique se o backend (`todo-api`) está ativo e acessível na URL configurada em `NEXT_PUBLIC_API_URL`.  
- **Erro de importação de módulo:** execute `npm install` novamente e garanta que o Node está na versão 18+.  
- **Erro de build:** limpe o cache (`rm -rf .next`) e rode novamente `npm run build`.

---

## ✅ Resumo rápido

| Ambiente  | Comando               | Endpoint local           |
| ---------- | -------------------- | ------------------------ |
| Dev        | `npm run dev`        | http://localhost:3000    |
| Start Prod | `npm start`          | http://localhost:3000    |

---

## 📄 Licença

Este projeto está sob a licença **MIT**.  
Sinta-se livre para usar, modificar e distribuir conforme necessário.

---

## ✉️ Contato

Desenvolvido por **Felipe Gomes**  
📧 [GitHub - f3gomes](https://github.com/f3gomes)
