import React, {useEffect, useState} from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchTweets} from '../../store/slices/tweetsSlice';
import {Tweets} from '../../components/tweets';
import {AppDispatch} from '../../store/store';
import {Tweet} from '../../types/tweets';
import {useTweetList} from '../../hooks/useTweetList';

interface TweetListProps {
  loadMore: () => void;
  tweets: Tweet[];
  ref?: React.RefObject<FlatList<Tweet> | null>;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const TweetList: React.FC<TweetListProps> = ({
  tweets,
  loadMore,
  onScroll,
  ref,
}) => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        ref={ref}
        data={tweets}
        scrollEventThrottle={16}
        onScroll={onScroll}
        renderItem={({item}) => <Tweets tweet={item} />}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.01}
        nestedScrollEnabled
        onEndReached={loadMore}
      />
    </View>
  );
};

export default TweetList;
