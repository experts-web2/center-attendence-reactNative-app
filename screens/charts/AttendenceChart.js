import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

const AttendenceChart = () => {
    return (
        <View style={{  backgroundColor: '#F8FAF8'}}>
            <View style={styles.chartTitle}>
                <Text style={styles.Title}>Attendence of Ghulam</Text>
                <BarChart
                    data={{
                        labels: ["Jan", "Feb", "March", "April", "May", "June", "July"],
                        datasets: [
                            {
                                data: [
                                    160, 70, 80, 20, 40, 590, 100
                                ]
                            }
                        ]
                    }}
                    width={350} 
                    height={220}
                    yAxisLabel=""
                    yAxisSuffix=""
                    yAxisInterval={1}
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,

                    }}
                />
            </View>
        </View>
    )
}

export default AttendenceChart

const styles = StyleSheet.create({
    chartTitle: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 6,

    },
    Title: {
        fontSize: 20,
        fontWeight: '700',
        color: 'black',
        textAlign: 'center',
        marginTop: 10,
        paddingBottom: 10,

    }
})