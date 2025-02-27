import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, SafeAreaView, ScrollView, Alert } from "react-native";
import colors from "@/constants/colors";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons"
import { supabase } from "@/src/lib/supabase"

export default function Signup() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSignUp() {
        setLoading(true)

        const { data, error } = await supabase.auth.signUp(
            {
                email: email,
                password: password,
                options: {
                    data: {
                        name: name
                    }
                }
            },

        )
        setLoading(false)

        if (error) {
            Alert.alert("Error", error.message)
        } else {
            router.replace("/(auth)/signin/page")

        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
                <View style={styles.container}>
                    <View style={styles.header}>

                        <Pressable
                            style={styles.backButton}
                            onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={24} color={colors.white} />
                        </Pressable>

                        <Text style={styles.logoText}>
                            Dev<Text style={{ color: colors.green }}>App</Text>
                        </Text>
                        <Text style={styles.slogan}>Criar uma conta</Text>
                    </View>

                    <View style={styles.form}>
                        <View>
                            <Text style={styles.label}>Nome Completo</Text>
                            <TextInput
                                placeholder="Nome Completo"
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <View>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                placeholder="Digite seu email"
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        <View>
                            <Text style={styles.label}>Senha</Text>
                            <TextInput
                                placeholder="Digite sua senha"
                                style={styles.input}
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        <Pressable style={styles.button} onPress={handleSignUp}>
                            <Text style={styles.buttonText} >
                                {loading ? "Carregando..." : "Cadastrar"}
                            </Text>
                        </Pressable>



                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 34,
        backgroundColor: colors.zinc
    },
    header: {
        paddingLeft: 14,
        paddingRight: 14
    },
    logoText: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.white,
        marginBottom: 8,
    },
    slogan: {
        fontSize: 34,
        color: colors.white,
        marginBottom: 34,
    },
    form: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 24,
        paddingLeft: 14,
        paddingRight: 14,
    },
    label: {
        color: colors.zinc,
        marginBottom: 4
    },
    input: {
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 8,
        paddingTop: 14,
        paddingBottom: 14,
    },
    button: {
        backgroundColor: colors.green,
        paddingTop: 14,
        paddingBottom: 14,
        alignItems: "center",
        justifyContent: 'center',
        width: "100%",
        borderRadius: 8,
    },
    buttonText: {
        color: colors.white,
        fontWeight: "bold"
    },
    backButton: {
        backgroundColor: "rgba(255, 255, 255, 0.55)",
        alignSelf: "flex-start",
        padding: 8,
        borderRadius: 8,
        marginBottom: 8

    }
})