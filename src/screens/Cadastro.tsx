import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInputMask } from "react-native-masked-text";

type FormData = {
  nomeCompleto: string;
  email: string;
  senha: string;
  telefone: string;
  cpf: string;
  dataNascimento: string;
  estado: string;
  cidade: string;
  chavePix: string;
};

const estados = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PE",
  "PI",
  "PR",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SE",
  "SP",
  "TO",
];

const cidadesPorEstado: { [key: string]: string[] } = {
  AC: ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira", "Tarauacá"],
  AL: ["Maceió", "Arapiraca", "Palmeira dos Índios", "Rio Largo"],
  AP: ["Macapá", "Santana", "Laranjal do Jari", "Oiapoque"],
  AM: ["Manaus", "Parintins", "Itacoatiara", "Tefé"],
  BA: ["Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari"],
  CE: ["Fortaleza", "Caucaia", "Juazeiro do Norte", "Sobral"],
  DF: ["Brasília", "Gama", "Taguatinga", "Ceilândia"],
  ES: ["Vitória", "Vila Velha", "Serra", "Cariacica"],
  GO: ["Goiânia", "Anápolis", "Aparecida de Goiânia", "Rio Verde"],
  MA: ["São Luís", "Imperatriz", "Caxias", "Timon"],
  MG: ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora"],
  MS: ["Campo Grande", "Dourados", "Três Lagoas", "Corumbá"],
  MT: ["Cuiabá", "Várzea Grande", "Rondonópolis", "Sinop"],
  PA: ["Belém", "Ananindeua", "Santarém", "Marabá"],
  PB: ["João Pessoa", "Campina Grande", "Santa Rita", "Patos"],
  PE: ["Recife", "Olinda", "Jaboatão dos Guararapes", "Caruaru", "Garanhuns"],
  PI: ["Teresina", "Parnaíba", "Picos", "Floriano"],
  PR: ["Curitiba", "Londrina", "Maringá", "Foz do Iguaçu"],
  RJ: ["Rio de Janeiro", "Niterói", "Duque de Caxias", "São Gonçalo"],
  RN: ["Natal", "Mossoró", "Caicó", "Parnamirim"],
  RS: ["Porto Alegre", "Caxias do Sul", "Pelotas", "Santa Maria"],
  RO: ["Porto Velho", "Ji-Paraná", "Vilhena", "Rolim de Moura"],
  RR: ["Boa Vista", "Rorainópolis", "Caracaraí", "Cantá"],
  SC: ["Florianópolis", "Joinville", "Blumenau", "Criciúma"],
  SE: ["Aracaju", "Lagarto", "Itabaiana", "Nossa Senhora do Socorro"],
  SP: ["São Paulo", "Campinas", "Sorocaba", "Santos"],
  TO: ["Palmas", "Araguaína", "Paraíso do Tocantins", "Guaraí"],
};

const schema = Yup.object().shape({
  nomeCompleto: Yup.string().required("Nome completo é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  senha: Yup.string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
  telefone: Yup.string()
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido")
    .required("Telefone é obrigatório"),
  cpf: Yup.string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido")
    .required("CPF é obrigatório"),
  dataNascimento: Yup.string().required("Data de nascimento é obrigatória"),
  estado: Yup.string().required("Estado é obrigatório"),
  cidade: Yup.string().required("Cidade é obrigatória"),
  chavePix: Yup.string().required("Chave Pix é obrigatória"),
});

export default function Cadastro() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const selectedEstado = watch("estado");
  const cidadesDisponiveis = selectedEstado
    ? cidadesPorEstado[selectedEstado] || []
    : [];

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/horse.png")} style={styles.image} />
      <View style={styles.inputContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.cadastro}>Cadastro</Text>

          <Controller
            control={control}
            name="nomeCompleto"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputWrapper}>
                <TextInputMask
                  type={"custom"}
                  options={{ mask: "***********************" }}
                  placeholder="Nome Completo"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.nomeCompleto && (
                  <Text style={styles.errorText}>
                    {errors.nomeCompleto.message}
                  </Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputWrapper}>
                <TextInputMask
                  type={"custom"}
                  options={{ mask: "*********************************" }}
                  placeholder="Email"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email.message}</Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="senha"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputWrapper}>
                <TextInputMask
                  type={"custom"}
                  options={{ mask: "****************" }}
                  placeholder="Senha"
                  style={styles.input}
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.senha && (
                  <Text style={styles.errorText}>{errors.senha.message}</Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="telefone"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputWrapper}>
                <TextInputMask
                  type={"custom"}
                  options={{ mask: "(99) 99999-9999" }}
                  placeholder="Telefone"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.telefone && (
                  <Text style={styles.errorText}>
                    {errors.telefone.message}
                  </Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputWrapper}>
                <TextInputMask
                  type={"custom"}
                  options={{ mask: "999.999.999-99" }}
                  placeholder="CPF"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.cpf && (
                  <Text style={styles.errorText}>{errors.cpf.message}</Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="dataNascimento"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputWrapper}>
                <TextInputMask
                  type={"datetime"}
                  options={{ format: "DD/MM/YYYY" }}
                  placeholder="Data de nascimento"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.dataNascimento && (
                  <Text style={styles.errorText}>
                    {errors.dataNascimento.message}
                  </Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="estado"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputWrapper}>
                <View style={[styles.pickerWrapper, styles.input]}>
                  <Picker
                    selectedValue={value}
                    style={styles.picker}
                    onValueChange={(itemValue) => onChange(itemValue)}
                  >
                    <Picker.Item
                      label="Estado"
                      value=""
                      style={{ color: "#696969" }}
                    />
                    {estados.map((estado) => (
                      <Picker.Item key={estado} label={estado} value={estado} />
                    ))}
                  </Picker>
                </View>
                {errors.estado && (
                  <Text style={styles.errorText}>{errors.estado.message}</Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="cidade"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputWrapper}>
                <View style={[styles.pickerWrapper, styles.input]}>
                  <Picker
                    selectedValue={value}
                    style={styles.picker}
                    onValueChange={(itemValue) => onChange(itemValue)}
                    enabled={!!selectedEstado}
                  >
                    <Picker.Item
                      label="Cidade"
                      value=""
                      style={{ color: "#696969" }}
                    />
                    {cidadesDisponiveis.map((cidade) => (
                      <Picker.Item key={cidade} label={cidade} value={cidade} />
                    ))}
                  </Picker>
                </View>
                {errors.cidade && (
                  <Text style={styles.errorText}>{errors.cidade.message}</Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="chavePix"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputWrapper}>
                <TextInputMask
                  type={"custom"}
                  options={{ mask: "***********************" }}
                  placeholder="Chave Pix"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.chavePix && (
                  <Text style={styles.errorText}>
                    {errors.chavePix.message}
                  </Text>
                )}
              </View>
            )}
          />

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cadastro: {
    alignSelf: "center",
    fontWeight: "500",
    fontSize: 30,
    marginBottom: 15,
  },
  image: {
    position: "absolute",
    zIndex: -1,
    width: "100%",
    height: "100%",
  },
  inputContainer: {
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 20,
    borderRadius: 10,
    width: 300,
    height: "90%",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  inputWrapper: {
    marginBottom: 15,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  buttonContainer: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  pickerWrapper: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    overflow: "hidden",
    paddingLeft: -1,
  },
  picker: {
    height: 40,
    width: "100%",
  },
});
