import React from 'react';
import {View, Image, StyleSheet, Dimensions, FlatList} from 'react-native';

interface GridImageProps {
  imageArray?: {url: string}[];
}

const {width} = Dimensions.get('window');

const GridImage: React.FC<GridImageProps> = ({imageArray}) => {
  const getImageSize = (imageCount: number) => {
    if (imageCount === 1) return width * 0.6; // Única imagem preenche o container todo
    const columns = Math.ceil(Math.sqrt(imageCount)); // Define o número de colunas do grid
    return (width * 0.6) / columns; // Tamanho da imagem baseado no número de colunas
  };

  const getColumns = (imageArray?: any[]) => {
    const length = imageArray?.length ?? 2;

    if (length <= 4) {
      return 2;
    }

    return length % 3 === 0 ? 3 : 2;
  };

  const columns = getColumns(imageArray);

  const imageSize = getImageSize(imageArray?.length ?? 1);

  return (
    <View testID="grid-image" style={styles.container}>
      <FlatList
        data={imageArray}
        keyExtractor={(_, index) => index.toString()}
        numColumns={columns}
        renderItem={({item}) => {
          return (
            <Image
              source={{uri: item?.url}}
              style={{
                margin: 3,
                width: imageSize,
                height: imageSize,
              }}
              resizeMode="cover"
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default GridImage;
