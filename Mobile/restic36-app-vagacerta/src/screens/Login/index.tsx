import { Image } from 'react-native';
import { useState } from 'react';
import api from '../../services/api';
import { Wrapper,Container, Form, TextContainer, TextBlack, TextLink, TextLinkContainer } from './styles';
import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/authContext';

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { login } = useAuth();

    const handleLogin = async () => {
      try {
        const response = await api.post('/usuarios/login', { email, senha });
        const user = response.data.user;
        if (user) {
          await login(user); // Salva o usuário no contexto de autenticação
          
          navigation.reset({
            index: 0,
            routes: [{ name: 'Tab', params: { screen: 'Home', params: { screen: 'List' } } }],
          });
          
        }
      } catch (error) {
        console.log('Login falhou:', error.message);
      }
    };
    
      

    return (
        <Wrapper>
            <Image source={BGTop} />

            <Container>

                <Form>
                    <Logo />
                    <Input 
                        label='E-mail'
                        placeholder='digite seu e-mail'
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Input 
                        label='Senha'
                        placeholder='digite sua senha'
                        value={senha}
                        onChangeText={setSenha}
                    />
                    <Button 
                    title="Entrar" 
                    noSpacing={true} 
                    variant='primary'
                    onPress={handleLogin}
                    />
                    <TextContainer>
                        <TextBlack>Não tem uma conta?</TextBlack>
                        <TextLinkContainer onPress={() => navigation.navigate('FormScreen')}>
                            <TextLink>
                                    Crie agora mesmo.
                            </TextLink>
                        </TextLinkContainer>
                    </TextContainer>
                </Form>

            </Container>
        </Wrapper>
    );
}
