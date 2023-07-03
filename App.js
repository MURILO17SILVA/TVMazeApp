import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, } from 'react-native';
import axios from 'axios';

export default function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('https://api.tvmaze.com/shows');
      setMovies(response.data.slice(0, 30));
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}
      onPress={() => console.log(item)}
    >
      <Image source={{ uri: item.image.medium }} style={{ width: 100, height: 150 }} />
      <Text style={{ marginLeft: 30 }}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <StatusBar style="auto" />
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}> TV MAZE: Top 30 Movies </Text>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
