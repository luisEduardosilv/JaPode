import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StatusBar } from 'react-native';
import axios from 'axios';

const Discover = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://tasty.p.rapidapi.com/recipes/list',
        params: {
          from: '0',
          size: '20',
          tags: ''
        },
        headers: {
          'X-RapidAPI-Key': '64f418a75dmsh6d9cdf93e25cff8p17af51jsnc584d4473857',
          'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setRecipes(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const openRecipeDetails = (recipe) => {
    navigation.navigate('RecipeDetailScreen', { recipe });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', paddingTop: StatusBar.currentHeight + 20 }}>
      <Text style={{ fontSize: 20, color: 'white', marginBottom: 10 }}>Featured recipes</Text>
      <FlatList
        data={recipes}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openRecipeDetails(item)}>
            <View style={{ margin: 10, backgroundColor: '#f55000', padding: 10, borderRadius: 10 }}>
              <Image source={{ uri: item.thumbnail_url }} style={{ width: '100%', height: 150, borderRadius: 8 }} />
              <Text style={{ color: 'white', textAlign: 'center', marginTop: 10 }}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        style={{ width: '100%' }}
      />
    </View>
  );
};

export default Discover;