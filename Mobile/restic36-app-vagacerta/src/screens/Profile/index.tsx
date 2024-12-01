import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { 
    Wrapper,
    Container, 
    Header, 
    HeaderButtonContainer, 
    ButtonIcon, 
    ButtonText,
    ContentContainer,
} from '../Profile/styles';
import Logo from '../../components/Logo';
import theme from '../../theme';
import Input from '../../components/Input'
import { Button } from '../../components/Button';
import { useAuth } from '../../context/authContext';
import api from '../../services/api';


export default function Profile({route,navigation }) {

    const { logout, user, login } = useAuth();

    const [nome, setNome] = useState(user.nome);
    const [email, setEmail] = useState(user.email);
    const [senha, setSenha] = useState('');

    const handleUpdateUser = async () => {
        try {
          const updatedData = { nome, email, senha };
          const response = await api.put(`/usuarios/${user.id}`, updatedData);
          const updatedUser = response.data.user;
      
          if (updatedUser) {
            await login(updatedUser); // Atualiza o contexto com os novos dados
            console.log('Usuário atualizado com sucesso!');
            alert('Informações atualizadas com sucesso!');
          }
        } catch (error) {
          console.log('Erro ao atualizar usuário:', error.message);
          alert('Erro ao atualizar informações.');
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

            <Container>
                <ContentContainer>
                <Input
                    label="Nome"
                    placeholder="Digite seu nome"
                    value={nome}
                    onChangeText={setNome}
                    />
                    <Input
                    label="E-mail"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChangeText={setEmail}
                    />
                    <Input
                    label="Senha"
                    placeholder="Digite sua senha"
                    secureTextEntry={true}
                    value={senha}
                    onChangeText={setSenha}
                    />
                </ContentContainer>

                <Button 
                title="Salvar informações" 
                noSpacing={true} 
                variant="primary"
                onPress={handleUpdateUser}
                />


                <Button
                    title="Logout"
                    noSpacing={true}
                    variant='secondary'
                    onPress={logout}  
                    />
            </Container>
        </Wrapper>
    );
}
