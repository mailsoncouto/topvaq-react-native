import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@haras_data";

interface Haras {
  haras: string;
  proprietario: string;
  cavalo: string;
  premios: string;
}

export default function App() {
  const [haras, setHaras] = useState<Haras[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState<Haras>({
    haras: "",
    proprietario: "",
    cavalo: "",
    premios: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setHaras(JSON.parse(data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveData = async (newHaras: Haras[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newHaras));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = () => {
    if (editIndex !== null) {
      const updatedHaras = haras.map((item, index) =>
        index === editIndex ? form : item
      );
      setHaras(updatedHaras);
      setEditIndex(null);
    } else {
      setHaras([...haras, form]);
    }
    setForm({ haras: "", proprietario: "", cavalo: "", premios: "" });
    saveData(haras);
  };

  const handleEdit = (index: number) => {
    setForm(haras[index]);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    Alert.alert("Excluir", "Você tem certeza?", [
      { text: "Cancelar" },
      {
        text: "Excluir",
        onPress: () => {
          const updatedHaras = haras.filter((_, i) => i !== index);
          setHaras(updatedHaras);
          saveData(updatedHaras);
        },
      },
    ]);
  };
  

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/back.png")}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>
          {editIndex !== null ? "Editar Haras" : "Adicionar Haras"}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Haras"
          placeholderTextColor="#ddd"
          value={form.haras}
          onChangeText={(text) => setForm({ ...form, haras: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Proprietário"
          placeholderTextColor="#ddd"
          value={form.proprietario}
          onChangeText={(text) => setForm({ ...form, proprietario: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Cavalo"
          placeholderTextColor="#ddd"
          value={form.cavalo}
          onChangeText={(text) => setForm({ ...form, cavalo: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Premios"
          placeholderTextColor="#ddd"
          value={form.premios}
          onChangeText={(text) => setForm({ ...form, premios: text })}
        />
        <TouchableOpacity style={styles.customButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {editIndex !== null ? "Atualizar" : "Adicionar"}
          </Text>
        </TouchableOpacity>
        <FlatList
          data={haras}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{`Haras: ${item.haras}`}</Text>
              <Text
                style={styles.itemText}
              >{`Proprietário: ${item.proprietario}`}</Text>
              <Text style={styles.itemText}>{`Cavalo: ${item.cavalo}`}</Text>
              <Text style={styles.itemText}>{`Premios: ${item.premios}`}</Text>
              <TouchableOpacity
                onPress={() => handleEdit(index)}
                style={styles.editButton}
              >
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(index)}
                style={styles.deleteButton}
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 50,
    marginTop: 80,
    color: "#fff",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: "#fff",
    borderRadius: 10,
  },
  customButton: {
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  list: {
    marginTop: 20, 
  },
  listContent: {
    paddingBottom: 16, 
  },
  itemContainer: {
    marginBottom: 12,
    padding: 8,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 4,
  },
  itemText: {
    color: "#fff",
  },
  editButton: {
    backgroundColor: "#007bff",
    padding: 6,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    padding: 6,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
  },
});
