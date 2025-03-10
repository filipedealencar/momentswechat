import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {Tweets} from '../../components/tweets';
import {Header} from '../../patterns/header';
import TweetList from '../../patterns/tweetList';
import {useTweetList} from '../../hooks/useTweetList';
import {Tweet} from '../../types/tweets';

const HEADER_MAX_HEIGHT = 250;
const HEADER_MIN_HEIGHT = 115;
const SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export const Home: React.FC = ({}) => {
  const listRef = useRef<FlatList<Tweet>>(null);
  const [scrollY] = useState(new Animated.Value(0));
  const {tweets, handleRefresh, refreshing, loadMore} = useTweetList({
    refList: listRef,
  });

  const [isMinHeight, setIsMinHeight] = useState(false);

  useEffect(() => {
    const listener = scrollY.addListener(({value}) => {
      if (value >= SCROLL_DISTANCE * 0.7) {
        setIsMinHeight(true);
      } else {
        setIsMinHeight(false);
      }
    });

    return () => {
      scrollY.removeListener(listener);
    };
  }, [scrollY]);

  return (
    <RefreshControl
      onRefresh={handleRefresh}
      style={{flex: 1, backgroundColor: '#fff'}}
      refreshing={refreshing}>
      <Header
        hiddenProfile={isMinHeight}
        styleAnimated={{
          height: scrollY.interpolate({
            inputRange: [0, SCROLL_DISTANCE],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp',
          }),
        }}
      />
      <TweetList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        ref={listRef}
        loadMore={loadMore}
        tweets={tweets}
      />
    </RefreshControl>
  );
};
