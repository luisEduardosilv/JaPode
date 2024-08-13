import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RecipeDetailsScreen = ({ route }) => {
  const { recipe } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Image source={{ uri: recipe.thumbnail_url }} style={styles.image} />
        <Text style={styles.recipeName}>{recipe.name}</Text>
        <Text style={styles.description}>{recipe.description}</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Icon name="clock-o" size={20} color="white" style={styles.icon} />
            <Text style={styles.details}>Cook Time: {recipe.cook_time_minutes} minutes</Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Icon name="cutlery" size={20} color="white" style={styles.icon} />
            <Text style={styles.details}>Servings: {recipe.yields}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 20,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 20,
    borderRadius: 8,
    marginTop: 50,
  },
  recipeName: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },
  description: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  details: {
    color: 'white',
    fontSize: 18,
  },
});

export default RecipeDetailsScreen;
