import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store/store';
import {Tweet} from '../types/tweets';
import {useCallback, useEffect, useState} from 'react';
import {fetchTweets} from '../store/slices/tweetsSlice';
import {FlatList} from 'react-native';

export const useTweetList = ({
  refList,
}: {
  refList: React.RefObject<FlatList<Tweet> | null>;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const allTweets = useSelector((state: RootState) => state.tweets.tweets);
  const [tweetsValues, setTweetsValues] = useState<Tweet[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setTweetsValues(allTweets?.slice(0, 5));
  }, [allTweets]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      if (refList?.current) {
        refList.current.scrollToIndex({index: 0, animated: true});
      }
      setRefreshing(false);
    }, 2000);

    dispatch(fetchTweets());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTweets());
  }, [dispatch]);

  const loadMore = () => {
    if (tweetsValues.length < allTweets.length)
      setTweetsValues(state => [
        ...state,
        ...allTweets.slice(state.length, state.length + 5),
      ]);
  };

  return {tweets: tweetsValues, loadMore, refreshing, handleRefresh};
};
