import { View, Text, FlatList, StyleSheet } from "react-native";
import { Image } from "expo-image"
import CountryEntity from "../entities/country-entity";
import { useState, useEffect } from "react";
import TextComponent from "./components/text-component";


export default function HomePage() {

    const [countries, setCountries] = useState<CountryEntity[]>([])

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
        };

        var CountryList: CountryEntity[] = []

        fetch("https://restcountries.com/v3.1/all", requestOptions)
            .then(response => response.json())
            .then(result => {
                result.map(item => {
                    CountryList.push({
                        id: item.name.common,
                        name: item.name.common,
                        ptName: item.translations.por.common,
                        capital: item.capital,
                        region: item.region,
                        flagUrl: item.flags.svg,
                        population: item.population,

                    })
                })
            })
        setCountries(CountryList);
    }, []);
    return (
        <View style={styles.container}>
            <Text style={styles.title}> Lista de Países </Text>

            <FlatList
                renderItem={(country) =>
                    <View id={country.item.id} style={styles.card}>
                        <View style={styles.img} >
                            <Image style={styles.img} source={{ uri: country.item.flagUrl }} />
                        </View>
                        <View>
                            <Text style={styles.title2}>{country.item.name} </Text>
                            <Text style={styles.title2}>{country.item.ptName}</Text>
                            <Text style={styles.title2}>Capital: {country.item.capital}</Text>
                            <Text style={styles.title2}>Continente: {country.item.region}</Text>
                            <Text style={styles.title2}>População:  {country.item.population}</Text>
                        </View>
                    </View>
                }

                data={countries}
                keyExtractor={item => item.id}
            >

            </FlatList>



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f4f4f4',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 50,
    },

    title: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 30,
    },

    title2:{
        fontSize: 12,
        fontWeight: '600',
     },

    card: {
        aspectRatio: 3.5,
        height: 100,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 16,
        marginVertical: 5,
        padding: 16,
        flexDirection: 'row',
        elevation: 15,
        backgroundColor: '#fff',
        shadowColor: '#f4f4f4',

    },

    img: {
        width: 70,
        height: 70,
        marginRight: 12,
    },
})

