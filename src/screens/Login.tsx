import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/Firebase";
import { useNavigation } from "@react-navigation/native";

const schema = yup.object({
  email: yup.string().required("Email é obrigatório").email("Email inválido"),
  
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(8, "Sua senha deve ter pelo menos 8 caracteres"),
});

type FormInputs = {
  email: string;
  password: string;
};

type StackParamsList = {
  Login: undefined;
  Cadastro: undefined;
  Parceiros: undefined;
  HomeScreen: undefined;
};



export default function Login() {
  const navigation = useNavigation();

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const email = watch("email");
  const password = watch("password");

  useEffect(() => {
    if (email && password && !errors.email && !errors.password) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [email, password, errors]);

  const onSubmit = (data: FormInputs) => {
    console.log(data);
    createUser(data.email, data.password);
  };

  async function createUser(email: string, password: string) {
    try {
      const value = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Cadastrado com sucesso! \n" + value.user.uid);
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.log(error);
    }
  }

  const handleForgotPassword = () => {
    console.log("Esqueci a senha clicado");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/topvaq.png")} style={styles.img} />
      <View style={styles.wrp}>
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <Text style={styles.login}>Login</Text>
              <TextInput
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={[
                  styles.input,
                  { color: "black" },
                  error ? { borderColor: "red" } : {},
                ]}
                placeholderTextColor="black"
              />
              {error && <Text style={styles.errorText}>{error.message}</Text>}
            </>
          )}
          name="email"
          rules={{ required: true }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                placeholder="Senha"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={[
                  styles.input,
                  { color: "black" },
                  error ? { borderColor: "red" } : {},
                ]}
                placeholderTextColor="black"
              />
              {error && <Text style={styles.errorText}>{error.message}</Text>}
            </>
          )}
          name="password"
          rules={{ required: true }}
          defaultValue=""
        />

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isButtonEnabled ? "blue" : "gray" },
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={!isButtonEnabled}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Esqueci a Senha</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.cadastrar}>Cadastre-se</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Parceiros')}>
          <Text style={styles.parceiros}>Parceiros</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 26,
    top: 50,
    marginBottom: -130,
  },
  wrp: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 8,
    width: 220,
    height: 370, 
    alignSelf: 'center',
    alignItems: 'center',
  },
  img: {
    position: "absolute",
    top: -80,
    bottom: 0,
    left: -20,
    zIndex: -1,
    width: 450,
    height: 950,
  },
  login: {
    color: '#febcd',
    fontSize: 30,
    marginBottom: 20,
    fontWeight: '700'
  },
  input: {
    width: 180,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    marginTop: 10,
    borderRadius: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -10,
  },
  button: {
    width: 180,
    height: 40,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  forgotPasswordText: {
    color: "black",
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: -5,
    fontSize: 12,
    fontWeight: '600'
  },
  cadastrar: {
    color: 'blue',
    marginTop: 20,
    fontWeight: '600'
  },
  parceiros: {
    color: 'blue',
    marginTop: 20,
    fontWeight: '600'
  }
});
