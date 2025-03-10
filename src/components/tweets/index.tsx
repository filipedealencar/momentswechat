import {Image, StyleSheet, Text, View} from 'react-native';
import {Tweet} from '../../types/tweets';
import GridImage from '../gridImage';

export const Tweets = ({tweet}: {tweet: Tweet}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: tweet?.sender?.avatar,
        }}
        style={{width: 50, height: 50}}
        accessibilityRole="image"
        accessibilityLabel={`Avatar de ${tweet?.sender?.nick}`}
      />
      <View style={styles.containerText}>
        <Text style={styles.title}>{tweet?.sender?.nick}</Text>
        <View style={{width: '90%', maxHeight: 150, padding: 10}}>
          <Text style={styles.text}>{tweet?.content}</Text>
        </View>
        <View style={styles.containerGridImage}>
          {Array.isArray(tweet?.images) && tweet?.images.length > 0 && (
            <GridImage imageArray={tweet?.images} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 18,
    color: '#0083da',
  },
  containerText: {gap: 4},
  containerGridImage: {},
  text: {
    lineHeight: 18,
    flexWrap: 'wrap',
    fontSize: 12,
    color: '#000',
  },
});
