import {
  Animated,
  Image,
  ImageBackground,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {IconPhotoGraph} from '../../icons/iconPhotograph';
import {IconArrow} from '../../icons/iconArrow';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUser} from '../../store/slices/userSlice';
import {AppDispatch, RootState} from '../../store/store';
import {useEffect, useMemo, useState} from 'react';
import {User} from '../../types/user';

interface HeaderProps {
  styleAnimated?: StyleProp<ViewStyle>;
  hiddenProfile?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  styleAnimated,
  hiddenProfile,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const userProfile = useSelector((state: RootState) => {
    return state.user.data;
  });
  const profileValues = useMemo(() => userProfile, [userProfile]);

  return (
    <Animated.View style={[styles.container, styleAnimated]}>
      {profileValues?.['profile-image'] && (
        <ImageBackground
          source={{
            uri: profileValues?.['profile-image'],
          }}
          style={styles.background}
          resizeMode="cover">
          {!hiddenProfile && profileValues?.avatar && (
            <>
              <View style={styles.profileContainer}>
                <Text style={styles.profileUsername}>
                  {profileValues?.username}
                </Text>
                <Image
                  source={{
                    uri: profileValues?.avatar,
                  }}
                  style={styles.profileImage}
                />
              </View>
            </>
          )}
          <View style={styles.containerTitle}>
            <IconArrow width="22px" height="22px" color="#fff" />
            <Text style={styles.title}>Moments</Text>
          </View>
          <View style={styles.icon}>
            <IconPhotoGraph width="24px" height="24px" color="#fff" />
          </View>
        </ImageBackground>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {paddingBottom: 50},
  background: {
    // flex: 1,
    height: '100%',
    paddingHorizontal: 15,

    backgroundColor: '#424242',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  profileContainer: {
    position: 'absolute',
    bottom: -25,
    flexWrap: 'wrap',
    width: '100%',
    height: 90,
    gap: 16,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  profileUsername: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 700,
    marginBottom: 20,
  },
  profileImage: {
    width: 85,
    height: 85,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#cecece',
    backgroundColor: 'white',
  },
  containerTitle: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  icon: {paddingVertical: 20},
  title: {
    fontSize: 20,
    color: '#fff',
  },
});
