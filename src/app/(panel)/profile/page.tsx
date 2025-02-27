import { supabase } from '@/src/lib/supabase';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useAuth } from '@/src/context/AuthContext';

export default function profile() {
    const { setAuth } = useAuth()

    async function handleSignOut() {
        const { error } = await supabase.auth.signOut()
        setAuth(null)
        if(error) {
            Alert.alert("Erro ao sair da conta, tente mais tarde")
        }

        
    }

    return (
        <View style={styles.container}>
            <Text>Pagina Profile</Text>

            <Button
                title="Sair"
                onPress={handleSignOut}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})