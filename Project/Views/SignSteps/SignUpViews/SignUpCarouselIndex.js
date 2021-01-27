import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors } from '../../../Theme/Colors';

const styles = StyleSheet.create({
  carouselContainer: {
    flexDirection: 'row',
    padding: 2,
    justifyContent: 'center'
  },
  carouselIndexItem: {
    borderColor: Colors.black,
    borderRadius: 100,
    borderWidth: 1,
    borderStyle: 'solid',
    width: 12,
    height: 12,
    margin: 3
  },
  activeCarouselIndexItem: {
    backgroundColor: Colors.blue,
    borderWidth: 0
  }
});

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
