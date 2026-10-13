import { View, Text, StyleSheet } from "react-native";

export default function WeekCalendar() {
    const daysOfWeek = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
    const currentDate = new Date();
    const currentDateDay = currentDate.getDate();
    const currentDayIndex = currentDate.getDay() ; // Adjusting for 0-based index (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    
    const viewWeek = [];
    for (let i=0; i<6; i++) {
        const day = currentDateDay + i > lastDayOfMonth ? currentDateDay + i - lastDayOfMonth : currentDateDay + i;
        
        viewWeek.push((
            <View key={i} style={i==0 ? styles.dayContainerToday : styles.dayContainer}>
                <Text>{daysOfWeek[(currentDayIndex + i) % 7]} </Text>
                <Text>{day} </Text>
            </View>
        ));
    }

    
    return (
        <View style={styles.weekCalendarContainer}>
            {viewWeek}
        </View>
    );
}

const styles = StyleSheet.create({
    weekCalendarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    dayContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    dayContainerToday: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#e0ffc5',
        borderRadius: 10,
    }
});