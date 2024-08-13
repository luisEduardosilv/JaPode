import React, { useState } from 'react';
import { View, TextInput, Image, Text, ScrollView, ActivityIndicator, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Search({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);

  const getRecipes = async () => {
    if (!searchTerm.trim()) {
      setError('Digite um termo de pesquisa válido.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get('https://tasty.p.rapidapi.com/recipes/list', {
        headers: {
          'X-RapidAPI-Key': '64f418a75dmsh6d9cdf93e25cff8p17af51jsnc584d4473857',
          'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        },
        params: {
          from: offset,
          size: limit,
          q: searchTerm.trim()
        }
      });

      if (response.data && response.data.results) {
        setRecipes(prevRecipes => [...prevRecipes, ...response.data.results]);
        setError('');
      } else {
        setError('Nenhum resultado encontrado.');
      }
    } catch (error) {
      console.error('Erro na solicitação:', error);
      setError('Ocorreu um erro ao buscar receitas.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreRecipes = () => {
    setOffset(offset + limit);
    getRecipes();
  };

  const openRecipeDetails = (recipe) => {
    navigation.navigate('RecipeDetailScreen', { recipe });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={text => setSearchTerm(text)}
          value={searchTerm}
          placeholder="Broccoli pasta"
        />
        <Icon name="search" size={20} color="black" style={styles.searchIcon} />
      </View>
      <Pressable
        style={({ pressed }) => ({
          ...styles.button,
          backgroundColor: pressed ? '#f55000' : '#f55000',
          alignSelf: 'center',
        })}
        onPress={() => { setOffset(0); setRecipes([]); getRecipes(); }}>
        <Text style={styles.buttonText}>Search recipes</Text>
      </Pressable>

      {error !== '' && <Text style={styles.error}>{error}</Text>}
      {isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#f55000" />
          </View>
        )}

      <ScrollView style={styles.scrollView}>
        {recipes.length > 0 && (
          <View>
            {recipes.map((recipe, index) => (
              <TouchableOpacity key={index} onPress={() => openRecipeDetails(recipe)}>
                <View style={styles.card}>
                  <Text style={styles.recipeName}>{recipe.name}</Text>
                  {recipe.thumbnail_url && (
                    <Image
                      source={{ uri: recipe.thumbnail_url }}
                      style={styles.recipeImage}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
            <Pressable
              style={({ pressed }) => ({
                ...styles.button,
                backgroundColor: pressed ? '#f55000' : '#f55000',
                alignSelf: 'center',
              })}
              onPress={loadMoreRecipes}>
              <Text style={styles.buttonText}>Load more</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    padding: 5,
    marginBottom: 10,
    borderRadius: 20,
    width: '70%',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  searchIcon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#f55000',
    borderRadius: 20,
    width: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    marginVertical: 10,
    color: 'red',
  },
  scrollView: {
    width: '100%',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#f55000',
    borderRadius: 10,
    padding: 10,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  recipeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 5,
  },
});