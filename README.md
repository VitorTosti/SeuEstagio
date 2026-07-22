# SeuEstagio

Protótipo responsivo de uma plataforma brasileira para universitários encontrarem vagas de estágio alinhadas ao curso, à localização e aos objetivos profissionais.

## Recursos do protótipo

- Busca local por curso, cargo e cidade.
- Vagas realistas com bolsa, modalidade e benefícios.
- Favoritos persistidos no navegador.
- FAQ interativo e navegação responsiva.
- Ações futuras apresentadas em um diálogo de protótipo.
- Publicação automatizada no GitHub Pages.

## Tecnologias

- React 19 e TypeScript.
- Vite para desenvolvimento e build.
- Vitest e Testing Library para testes.
- Lucide React para os ícones.

## Desenvolvimento

```bash
npm install
npm run dev
```

O terminal exibirá o endereço local da aplicação.

## Verificação

```bash
npm test
npm run build
```

## Publicação no GitHub Pages

1. Crie um repositório no GitHub e envie a branch `master`.
2. Abra **Settings > Pages** no repositório.
3. Em **Build and deployment**, selecione **GitHub Actions**.
4. Faça um novo push para `master` ou execute manualmente o workflow **Deploy SeuEstagio to GitHub Pages**.

O workflow instala as dependências, executa os testes, gera a pasta `dist` e publica o site automaticamente.

## Escopo

Esta versão é um protótipo frontend. Cadastro, autenticação, candidaturas reais, banco de dados e painel de empresas ainda não estão conectados.

## Design

A interface segue o sistema visual em `.superdesign/design-system.md` e a direção aprovada no canvas do Superdesign.
