// @flow
import React, { PureComponent } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import type { TextStyleProp, ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  firstItemText: {
    textAlign: 'left',
  },

  item: {
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },

  secondItemText: {
    textAlign: 'right',
  },

  textContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    width: '100%',
  },
});

type Props = {
  activeBackgroundColor?: string,
  activeSwitchColor?: string,
  activeText?: string,
  activeTextColor?: string,
  handleChange: (boolean) => void,
  inactiveBackgroundColor?: string,
  inactiveSwitchColor?: string,
  inactiveText?: string,
  inactiveTextColor?: string,
  isActive?: boolean,
  styles?: {
    activeText?: TextStyleProp,
    container?: ViewStyleProp,
    inactiveText?: TextStyleProp,
    switch?: ViewStyleProp,
    text?: TextStyleProp,
    textContainer?: ViewStyleProp,
    textsContainer?: ViewStyleProp,
  },
  switchSize?: number,
};

type State = {
  activated: boolean,
  width: number
};

class Switch extends PureComponent<Props, State> {
  animatedValue: Animated.Value;

  props: Props;

  state: State;

  static defaultProps = {
    activeBackgroundColor: 'transparent',
    activeSwitchColor: 'white',
    activeText: '',
    activeTextColor: 'white',
    inactiveBackgroundColor: 'transparent',
    inactiveSwitchColor: 'white',
    inactiveText: '',
    inactiveTextColor: 'white',
    isActive: false,
    styles: {},
    switchSize: 15,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      activated: !!props.isActive,
      width: 0,
    };

    this.animatedValue = new Animated.Value(props.isActive ? 150 : 0);
  }

  get backgroundColor() {
    const { activated } = this.state;
    const { activeBackgroundColor, inactiveBackgroundColor } = this.props;

    return (activated ? activeBackgroundColor : inactiveBackgroundColor);
  }

  get calculatedStyles() {
    const { activated } = this.state;
    const {
      activeSwitchColor,
      activeTextColor,
      inactiveSwitchColor,
      inactiveTextColor,
      switchSize,
    } = this.props;

    return {
      container: {
        borderRadius: switchSize,
        height: switchSize * 2,
        width: switchSize * 4,
      },

      switch: {
        backgroundColor: activated ? activeSwitchColor : inactiveSwitchColor,
        borderRadius: switchSize / 2,
        height: switchSize,
        width: switchSize,
      },

      item: {
        borderRadius: switchSize,
        height: switchSize * 2,
      },

      itemText: {
        color: activated ? activeTextColor : inactiveTextColor,
        fontSize: switchSize - 1,
        paddingLeft: switchSize / 3 * 2,
        paddingRight: switchSize / 3 * 2 - switchSize / 7.5,
      },

      textContainer: {
        height: switchSize * 2,
      },
    };
  }

  get firstTextOpacity() {
    return (
      this.animatedValue.interpolate({
        inputRange: [0, 150],
        outputRange: [0, 1],
      })
    );
  }

  get secondTextOpacity() {
    return (
      this.animatedValue.interpolate({
        inputRange: [0, 150],
        outputRange: [1, 0],
      })
    );
  }

  get switchStyle() {
    const { width } = this.state;
    const { switchSize } = this.props;

    const switchPosition = this.animatedValue.interpolate({
      inputRange: [0, 150],
      outputRange: [switchSize / 2, width - (switchSize * 1.5)],
    });

    return {
      transform: [
        { translateX: switchPosition },
      ],
    };
  }

  onLayout = ({ nativeEvent: { layout: { width } } }: { nativeEvent: { layout: { width: number } } }) => {
    this.setState({ width });
  };

  switch = () => {
    const { activated } = this.state;
    const { handleChange } = this.props;

    Animated.timing(this.animatedValue, {
      duration: 150,
      toValue: activated ? 0 : 150,
      useNativeDriver: true,
    }).start();

    handleChange(!activated);
    this.setState({ activated: !activated });
  };

  render() {
    const {
      activeText,
      inactiveText,
      styles: customStyles,
    } = this.props;
    const {
      backgroundColor,
      calculatedStyles,
      firstTextOpacity,
      secondTextOpacity,
      switchStyle,
    } = this;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onLayout={this.onLayout}
        onPress={this.switch}
        style={[
          styles.container,
          calculatedStyles.container,
          { backgroundColor },
          customStyles.container,
        ]}>
        <Animated.View style={[calculatedStyles.switch, switchStyle, customStyles.switch]} />

        <View style={[styles.textContainer, calculatedStyles.textContainer, customStyles.textsContainer]}>
          <Animated.View
            style={[styles.item, calculatedStyles.item, { opacity: firstTextOpacity }, customStyles.textContainer]}>
            <Text
              style={[styles.firstItemText, calculatedStyles.itemText, customStyles.text, customStyles.activeText]}>
              {activeText}
            </Text>
          </Animated.View>

          <Animated.View
            style={[styles.item, calculatedStyles.item, { opacity: secondTextOpacity }, customStyles.textContainer]}>
            <Text
              style={[styles.secondItemText, calculatedStyles.itemText, customStyles.text, customStyles.inactiveText]}>
              {inactiveText}
            </Text>
          </Animated.View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Switch;
