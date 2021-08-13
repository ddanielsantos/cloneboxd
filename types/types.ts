type pessoa = {
    nome: string,
    genero: string,
    nascidoEm: string,
    nacionalidade: string,
    bio: string,
    cargo: number,
}

type filme ={
    titulo: string,
    duracao: string,
    ano: string,
    nacionalidade: string,
}

type cargo = {
    nome: string,
}

export { pessoa, filme, cargo }