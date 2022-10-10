import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getUserRolesByCityCenter, getUserFilterationData } from '../../services/attendaceService'
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { getCities, getCentersByCity, } from '../../services/AuthService';
import { cross } from '../../assets/images';
const Filteration = (props) => {
    const [city, setCity] = useState('choose');
    const [cities, setCities] = useState([]);
    const [centers, setCenters] = useState([]);
    const [center, setCenter] = useState();
    const [isFocus, setIsFocus] = useState(false);
    const [selectCityManager, setSelectCityManager] = useState([]);
    const [selectCenterManager, setSelectCenterManager] = useState([]);
    const [centerManagers, setCenterManagers] = useState([]);
    const [cityManagers, setCityManagers] = useState([]);
    const handleCity = async e => {
        setCity(e);
        await getCentersByCity(e._id)
            .then(response => setCenters(response.data))
            .catch(err => console.log(err));
    };
    const selectCenter = async (e) => {
        setCenter(e);
        getUserRolesByCityCenter(e._id, e.city._id)
            .then((response) => {
                setCenterManagers(response.data.centerManagers.map((item) => { return { ...centerManagers, label: item, value: item } }))
                setCityManagers(response.data.cityManagers.map((item) => { return { ...cityManagers, label: item, value: item } }))
            })
            .catch((err) => console.log(err));
    }
    const changeCityManager = (e) => {
        setSelectCityManager(e);
    }
    const filterationFun = async () => {
        await getUserFilterationData(city, center, selectCityManager, selectCenterManager).then((response) => {
            props.setAttendances(response.data.result);
            props.setShowFilter(false);
        })
    }
    useEffect(() => {
        getCities()
            .then(response => {
                setCities(response.data);
            })
            .catch(err => console.log(err));
    }, []);
    return (
        <View style={styles.filterWrapper}>
            <View style={styles.filter_main_wrapper}>
            <TouchableOpacity style={styles.crossIcon} onPress={() => props.setShowFilter(!props.showFilter)}>
                    <Image source={cross} style={styles.crossIconImage} />
                </TouchableOpacity>
                <View style={styles.container}>
                    <Dropdown
                        style={[styles.dropdown]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={cities}
                        maxHeight={300}
                        labelField="name"
                        valueField="name"
                        placeholder={!isFocus ? 'choose City' : '...'}
                        value={city}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={e => {
                            handleCity(e)
                            setIsFocus(false);
                        }
                        }
                    />
                </View>
                <View style={styles.container}>
                    <Dropdown
                        style={[styles.dropdown]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={centers}
                        maxHeight={300}
                        labelField="name"
                        valueField="name"
                        placeholder={!isFocus ? 'choose Center' : '...'}
                        value={center}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={selectCenter}
                    />
                </View>
                <View style={styles.container}>
                    <MultiSelect
                        style={[styles.dropdown]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={cityManagers}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'choose City Manager' : '...'}
                        value={selectCityManager}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={changeCityManager}
                    />
                </View>
                <View style={styles.container}>
                    <MultiSelect
                        style={[styles.dropdown]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={centerManagers}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'choose Center Manager' : '...'}
                        value={selectCenterManager}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={(e) => setSelectCenterManager(e)}
                    />
                </View>
                <View style={{ paddingTop: 20 }}>
                <TouchableOpacity style={styles.loginButton}>
              <Text onPress={filterationFun} style={styles.loginButton1}>Filter</Text>
            </TouchableOpacity>
                    
                </View>
            </View>
        </View>
    )
}
export default Filteration
const styles = StyleSheet.create({
    filterWrapper: {
        display: 'flex',
        width: Dimensions.get('window').width,
        height: 500,
        backgroundColor: '#F8FAF8',
    },
    crossIcon: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginHorizontal: 20,
        borderWidth: 1,
        marginTop: 20,
        borderRadius: 30,
        borderColor: 'grey',
        width: 40,
        height: 40,
        textAlign: 'center',
    },
    filter_main_wrapper: {
        width:'90%',
        display: 'flex',
        paddingVertical: 10,
        backgroundColor: '#f5f5f5',
        backgroundColor: '#fff',
        color: 'white',
        shadowColor: "#000",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 0,
        color: '#000',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        boxShadow: '10 10 10 rgba(10, 10, 0, 0.1)',
        borderRadius: 20,
        borderWidth: 1,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginTop: 40,
        marginBottom: 15,
    },
    selectFilterMain: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        padding: 5,
        margin: 2
    },
    dropdown: {
        height: 50,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        borderRadius: 8,  
        color: 'black',
    },
    container: {
        margin: 10,
    },
    loginBtn: {
        fontSize: 30,
        borderRadius: 10,
        backgroundColor: 'red',
        color: 'black', padding: 10
    },
    loginButton: {
        marginTop: 20,
        paddingTop: 10,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        borderRadius: 15,
        backgroundColor: "#334FE5",
        height: 50,
        marginVertical: 10,
        marginLeft: 15,
        marginRight: 15,
        paddingHorizontal: 10,
        width:'90%'
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
    filterBtnWrapper: {
        backgroundColor: 'rgb(0, 0, 0)',
        borderRadius: 10,
        padding: 10,
        borderRadius: 10,
        margin: 10,
        width: 100,
        alignSelf: 'center',
        zIndex: 1000
    },
    filterBtn: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    crossIconImage: {
        width: 37,
        height: 37,
        alignSelf: 'center',
        marginTop: 0,
    },
    placeholderStyle: {
        color: 'black',
        fontSize: 18,
        fontWeight: '500',
    }
})