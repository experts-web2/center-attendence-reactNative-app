import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import moment from 'moment';
import DateRangePicker from 'react-native-daterange-picker';


export default class DateRangePickerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      displayedDate: moment(),
    };
  }

  setDates = dates => {
    this.setState({
      ...dates,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    console.log("change date",this.props.endDate, this.props.setEndDate(this.state.endDate));
        // this.props.setStartDate(this.state.startDate);
        // this.props.setEndDate(this.state.endDate);
    }


  render() {
    const {startDate, endDate, displayedDate} = this.state;
    return (
      <>
        <View style={styles.container}>
          <DateRangePicker
            onChange={this.setDates}
            endDate={endDate}
            startDate={startDate}
            displayedDate={displayedDate}
            range>
            <Text>Select Date Range</Text>
          </DateRangePicker>
        </View>
   
      </>
    );
  }
}

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: '#fff',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   },
});
