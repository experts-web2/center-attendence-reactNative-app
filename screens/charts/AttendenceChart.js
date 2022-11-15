import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import DateRangePicker from 'react-native-daterange-picker';
import DateRangePickerComponent from '../../components/DateRangePickerComponent';
import {
  getUserRolesByCityCenter,
  geAttendenciesRecord,
} from '../../services/attendaceService';
import {useIsFocused} from '@react-navigation/native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import moment from 'moment';
import AsyncStorageManager from '../../Managers/AsyncStorageManager';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {useTranslation} from 'react-i18next';
import i18n from '../../services/i18';
const initI18n = i18n;

const AttendenceChart = () => {
  const {t, i18n} = useTranslation();
  const isFocused = useIsFocused();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
    displayedDate: moment(),
  });
  const [displayedDate, setDisplayedDate] = useState(moment());

  const [cityManagers, setCityManagers] = useState([]);
  const [selectCityManager, setSelectCityManager] = useState([]);

  const [isFocus, setIsFocus] = useState(false);
  const [chartData, setChartData] = useState();
  const [labels, setLabels] = useState();
  const [dataset, setDataset] = useState();
  const myFun = async (centerID, cityId) => {
    await getUserRolesByCityCenter(centerID, cityId)
      .then(response => {
        setCityManagers(response.data.cityManagers);
      })
      .catch(err => console.log(err));
  };
  const getAttendenceRecordData = async () => {
    const cityManagerss = [
      '635912ddc6be3c8e95045967',
      '632861140e708eff983f1544',
    ];

    await geAttendenciesRecord(cityManagerss)
      .then(response => {
        setChartData(response.data);
        setLabels(response?.data?.label);
        setDataset(response?.data?.dataSet);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    AsyncStorageManager.getDataObject('user').then(res => {
      myFun(res.center[0], res.city[0]);
    });
    getAttendenceRecordData();
    if (isFocused) {
      AsyncStorageManager.getDataObject('user').then(res => {
        myFun(res.center[0], res.city[0]);
      });
      getAttendenceRecordData();
    }
  }, [isFocused]);
  const changeCityManager = e => {
    setSelectCityManager(e);
  };

  const setDates = dates => {
    setStartDate(dates.startDate);
    setEndDate(dates.endDate);
  };

  return (
    <>
      {/* <DateRangePickerComponent setStartDate={setStartDate}  setEndDate={setEndDate} startDate={startDate} endDate={endDate} /> */}
      <View style={{backgroundColor: '#F8FAF8', marginTop: 20}}>
        <View style={styles.container}>
          <Text style={styles.textInputLabel}>
            {t('City Manager')}
            {startDate}
            {endDate}:
          </Text>
          <MultiSelect
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTe
            iconStyle={styles.iconStyle}
            data={cityManagers}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? t('Choose City Manager') : '...'}
            value={selectCityManager}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={changeCityManager}
          />
        </View>

        <View style={{marginTop: 10, zIndex: 100}}>
          <View style={styles.container}>
            <DateRangePicker
              onChange={setDates}
              endDate={endDate}
              startDate={startDate}
        
              displayedDate={moment({startDate: startDate, endDate: endDate})}
              range>
              <Text>Select Date Range</Text>
            </DateRangePicker>
          </View>
        </View>
        <View style={styles.chartTitle}>
          <Text
            style={styles.Title}
            onPress={async () => {
              await geAttendenciesRecord(selectCityManager)
                .then(response => {
                  console.log('response', JSON.stringify(response.data));
                  setChartData(response.data);
                  setLabels(response?.data?.label);
                  setDataset(response?.data?.dataSet);
                })
                .catch(err => console.log(err));
            }}>
            {t('Attendence of First week')}
          </Text>
          <BarChart
            data={{
              labels: ['city', 'manager', 'center', 'short'],
              datasets: [
                {
                  data: [11, 4, 16, 20],
                },
              ],
            }}
            fromZero={true}
            showBarTops={true}
            showValuesOnTopOfBars={true}
            width={350}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            barPercentage={3}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </View>
    </>
  );
};

export default AttendenceChart;

const styles = StyleSheet.create({
  chartTitle: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Title: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
    paddingBottom: 10,
  },
  AttendanceTableFormBoxShadow: {
    width: '90%',
    marginTop: 7,
    paddingTop: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 0,
    justifyContent: 'space-between',
    color: '#000',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    boxShadow: '10 10 10 rgba(10, 10, 0, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 15,
    backgroundColor: '#fff',
  },
  signInTitle: {
    fontSize: 25,
    color: 'black',
    fontFamily: 'Roboto',
    textAlign: 'center',
    textTransform: 'capitalize',
    paddingTop: 3,
    marginBottom: 10,
    paddingBottom: 4,
  },
  mainContainer: {
    width: Dimensions.get('window').width,
    backgroundColor: '#F8FAF8',
  },
  signInInputWrapper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '95%',
    marginTop: 2,
    marginBottom: 2,
  },
  textInputLabel: {
    fontSize: 18,
    marginTop: 3,
    color: '#334FE5',
    marginBottom: 3,
  },
  textInputText: {
    fontSize: 17,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  loginButton: {
    marginTop: 20,
    paddingTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 15,
    backgroundColor: '#334FE5',
    height: 50,
    marginVertical: 10,
    marginLeft: 15,
    marginRight: 15,
    paddingHorizontal: 10,
    width: '90%',
  },
  loginButton1: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    height: 50,
  },
  loginMainContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 30,
    borderRadius: 10,
  },
  signInTitle: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'Roboto',
    textAlign: 'center',
    textTransform: 'capitalize',
    paddingTop: 4,
    marginBottom: 10,
    paddingBottom: 4,
  },
  dropdown: {
    height: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: 'black',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: 'black',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },

  textInputText1: {
    fontSize: 25,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '100%',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    paddingBottom: 3,
    textAlign: 'center',
  },
  headerTextStyle: {
    fontSize: 24,
    fontFamily: 'Roboto',
    backgroundColor: '#334FE5',
    color: '#fff',
    width: '100%',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingBottom: 10,
    paddingTop: 15,
    textAlign: 'center',
  },
});
