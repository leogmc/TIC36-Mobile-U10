import { Image, Alert } from 'react-native';
import { useState } from 'react';
import { Wrapper, Container, Form, TextContainer, TextBlack, TextLink, TextLinkContainer } from './styles';
import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import { Button } from '../../components/Button';
import api from '../../services/api'; 

export default function FormScreen({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!nome || !email || !senha) {
            Alert.alert('Erro', 'Todos os campos são obrigatórios.');
            return;
        }

        try {
            setLoading(true);
            const response = await api.post('/usuarios', { nome, email, senha });
            if (response.status === 201) {
                Alert.alert('Sucesso', 'Usuário criado com sucesso!');
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            Alert.alert('Erro', 'Não foi possível criar o usuário.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Wrapper>
            <Image source={BGTop} />
            <Container>
                <Form>
                    <Logo />
                    <Input 
                        label='Nome' 
                        placeholder='Digite seu nome' 
                        value={nome}
                        onChangeText={setNome}
                    />
                    <Input 
                        label='E-mail' 
                        placeholder='Digite seu e-mail' 
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Input 
                        label='Senha' 
                        placeholder='Digite sua senha' 
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry={true} 
                    />
                    <Button 
                        title={loading ? "Criando..." : "Criar Conta"} 
                        noSpacing={true} 
                        variant='primary' 
                        onPress={handleRegister} 
                        disabled={loading}
                    />
                    <TextContainer>
                        <TextBlack>Já tem uma conta?</TextBlack>
                        <TextLinkContainer onPress={() => navigation.navigate('Login')}>
                            <TextLink>Faça seu login.</TextLink>
                        </TextLinkContainer>
                    </TextContainer>
                </Form>
            </Container>
        </Wrapper>
    );
}
