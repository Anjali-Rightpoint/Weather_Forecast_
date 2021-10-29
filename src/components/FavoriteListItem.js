import React, {Component} from 'react';
import {Text, TouchableHighlight, Alert} from 'react-native';
import {HorizontalCard} from '../components/common';
import Swipeout from 'react-native-swipeout';

class FavoriteListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null,
    };
  }
  render() {
    const swipeSettings = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {},
      onOpen: (secId, rowId, direction) => {
        this.setState({activeRowKey: this.props.item.key});
      },
      right: [
        {
          onPress: () => {
            Alert.alert(
              'Alert',
              'Are you sure you want to remove this location?',
              [
                {
                  text: 'No',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => {
                    console.log('Remove item', this.props);
                    this.props.onDelete(this.props.item, this.props.index);
                  },
                },
              ],
            );
          },
          text: 'Delete',
          type: 'delete',
        },
      ],
      rowId: this.props.index,
      sectionId: 1,
    };
    return (
      <Swipeout {...swipeSettings}>
        <TouchableHighlight
          onPress={() => {
            {
              this.props.onPress();
            }
          }}>
          <HorizontalCard>
            <Text style={{marginLeft: 10, flex: 4}}>
              {this.props.item.city}{' '}
            </Text>
            {/* <Icon
              name="trash"
              size={25}
              color="#ccc"
              style={{marginRight: 10, flex: 1}}
            /> */}
          </HorizontalCard>
        </TouchableHighlight>
      </Swipeout>
    );
  }
}

export default FavoriteListItem;
