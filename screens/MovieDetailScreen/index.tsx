import { ActivityIndicator, FlatList, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getMovieCastDetails, getMovieDetails } from '../../api/fetchAPi';
import { styles } from './style';
import AppHeader from '../../components/AppHeader';
import * as IconsSolid from 'react-native-heroicons/solid';
import { COLORS, FONTSIZE, SPACING } from '../../theme/theme';
import { baseImagePath } from '../../api/enpoint';
import CategoryHeader from '../../components/CategoryHeader/Index';
import ActorCastCard from '../../components/ActorCast';
import { LinearGradient } from 'expo-linear-gradient';

const MovieDetailScreen = ({navigation, route} : any)  => {
    const [movieData, setMovieData] = useState<any>(undefined);
  const [movieCastData, setmovieCastData] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      const tempMovieData = await getMovieDetails(route.params.movieid);
      setMovieData(tempMovieData);
    })();

    (async () => {
      const tempMovieCastData = await getMovieCastDetails(route.params.movieid);
      setmovieCastData(tempMovieCastData.cast);
    })();
  }, []);

  if (
    movieData == undefined &&
    movieData == null &&
    movieCastData == undefined &&
    movieCastData == null
  ) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollViewContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.appHeaderContainer}>
          <AppHeader
            header={''}
            action={() => navigation.goBack()}
          />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
    }

    return (
        <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <StatusBar hidden />

      <View>
        <ImageBackground
          source={{
            uri: baseImagePath('w780', movieData?.backdrop_path),
          }}
          style={styles.imageBG}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linearGradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader
                header={''}
                action={() => navigation.goBack()}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.imageBG}></View>
        <Image
          source={{uri: baseImagePath('w342', movieData?.poster_path)}}
          style={styles.cardImage}
        />
      </View>

      <View style={styles.timeContainer}>
        <IconsSolid.ClockIcon style={{marginRight: SPACING.space_8}} size={FONTSIZE.size_20} color={COLORS.WhiteRGBA50}/>
        <Text style={styles.runtimeText}>
          {Math.floor(movieData?.runtime / 60)}h{' '}
          {Math.floor(movieData?.runtime % 60)}m
        </Text>
      </View>

      <View>
        <Text style={styles.title}>{movieData?.original_title}</Text>
        <View style={styles.genreContainer}>
          {movieData?.genres.map((item: any) => {
            return (
              <View style={styles.genreBox} key={item.id}>
                <Text style={styles.genreText}>{item.name}</Text>
              </View>
            );
          })}
        </View>
        <Text style={styles.tagline}>{movieData?.tagline}</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.rateContainer}>
        <IconsSolid.StarIcon  size={FONTSIZE.size_20} color={COLORS.Yellow}/>
          <Text style={styles.runtimeText}>
            {movieData?.vote_average.toFixed(1)} ({movieData?.vote_count})
          </Text>
          <Text style={styles.runtimeText}>
            {movieData?.release_date.substring(8, 10)}{' '}
            {new Date(movieData?.release_date).toLocaleString('default', {
              month: 'long',
            })}{' '}
            {movieData?.release_date.substring(0, 4)}
          </Text>
        </View>
        <Text style={styles.descriptionText}>{movieData?.overview}</Text>
      </View>

      <View>
        <CategoryHeader title="Top Cast" />
        <FlatList
          data={movieCastData}
          keyExtractor={(item: any) => item.id}
          horizontal
          contentContainerStyle={styles.containerGap24}
          renderItem={({item, index}) => (
            <ActorCastCard
              shouldMarginatedAtEnd={true}
              cardWidth={80}
              isFirst={index == 0 ? true : false}
              isLast={index == movieCastData?.length - 1 ? true : false}
              imagePath={baseImagePath('w185', item.profile_path)}
              title={item.original_name}
              subtitle={item.character}
            />
          )}
        />

        <View>
          <TouchableOpacity
            style={styles.buttonBG}
            onPress={() => {
              navigation.push('SeatBooking', {
                BgImage: baseImagePath('w780', movieData.backdrop_path),
                PosterImage: baseImagePath('original', movieData.poster_path),
              });
            }}>
            <Text style={styles.buttonText}>Select Seats</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    );
}
export default MovieDetailScreen;
