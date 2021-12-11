# Letterboxd Clone - Descontinuado

Projeto básico inspirado no [Letterboxd](https://www.letterboxd.com) e no [IMDB](https://www.imdb.com), pretendo continuar atualizando ele, na medida em que aprendo mais sobre criação de APIs.

## Sobre

A ideia da API é possibilitar que usuários criem contas no sistema, manipulem listas de filmes (assistidos ou não), os avaliem tanto com nota quanto com texto, visualizem os seus elencos, acessem informações sobre integrantes do filme e visualizem informações básicas sobre outros usuários.

Com o crescimento dos requisitos do sistema, troquei a ideia inicial de usar um driver comum de banco de dados por um Query Builder, troquei o Javascript pelo Typescript, remodelei alguns pedaços do banco e atualmente estou tentando desacoplar algumas partes para que o código seja mais reutilizável e auto explicativo (meio que o SOLID só que não tão bem implementado)
## Ferramentas
As principais ferramentas desse projeto foram:
- [Typescript](https://github.com/microsoft/TypeScript/#readme)
- [Express](https://github.com/expressjs/express)
- [Knex](https://github.com/knex/knex)
