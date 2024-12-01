import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import { VagaProps } from '../../utils/Types';
import { Feather } from '@expo/vector-icons';
import { 
    Wrapper,
    Container, 
    Header, 
    HeaderButtonContainer, 
    ButtonIcon, 
    ButtonText,
    ContentContainer,
    Title,
    Description
} from '../Details/styles';
import Logo from '../../components/Logo';
import theme from '../../theme';
import { Button } from '../../components/Button';
import { Linking } from 'react-native';

export default function Details({route, navigation }) {

    const [id] = useState(route.params?.id || null);
    const [vaga, setVaga] = useState<VagaProps>(null);

    useEffect(() => {
        if (!id) {
            console.error("ID não encontrado em route.params.");
            navigation.goBack();
        }
    }, [id]);

    const fetchVaga = async () => {
        try{
            const response = await api.get(`/vagas/${id}`);
            const data = response.data.vaga;

            console.log(data);

            setVaga({
                id: data.id,
                titulo: data.titulo,
                dataCadastro: data.dataCadastro,
                descricao: data.descricao,
                telefone: data.telefone,
                status: data.status,
                empresa: data.empresa
            })
        } catch (error) {
            console.log(error);

        }
    };

    useEffect(() =>{
        fetchVaga();
    }, [id]);


    // Função para abrir o WhatsApp com número e mensagem
    const handleWhatsAppRedirect = () => {
        if (vaga?.telefone) {
            const whatsappURL = `https://wa.me/${vaga.telefone}?text=Olá, gostaria de saber mais sobre a vaga "${vaga.titulo}".`;
            Linking.openURL(whatsappURL).catch(() =>
                console.log('Erro ao abrir o WhatsApp.')
            );
        }
    };

    return (
        <Wrapper>
            <Header>
                <HeaderButtonContainer onPress={() => navigation.goBack()}>
                    <ButtonIcon>
                        <Feather size={16} name="chevron-left" color={theme.COLORS.BLUE} />
                    </ButtonIcon>
                    <ButtonText>
                        Voltar
                    </ButtonText>
                </HeaderButtonContainer>
                <Logo />
            </Header>


            {vaga ? (
                <Container>
                <ContentContainer>
                    <Title>{vaga.titulo}</Title>
                    <Description>{vaga.descricao}</Description>
                </ContentContainer>

                 {/* Renderiza o botão se a vaga estiver aberta */}
                 {vaga.status === 'aberta' ? (
                        <Button 
                            title="Entrar em contato" 
                            noSpacing={true} 
                            variant="primary"
                            onPress={handleWhatsAppRedirect}
                        />
                    ) : (
                        // Mensagem exibida se a vaga não estiver aberta
                        
                        <Description style={{ textAlign: 'center', color: theme.COLORS.GRAY_03 }}>
                            <Feather size={16} name="frown" color={theme.COLORS.GRAY_03} />
                            Vaga encerrada.
                        </Description>
                    )}
            </Container>
            ) : (
                <Title>Vaga não foi encontrada.</Title>
            )}
            
        </Wrapper>
    );
}
