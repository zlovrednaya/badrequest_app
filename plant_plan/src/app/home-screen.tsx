import React from "react";
import { View, Text, ScrollView } from "react-native";
import WeekCalendar from "@/components/week-calendar";
export default function HomeScreen() {
    return ( 
            <View>
                <WeekCalendar />
                <Text>Home Screen Dashboard</Text>
            </View>
        
    );
}

const styles = {
    scrollView: {
        //flex: 1,
        
    },
};