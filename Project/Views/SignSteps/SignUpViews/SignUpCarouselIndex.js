import React from 'react';
import { View } from 'react-native';

import { carouselIndexStyles as styles } from './SignUpViewsStyles';

export default function SignUpCarouselIndex(props) {
  const INDEX = 8;

  return (
    <View style={styles.carouselContainer}>
      {
        [...Array(INDEX).keys()].map((_, index) => {
          return <View key={index} style={[styles.carouselIndexItem, props.indexActive -1 == index ? styles.activeCarouselIndexItem: null]}>
                 </View>;
        })
      }
    </View>
  );
}
