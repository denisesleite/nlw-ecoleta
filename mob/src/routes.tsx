import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; //Navegação em pilha, chama as proximas telas atráves de botao e as telas anteriores não deixam de existir, o usuário consegue voltar

import Home from './pages/Home';
import Points from './pages/Points';
import Detail from './pages/Detail';

const AppStack = createStackNavigator();

const Routes = () => {
    return (
        // Define as rotas como elas devem se comportar
        <NavigationContainer>
            {/* headerMode remove cabeçalho da página */}
            {/* primeira chaves código JS, segunda chaves objeto */}
            <AppStack.Navigator headerMode="none" 
            screenOptions={{ 
                cardStyle: {
                backgroundColor: "#F0F0F5"
             }}
            }>
                {/* cada tela da apliação */}
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Points" component={Points} />
                <AppStack.Screen name="Detail" component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;