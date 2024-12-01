export type VagaProps = {
    id: number;
    titulo: String;
    descricao: String;
    dataCadastro: String;
    telefone: String;
    status: String;
    empresa: String;
};

export type RootStackParamList = {
    Login: undefined;
    FormScreen: undefined;
    Home: undefined;
    Profile: undefined;
    Details: {id: number};
};